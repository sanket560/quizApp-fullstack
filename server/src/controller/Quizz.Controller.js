// Quizz.Controller.js

import Quiz from "../models/Quiz.Model.js";

export const createQuiz = async (req, res, next) => {
  try {
    const { imageUrl, name, tags, type, difficulty, category, questions } = req.body;

    // Check for missing required fields
    if (!name || !tags || !type || !difficulty || !category || !questions) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Ensure that questions is an array and each question has the required fields
    if (!Array.isArray(questions) || !questions.every(question =>
      question.question && question.correct_answer && question.incorrect_answers
    )) {
      return res.status(400).json({ success: false, message: "Invalid questions format" });
    }

    // Create the quiz
    const postedBy = req.user._id; // Assuming req.user._id contains the ID of the authenticated user
    const quiz = await Quiz.create({
      imageUrl,
      name,
      tags,
      type,
      difficulty,
      category,
      questions,
      postedBy,
    });

    res.status(201).json({ success: true, message: "Quiz created successfully", quiz });
  } catch (error) {
    // Handle errors
    console.error("Error creating quiz:", error);
    res.status(500).json({ success: false, message: "Failed to create quiz, please try again" });
  }
};

export const getQuiz = async (req, res, next) => {
  try {
    const quizData = await Quiz.find();
    res.status(200).json({
      success: true,
      quizData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch quiz",
      error: error.message,
    });
  }
};

export const getQuizById = async (req, res, next) => {
  try {
    const { quiz_id } = req.params; // Extract the event ID from the request parameters
    const quizData = await Quiz.find({ quiz_id }); // Query quiz data based on the event ID
    res.status(200).json({
      success: true,
      quizData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch quiz",
      error: error.message,
    });
  }
};