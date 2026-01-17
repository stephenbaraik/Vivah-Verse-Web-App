import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import EmiCalculator from '../planning/EmiCalculator';

interface PaymentScreenProps {
  totalAmount: number;
  onPaymentComplete: () => void;
  onBack: () => void;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ totalAmount, onBack, onPaymentComplete }) => {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handlePayment = async (selectedPlan: number) => {
    setIsProcessing(true);
    setError(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/process-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          totalAmount,
          emiPlan: selectedPlan,
        }),
      });

      if (response.ok) {
        onPaymentComplete();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Payment processing failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError('An error occurred during payment processing. Please check your connection.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-gray-900 to-purple-900 py-20 px-4 flex items-center justify-center">
      <div className="absolute top-8 left-8">
        <button 
          onClick={onBack} 
          className="flex items-center text-white/50 hover:text-white transition-colors"
          disabled={isProcessing}
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Services
        </button>
      </div>

      <div className="w-full max-w-lg">
        {error && (
          <GlassCard className="mb-4 p-4 bg-red-50 border-red-200">
            <p className="text-red-600 text-sm">{error}</p>
          </GlassCard>
        )}
        <EmiCalculator 
          totalAmount={totalAmount} 
          onProceed={handlePayment}
          isProcessing={isProcessing}
        />
      </div>
    </div>
  );
};

export default PaymentScreen;

