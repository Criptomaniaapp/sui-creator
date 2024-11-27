import React, { useState } from 'react';

interface StepToggleProps {
  title: string;
  children: React.ReactNode;
}

const StepToggle: React.FC<StepToggleProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-4 border-b border-gray-700 pb-2">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center cursor-pointer bg-gray-700 p-3 rounded-lg hover:bg-gray-600"
      >
        <h4 className="text-lg font-semibold">{title}</h4>
        <span>{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default StepToggle;
