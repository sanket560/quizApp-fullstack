import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../store/auth";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Skeleton = () => (
  <div className="h-[80vh] flex flex-col justify-center">
    <div className="w-[700px] mx-auto mt-20 p-8 border rounded-lg shadow-lg bg-white animate-pulse">
      <div className="h-6 w-2/3 bg-gray-200 mb-4 rounded"></div>
      <div className="h-6 bg-gray-200 mb-6 rounded"></div>
      <div>
        {[...Array(4)].map((_, index) => (
          <div key={index} className="mb-2">
            <div className="h-6 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg cursor-not-allowed focus:outline-none">
          Next
        </button>
      </div>
    </div>
  </div>
);

const StartQuizPage = () => {
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);

  const { quiz_id } = useParams();

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    fetchQuizData();
  }, [quiz_id]);

  useEffect(() => {
    // Enable the "Next" button only when an option is selected
    setNextDisabled(!selectedOption);
  }, [selectedOption]);

  const fetchQuizData = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/all-quizz`);
      const data = await response.json();
      const quiz = data.quizData.find(quiz => quiz._id === quiz_id);
      if (quiz) {
        setQuizData(quiz);
        setLoading(false);
      } else {
        console.error("Quiz not found with id:", quiz_id);
      }
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };
  

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    const correctAnswer = quizData.questions[currentQuestionIndex].correct_answer;
    if (selectedOption === correctAnswer) {
      setScore(score + 1);
    }
    setSelectedOption("");
    if (currentQuestionIndex + 1 < quizData.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartGame = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption("");
    setScore(0);
    setQuizCompleted(false);
    setLoading(true);
    fetchQuizData();
  };

  if (loading) {
    return <Skeleton />;
  }


  if (quizCompleted) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <div className="h-96 flex flex-col items-center justify-center w-96 mx-auto mt-20 p-8 border rounded-lg shadow-lg bg-white">
          <h2 className="text-3xl font-bold text-center mb-4">
            Quiz Completed!
          </h2>
          <p className="text-lg font-semibold text-center">
            Your score: {score} out of {quizData.questions.length}
          </p>
          <button
            onClick={handleRestartGame}
            className="bg-blue-500 px-3 py-1 rounded text-white mt-4"
          >
            Restart the game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
    <div className="w-[700px] mx-auto mt-20 p-8 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4">
        Question {currentQuestionIndex + 1}
      </h2>
      <p className="text-lg mb-6">{quizData.questions[currentQuestionIndex].question}</p>
      <div>
        {/* Map over both correct and incorrect options */}
        {[...quizData.questions[currentQuestionIndex].incorrect_answers, quizData.questions[currentQuestionIndex].correct_answer].map((option, index) => (
          <div key={index} className="mb-2">
            <input
              type="radio"
              id={option}
              name="option"
              value={option}
              checked={selectedOption === option}
              onChange={() => handleOptionSelect(option)}
              className="mr-2"
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <button
          onClick={handleNextQuestion}
          disabled={nextDisabled}
          className={`px-4 py-2 rounded-lg focus:outline-none ${
            nextDisabled
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  </div>
  );
};

export default StartQuizPage;