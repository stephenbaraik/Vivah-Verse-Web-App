import React from 'react';
import { Venue, UserPreferences } from '../types';
import EmiCalculator from './EmiCalculator';
import { ArrowLeft } from 'lucide-react';

interface PaymentScreenProps {
  venue: Venue;
  preferences: UserPreferences | null;
  weddingDate: string;
  totalAmount: number;
  onPaymentComplete: () => void;
  onBack: () => void;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ totalAmount, onBack, onPaymentComplete }) => {
  // The core logic is now inside EmiCalculator.
  // This component provides the page layout.

  const handlePayment = async (selectedPlan: number) => {
    try {
      const response = await fetch('http://localhost:5000/api/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          totalAmount: totalAmount,
          emiPlan: selectedPlan,
        }),
      });

      if (response.ok) {
        onPaymentComplete();
      } else {
        alert('Payment processing failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('An error occurred during payment processing.');
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-gray-900 to-purple-900 py-20 px-4 flex items-center justify-center">
       <div className="absolute top-8 left-8">
         <button 
            onClick={onBack} 
            className="flex items-center text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Services
          </button>
       </div>

      <div className="w-full max-w-lg">
        <EmiCalculator totalAmount={totalAmount} onProceed={handlePayment} />
      </div>
    </div>
  );
};

export default PaymentScreen;