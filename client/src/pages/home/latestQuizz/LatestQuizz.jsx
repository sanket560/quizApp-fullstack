import React, { useState, useEffect } from 'react';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const LatestQuizz = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/all-quizz`);
        if (!response.ok) {
          throw new Error('Failed to fetch quizzes');
        }
        const data = await response.json();
        setQuizzes(data.quizData);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <section className="text-gray-600 max-w-7xl mx-auto body-font">
      <div className="container px-5 py-24">
        <div className="mb-20">
          <div className="w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Latest Quizzes
            </h1>
            <div className="h-1 w-20 bg-blue-500 rounded" />
          </div>
        </div>
        <div className="text-gray-600 body-font">
          <div className="flex flex-wrap -m-4">
            {quizzes.map((quiz, index) => (
              <div key={index} className="p-4 md:w-1/3">
                <div className="h-full w-96 border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <div className="px-3 py-4">
                    <img src={quiz.imageUrl} className='rounded mb-3' />
                    <h1 className="title-font text-2xl capitalize font-medium text-gray-900 mb-2">
                      {quiz.name}
                    </h1>
                    <div className="pb-2">
                      <p className="title-font capitalize font-medium text-gray-900">
                        Category: {quiz.category}
                      </p>
                    </div>
                    <div className="pb-2">
                      <p className="title-font capitalize font-medium text-gray-900">
                        Difficulty: {quiz.difficulty}
                      </p>
                    </div>
                    <div className="pb-2">
                      <p className="title-font capitalize font-medium text-gray-900">
                        Tags: {quiz.tags}
                      </p>
                    </div>
                    <div className="flex items-center justify-between flex-wrap">
                      <a href={`/start-quiz/${quiz._id}`} className="text-blue-500 flex gap-2 items-center">
                        <p>Start Quiz</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestQuizz;