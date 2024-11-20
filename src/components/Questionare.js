import React, { useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const Questionnaire = () => {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  const handleStartQuestionnaire = () => {
    setShowQuestionnaire(true);
  };

  const questions = [
    {
      id: 1,
      question: "What is your favorite beverage?",
      options: ["Whiskey", "Vodka", "Rum", "Gin"],
    },
    {
      id: 2,
      question: "How often do you enjoy drinks?",
      options: ["Daily", "Weekly", "Occasionally", "Rarely"],
    },
    {
      id: 3,
      question: "What is your preferred age range for beverages?",
      options: ["1-5 years", "6-10 years", "11-15 years", "16+ years"],
    },
    {
      id: 4,
      question: "Would you recommend Jack Daniel's to a friend?",
      options: ["Yes", "No", "Maybe", "Not Sure"],
    },
  ];

  return (
    <div className="App">
      {!showQuestionnaire ? (
        <div>
          {/* Main content */}
          <div className="flex justify-center py-4">
            <button
              className="px-6 py-2 border-2 border-[#B9AC90] text-[#B9AC90] font-semibold text-lg hover:bg-[#B9AC90] hover:text-white transition-all"
              onClick={handleStartQuestionnaire}
            >
              Take Questionnaire
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#B9AC90] text-white px-6 py-4">
          {/* Warning */}
          <div className="flex items-center mb-4">
            <FaExclamationTriangle size={20} className="mr-2" />
            <p className="font-semibold">
              Hurry up! The number of prizes is limited!
            </p>
          </div>

          {/* Step Indicator */}
          <div className="w-full h-[2px] bg-white mb-4"></div>

          {/* Questions */}
          {questions.map((q, index) => (
            <div key={q.id} className="mb-6">
              <h3 className="text-lg font-semibold mb-2">
                {index + 1}. {q.question}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {q.options.map((option, idx) => (
                  <button
                    key={idx}
                    className="px-4 py-2 border-2 border-white text-white hover:bg-white hover:text-[#B9AC90] transition-all font-medium"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Exclusive Message */}
          <div className="flex justify-center py-4 border-t border-[#B9AC90] mt-6">
            <p className="text-[#B9AC90] font-medium text-base">
              Exclusive Prizes | Quick and Easy | Only 6 Left
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questionnaire;
