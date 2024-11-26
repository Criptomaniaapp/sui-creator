import React, { useState } from 'react';

interface Step {
  title: string;
  content: React.ReactNode;
}

interface StepFormProps {
  steps: Step[];
  onSubmit?: () => void;
}

export default function StepForm({ steps, onSubmit }: StepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep === steps.length - 1 && onSubmit) {
      onSubmit();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div>
      {/* Step Indicators */}
      <div className="flex space-x-4 mb-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex-1 h-2 rounded-full ${
              index <= currentStep ? 'bg-blue-600' : 'bg-gray-500'
            }`}
          ></div>
        ))}
      </div>

      {/* Step Title */}
      <h2 className="text-xl font-semibold mb-4">{steps[currentStep].title}</h2>

      {/* Step Content */}
      <div className="mb-6">{steps[currentStep].content}</div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        {/* Previous Button */}
        {currentStep > 0 && (
          <button
            type="button"
            onClick={handlePrev}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Previous
          </button>
        )}

        {/* Next/Create Button */}
        {currentStep < steps.length - 1 && (
          <button
            type="button"
            onClick={handleNext}
            className={`px-4 py-2 rounded-lg text-white ${
              currentStep === 1
                ? 'bg-green-600 hover:bg-green-500'
                : 'bg-blue-600 hover:bg-blue-500'
            }`}
          >
            {currentStep === 1 ? 'Create Token' : 'Next'}
          </button>
        )}
      </div>
    </div>
  );
}


