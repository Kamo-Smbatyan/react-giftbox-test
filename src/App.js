import React, { useState } from "react";
import { FaShoppingCart, FaClock } from "react-icons/fa";
import "./App.css";
import logo from "./assets/logo.png";
import product from "./assets/product.png";
import RewardComponent from "./components/Rewards";

// Header Component
const Header = ({ currentDate }) => (
  <header className="App-header flex justify-center items-center h-20 bg-gray-800 relative">
    <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
      <FaShoppingCart size={24} color="white" />
    </div>
    <img src={logo} className="App-logo max-w-[150px]" alt="logo" />
    <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
      <FaClock size={20} color="white" />
    </div>
  </header>
);

// Progress Bar Component
const ProgressBar = ({ steps, currentStep }) => (
  <div className="flex gap-2 mb-6 px-4 pt-8 mx-auto max-w-sm">
    {steps.map((_, index) => (
      <div
        key={index}
        className={`flex-1 h-[2px] ${index <= currentStep ? "bg-[#B9AC90]" : "bg-gray-400"}`}
      ></div>
    ))}
  </div>
);

// Question Component
const Question = ({ question, options, onSelect, selectedOption }) => (
  <div className="mb-6 px-4 max-w-sm mx-auto">
    <h3 className="text-2xl text-white font-semibold mb-4">{question}</h3>
    <div className="grid grid-cols-1 gap-4">
      {options.map((option, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(option)}
          className={`px-4 py-2 border-2 ${
            selectedOption === option ? "bg-[#B9AC90] text-white" : "text-[#B9AC90]"
          } border-[#B9AC90] hover:bg-[#B9AC90] hover:text-white transition-all font-medium`}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCheckingAnswers, setIsCheckingAnswers] = useState(false);
  const [checkProgress, setCheckProgress] = useState(0);
  const [loaderProgress, setLoaderProgress] = useState(0);
  const [showReward, setShowReward] = useState(false);

  const questions = [
    { id: 1, question: "Are you a man or a woman?", options: ["MAN", "WOMAN"] },
    { id: 2, question: "How old are you?", options: ["18-29", "30-39", "40-49", "50+"] },
    { id: 3, question: "How many members are in your family?", options: ["ALONE", "1", "2", "3+"] },
    { id: 4, question: "Have you bought anything at Jack Daniel's before?", options: ["NO", "YES"] },
  ];

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setIsCheckingAnswers(true);
        startProgressChecks();
      }
      setSelectedOption(null);
    }, 300);
  };

  const startProgressChecks = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress++;
      setCheckProgress(progress);
      setLoaderProgress(progress * 33);
      if (progress === 3) {
        clearInterval(interval);
        setTimeout(() => setShowReward(true), 1500);
      }
    }, 1500);
  };

  return (
    <div className="App">
      <Header currentDate={currentDate} />

      {showReward ? (
        <RewardComponent />
      ) : !showQuestionnaire && !isCheckingAnswers ? (
        <div className="flex flex-col items-center py-6 px-6">
          <h2 className="text-[#B9AC90] text-center text-3xl font-bold">
            Exclusive Offer for You
          </h2>
          <h3 className="text-white text-center py-4">
            Win a Limited Edition Jack Daniel's Sinatra Century!
          </h3>
          <img src={product} alt="Limited Edition Product" className="max-w-sm" />
          <button
            className="mt-6 px-6 py-2 border-2 border-[#B9AC90] text-[#B9AC90] hover:bg-[#B9AC90] hover:text-white"
            onClick={() => setShowQuestionnaire(true)}
          >
            Take Questionnaire
          </button>
        </div>
      ) : isCheckingAnswers ? (
        <div className="text-white mx-auto max-w-md px-4 py-6">
          <h2 className="text-2xl">We are checking your answers...</h2>
          <div className="w-full bg-gray-700 rounded-full h-1 my-4">
            <div
              className="bg-[#B9AC90] h-1 rounded-full"
              style={{ width: `${loaderProgress}%` }}
            ></div>
          </div>
          <ul>
            {[
              "You answered all questions.",
              "No previous polls from your IP.",
              "There are still prizes available!",
            ].map((msg, idx) => (
              <li key={idx} className="flex items-center my-2">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                    idx < checkProgress ? "bg-green-500" : "bg-gray-400"
                  }`}
                >
                  {idx < checkProgress && "✔"}
                </span>
                <p>{msg}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <ProgressBar steps={questions} currentStep={currentQuestionIndex} />
          <Question
            question={questions[currentQuestionIndex].question}
            options={questions[currentQuestionIndex].options}
            selectedOption={selectedOption}
            onSelect={handleOptionSelect}
          />
        </>
      )}
    </div>
  );
}

export default App;
