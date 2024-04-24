import QuizResult from "../models/Result.Model.js";

export const submitQuizResult = async (req, res) => {
    try {
      const { userId, score} = req.body;
  
      // Create a new quiz result document
      const quizResult = new QuizResult({
        userId,
        score,
      });
  
      // Save the quiz result to the database
      await quizResult.save();
  
      res.status(201).json({ success: true, message: 'Quiz result submitted successfully' });
    } catch (error) {
      console.error('Error submitting quiz result:', error);
      res.status(500).json({ success: false, message: 'Failed to submit quiz result' });
    }
  };
