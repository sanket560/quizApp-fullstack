import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useNavigate } from "react-router-dom";
import { useAuth } from './../../store/auth';

const AddQuiz = () => {
  const [quizData, setQuizData] = useState({
    imageUrl: "",
    name: "",
    tags: "",
    type: "",
    difficulty: "",
    category: "",
    questions: [
      { question: "", correct_answer: "", incorrect_answers: ["", "", ""] },
    ],
  });

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

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedQuestions = [...quizData.questions];

    if (name === "question") {
      updatedQuestions[index].question = value;
    } else if (name === "correct_answer") {
      updatedQuestions[index].correct_answer = value;
    } else if (name === "incorrect_answers") {
      updatedQuestions[index].incorrect_answers[
        parseInt(event.target.dataset.idx)
      ] = value;
    }

    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const fetchRandomImageUrl = async () => {
    const accessKey = "8YD7JLiv66QGJhNK5uBh1Kb4Qqf_YAv6PNXMoZg8S7U";
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=technology&count=1&client_id=${accessKey}`
    );
    const data = await response.json();
    return data[0].urls.regular;
  };

  const handleGenerateImage = async () => {
    try {
      const imageUrl = await fetchRandomImageUrl();
      setQuizData((prevState) => ({
        ...prevState,
        imageUrl: imageUrl,
      }));
      toast.success("Image Added Fill Other Details");
    } catch (err) {
      toast.error("Image Not Added");
      console.error("Error fetching random image:", err);
    }
  };

  const handleAddQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        { question: "", correct_answer: "", incorrect_answers: ["", "", ""] },
      ],
    });
  };

  const storedToken = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BACKEND_URL}/add-quizz`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify(quizData),
      });

      if (response.ok) {
        const responseData = await response.json();
        setQuizData({
          imageUrl: "",
          name: "",
          tags: "",
          type: "",
          difficulty: "",
          category: "",
          questions: [
            {
              question: "",
              correct_answer: "",
              incorrect_answers: ["", "", ""],
            },
          ],
        });
        toast.success(responseData.message || "Quiz Added Successfully");
        navigate("/");
      } else {
        const errorMessage = await response.text();
        throw new Error(
          errorMessage || "Failed to add quiz. Server returned an error."
        );
      }
    } catch (error) {
      console.error("Error adding quiz:", error);
      toast.error("Failed to add quiz. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-32 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Add Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <button
            type="button"
            className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2 focus:outline-none"
            onClick={handleGenerateImage}
          >
            Generate Image
          </button>
        </div>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={quizData.name}
            onChange={(e) => setQuizData({ ...quizData, name: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="tags"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Tags:
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={quizData.tags}
            onChange={(e) => setQuizData({ ...quizData, tags: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="type"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Type:
          </label>
          <input
            type="text"
            id="type"
            name="type"
            value={quizData.type}
            onChange={(e) => setQuizData({ ...quizData, type: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="difficulty"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Difficulty:
          </label>
          <input
            type="text"
            id="difficulty"
            name="difficulty"
            value={quizData.difficulty}
            onChange={(e) =>
              setQuizData({ ...quizData, difficulty: e.target.value })
            }
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Category:
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={quizData.category}
            onChange={(e) =>
              setQuizData({ ...quizData, category: e.target.value })
            }
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none"
            required
          />
        </div>
        {quizData.questions.map((question, index) => (
          <div key={index} className="mb-4 border rounded-lg p-4 bg-gray-100">
            <h3 className="text-lg font-semibold mb-2">Question {index + 1}</h3>
            <div className="mb-2">
              <label
                htmlFor={`question-${index}`}
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Question:
              </label>
              <input
                type="text"
                id={`question-${index}`}
                name={`question`}
                value={question.question}
                onChange={(e) => handleChange(index, e)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none"
                required
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor={`correct-answer-${index}`}
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Correct Answer:
              </label>
              <input
                type="text"
                id={`correct-answer-${index}`}
                name={`correct_answer`}
                value={question.correct_answer}
                onChange={(e) => handleChange(index, e)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none"
                required
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor={`incorrect-answers-${index}`}
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Incorrect Answers:
              </label>
              <div className="flex flex-col">
                {question.incorrect_answers.map((answer, idx) => (
                  <input
                    key={idx}
                    type="text"
                    id={`incorrect-answer-${index}-${idx}`}
                    name={`incorrect_answers`}
                    data-idx={idx}
                    value={answer}
                    onChange={(e) => handleChange(index, e)}
                    className="border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none"
                    required
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none mb-4"
          onClick={handleAddQuestion}
        >
          Add Question
        </button>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Add Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuiz;

