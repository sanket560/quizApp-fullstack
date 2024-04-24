import React from "react";
import clock from '../../Images/clock.png'
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-white">
      <div className="grid max-w-7xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
            Engage, Educate, and Entertain with Interactive Quizzes
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
            Unlock the power of interactive quizzes with our platform, designed
            to engage users, impart knowledge, and spark curiosity. Whether
            you're an educator, marketer, or content creator, our quiz tool
            empowers you to create captivating quizzes that captivate audiences
            and drive engagement. From fun personality quizzes to informative
            knowledge tests, our platform provides the flexibility and features
            you need to create memorable experiences for your audience
          </p>
          <Link
            to="/start-quiz"
            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-500 hover:bg-primary-800 focus:ring-4"
          >
            Get started
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <a
            href="#"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
          >
            Contact Us
          </a>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src={clock} alt="clock" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
