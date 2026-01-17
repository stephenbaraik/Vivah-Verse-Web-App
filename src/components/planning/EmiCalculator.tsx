import React, { useState } from 'react';

interface EmiCalculatorProps {
  totalAmount: number;
  onProceed: (selectedPlan: number) => void;
}

const EmiCalculator: React.FC<EmiCalculatorProps> = ({ totalAmount, onProceed }) => {
  const downPaymentPercentage = 0.40;
  const emiPercentage = 0.60;

  const downPayment = totalAmount * downPaymentPercentage;
  const emiAmount = totalAmount * emiPercentage;

  const [selectedPlan, setSelectedPlan] = useState<number>(6);

  const calculateEmi = (months: number) => {
    return (emiAmount / months).toFixed(2);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 md:p-8 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">EMI Payment Options</h2>
      
      <div className="mb-6 text-center">
        <p className="text-lg">Total Package Cost</p>
        <p className="text-4xl font-bold tracking-tight">₹{totalAmount.toLocaleString('en-IN')}</p>
      </div>

      <div className="bg-white/10 rounded-xl p-4 mb-6">
        <p className="text-lg flex justify-between">
          <span>Upfront Down Payment (40%)</span>
          <span className="font-bold">₹{downPayment.toLocaleString('en-IN')}</span>
        </p>
        <p className="text-sm text-gray-300 mt-1">To be paid now to confirm your booking.</p>
      </div>
      
      <div className="bg-white/10 rounded-xl p-4">
        <p className="text-lg flex justify-between">
          <span>Remaining Amount (60%)</span>
          <span className="font-bold">₹{emiAmount.toLocaleString('en-IN')}</span>
        </p>
        <p className="text-sm text-gray-300 mt-1">To be paid in easy EMIs post-event.</p>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-center">Choose Your EMI Plan</h3>
        <div className="flex justify-center gap-4">
          <div 
            onClick={() => setSelectedPlan(6)}
            className={`cursor-pointer text-center p-4 rounded-xl border-2 transition-all w-1/2
              ${selectedPlan === 6 ? 'bg-white text-purple-900 border-white' : 'border-white/50 hover:bg-white/10'}`}
          >
            <p className="font-bold text-lg">6 Months</p>
            <p className="text-2xl font-bold">₹{calculateEmi(6)}</p>
            <p className="text-sm">per month</p>
          </div>
          <div 
            onClick={() => setSelectedPlan(12)}
            className={`cursor-pointer text-center p-4 rounded-xl border-2 transition-all w-1/2
              ${selectedPlan === 12 ? 'bg-white text-purple-900 border-white' : 'border-white/50 hover:bg-white/10'}`}
          >
            <p className="font-bold text-lg">12 Months</p>
            <p className="text-2xl font-bold">₹{calculateEmi(12)}</p>
            <p className="text-sm">per month</p>
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => onProceed(selectedPlan)}
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-xl mt-8 transition-all duration-300 shadow-lg">
        Proceed to Pay ₹{downPayment.toLocaleString('en-IN')}
      </button>
    </div>
  );
};

export default EmiCalculator;

