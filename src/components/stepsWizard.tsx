import React from "react";
import checkIcon from "../assets/check.svg";

interface WizardProps {
  wizardSteps?: string[];
  order?: number;
}

export const Wizard: React.FC<WizardProps> = ({
  wizardSteps = [
    "Personal Info",
    "Contact Details",
    "Workers Preferences",
    "Preview",
  ],
  order = 1,
}) => {
  return (
    <div className="flex justify-between items-center max-w-4xl mx-auto my-10 px-4 relative">
      {wizardSteps.map((item, i) => {
        const isActive = i < order;
        const isCompleted = i < order - 1;
        const isLast = i === wizardSteps.length - 1;
        const isFirst = i === 0;

        return (
          <div
            key={i}
            className="flex flex-col items-center text-center flex-1 relative group"
          >
            {!isFirst && (
              <div
                className={`absolute top-5 left-0 w-1/2 h-1 z-[-1] transition-colors duration-300 rounded-full
                  ${isActive ? "bg-gradient-to-r from-blue-500 to-indigo-500" : "bg-gray-300 dark:bg-gray-600"}`}
              />
            )}
            {!isLast && (
              <div
                className={`absolute top-5 right-0 w-1/2 h-1 z-[-1] transition-colors duration-300 rounded-full
                  ${i + 1 < order ? "bg-gradient-to-r from-indigo-500 to-blue-500" : "bg-gray-300 dark:bg-gray-600"}`}
              />
            )}

            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full shadow-md font-semibold text-sm z-10
                transition-all duration-300 transform 
                ${isActive ? "bg-positive-interactive text-white scale-110" : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"}`}
            >
              {isCompleted ? (
                <img src={checkIcon} alt="check" className="w-5 h-5" />
              ) : (
                <span>{i + 1}</span>
              )}
            </div>

            <span
              className={`mt-2 text-sm font-medium transition-colors duration-300
                ${isActive ? "text-positive-interactive dark:text-positive-interactive-dark" : "text-secondary-static dark:text-gray-400"}`}
            >
              {item}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(Wizard);
