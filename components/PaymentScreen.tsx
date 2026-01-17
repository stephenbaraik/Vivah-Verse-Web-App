import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { Venue, UserPreferences } from '../types';
import { CreditCard, Smartphone, ShieldCheck, AlertCircle, CheckCircle, Lock, Calendar, IndianRupee, ArrowLeft, Percent, Umbrella } from 'lucide-react';

interface PaymentScreenProps {
  venue: Venue;
  preferences: UserPreferences | null;
  weddingDate: string;
  onPaymentComplete: () => void;
  onBack: () => void;
}

export const PaymentScreen: React.FC<PaymentScreenProps> = ({ 
  venue, 
  preferences, 
  weddingDate,
  onPaymentComplete,
  onBack 
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'emi'>('card');
  const [addInsurance, setAddInsurance] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const guestCount = preferences?.guestCount || 0;
  const totalAmount = venue.pricePerPlate * guestCount;
  const gst = totalAmount * 0.18;
  const insuranceCost = addInsurance ? 15000 : 0;
  const grandTotal = totalAmount + gst + insuranceCost;
  
  // Booking Logic: 25% Advance
  const bookingAmount = Math.round(grandTotal * 0.25);
  const remainingAmount = grandTotal - bookingAmount;
  
  const wDate = new Date(weddingDate);
  const dueDate = new Date(wDate.setDate(wDate.getDate() - 30)).toDateString();

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
        setIsProcessing(false);
        onPaymentComplete();
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <button 
        onClick={onBack}
        className="flex items-center text-vivah-burgundy/60 hover:text-vivah-rose transition-colors mb-6 font-medium"
      >
        <ArrowLeft size={20} className="mr-2" /> Back to Venue
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Payment Methods */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold text-vivah-burgundy mb-2 flex items-center gap-2">
                <Lock size={24} className="text-vivah-rose" /> Secure Escrow Payment
            </h2>
            <p className="text-sm text-vivah-burgundy/60 mb-6 flex items-center gap-2 bg-emerald-50 p-3 rounded-lg border border-emerald-100">
               <ShieldCheck size={16} className="text-emerald-600"/>
               <span>Your funds are held in a secure <strong>Vivah Verse Escrow</strong> account and only released to the vendor upon milestone completion.</span>
            </p>

            {/* Insurance Upsell */}
            <div 
                onClick={() => setAddInsurance(!addInsurance)}
                className={`
                    mb-8 p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-4 relative overflow-hidden
                    ${addInsurance ? 'bg-vivah-gold/10 border-vivah-gold' : 'bg-white/40 border-gray-200 hover:border-gray-300'}
                `}
            >
                <div className={`p-3 rounded-full ${addInsurance ? 'bg-vivah-gold text-white' : 'bg-gray-200 text-gray-500'}`}>
                    <Umbrella size={24} />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-center">
                         <h3 className="font-bold text-vivah-burgundy text-lg">Add Wedding Insurance</h3>
                         <span className="font-bold text-vivah-burgundy">₹15,000</span>
                    </div>
                    <p className="text-sm text-vivah-burgundy/70 mt-1">
                        Protect your big day against cancellations, weather, and vendor no-shows. 100% money-back guarantee.
                    </p>
                </div>
                {addInsurance && (
                    <div className="absolute top-0 right-0 bg-vivah-gold text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                        ADDED
                    </div>
                )}
            </div>

            {/* Payment Method Tabs */}
            <div className="flex gap-4 mb-8">
                <button 
                    onClick={() => setPaymentMethod('card')}
                    className={`flex-1 py-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'card' ? 'bg-vivah-burgundy text-white border-vivah-burgundy shadow-lg' : 'bg-white/40 text-vivah-burgundy/60 border-white/60 hover:bg-white'}`}
                >
                    <CreditCard size={24} />
                    <span className="font-bold">Card</span>
                </button>
                <button 
                    onClick={() => setPaymentMethod('upi')}
                    className={`flex-1 py-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'upi' ? 'bg-vivah-burgundy text-white border-vivah-burgundy shadow-lg' : 'bg-white/40 text-vivah-burgundy/60 border-white/60 hover:bg-white'}`}
                >
                    <Smartphone size={24} />
                    <span className="font-bold">UPI</span>
                </button>
                <button 
                    onClick={() => setPaymentMethod('emi')}
                    className={`flex-1 py-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'emi' ? 'bg-vivah-gold text-white border-vivah-gold shadow-lg' : 'bg-white/40 text-vivah-burgundy/60 border-white/60 hover:bg-white'}`}
                >
                    <Percent size={24} />
                    <span className="font-bold">Flexi-Pay</span>
                </button>
            </div>

            {/* Payment Form */}
            <form onSubmit={handlePay}>
                {paymentMethod === 'card' && (
                    <div className="space-y-4 animate-fade-in">
                        <div>
                            <label className="block text-sm font-bold text-vivah-burgundy/70 mb-1">Card Number</label>
                            <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-4 py-3 rounded-xl border-none bg-white/60 focus:ring-2 focus:ring-vivah-rose" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-vivah-burgundy/70 mb-1">Expiry Date</label>
                                <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 rounded-xl border-none bg-white/60 focus:ring-2 focus:ring-vivah-rose" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-vivah-burgundy/70 mb-1">CVV</label>
                                <input type="password" placeholder="123" className="w-full px-4 py-3 rounded-xl border-none bg-white/60 focus:ring-2 focus:ring-vivah-rose" required />
                            </div>
                        </div>
                    </div>
                )}

                {paymentMethod === 'upi' && (
                    <div className="space-y-4 animate-fade-in">
                        <div>
                            <label className="block text-sm font-bold text-vivah-burgundy/70 mb-1">UPI ID</label>
                            <input type="text" placeholder="username@upi" className="w-full px-4 py-3 rounded-xl border-none bg-white/60 focus:ring-2 focus:ring-vivah-rose" required />
                        </div>
                        <div className="p-4 bg-vivah-petal/30 rounded-xl text-center text-sm text-vivah-burgundy/70">
                            A payment request will be sent to your UPI app.
                        </div>
                    </div>
                )}

                {paymentMethod === 'emi' && (
                    <div className="space-y-4 animate-fade-in">
                        <div className="p-4 bg-vivah-gold/10 border border-vivah-gold/30 rounded-xl">
                            <h4 className="font-bold text-vivah-burgundy mb-2">Dream Now, Pay Later</h4>
                            <p className="text-sm text-vivah-burgundy/70 mb-4">Choose a flexible EMI plan powered by our banking partners.</p>
                            
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-vivah-gold">
                                    <input type="radio" name="emi" defaultChecked className="text-vivah-gold focus:ring-vivah-gold" />
                                    <div className="flex-1">
                                        <div className="flex justify-between font-bold text-vivah-burgundy">
                                            <span>6 Months</span>
                                            <span>₹{(Math.round(bookingAmount/6)).toLocaleString('en-IN')}/mo</span>
                                        </div>
                                        <div className="text-xs text-vivah-burgundy/50">Zero Cost EMI</div>
                                    </div>
                                </label>
                                <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-vivah-gold">
                                    <input type="radio" name="emi" className="text-vivah-gold focus:ring-vivah-gold" />
                                    <div className="flex-1">
                                        <div className="flex justify-between font-bold text-vivah-burgundy">
                                            <span>12 Months</span>
                                            <span>₹{(Math.round((bookingAmount * 1.12)/12)).toLocaleString('en-IN')}/mo</span>
                                        </div>
                                        <div className="text-xs text-vivah-burgundy/50">12% Interest p.a.</div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                <button 
                    type="submit" 
                    disabled={isProcessing}
                    className="w-full mt-8 bg-gradient-to-r from-vivah-burgundy to-vivah-rose text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                >
                    {isProcessing ? (
                        <>Processing Payment...</>
                    ) : (
                        <>Pay ₹{bookingAmount.toLocaleString('en-IN')} to Secure Venue</>
                    )}
                </button>
            </form>
            
            <div className="mt-6 flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <ShieldCheck size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-sm text-emerald-800">
                    Your payment information is encrypted. We do not store card details. Escrow protection enabled.
                </p>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
                <GlassCard className="p-8 border-t-4 border-vivah-rose shadow-xl">
                    <h3 className="text-lg font-bold text-vivah-burgundy uppercase tracking-widest mb-6 border-b border-vivah-burgundy/10 pb-4">Booking Summary</h3>
                    
                    <div className="space-y-4 mb-6">
                        <div>
                            <p className="text-xs text-vivah-burgundy/60 font-bold uppercase">Venue</p>
                            <p className="font-bold text-vivah-burgundy text-lg">{venue.name}</p>
                            <p className="text-sm text-vivah-burgundy/70">{venue.location}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-vivah-burgundy/60 font-bold uppercase">Date</p>
                                <p className="font-bold text-vivah-burgundy flex items-center gap-1"><Calendar size={14}/> {new Date(weddingDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-xs text-vivah-burgundy/60 font-bold uppercase">Guests</p>
                                <p className="font-bold text-vivah-burgundy">{guestCount}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 border-t border-vivah-burgundy/10 pt-4 text-sm">
                        <div className="flex justify-between text-vivah-burgundy/70">
                            <span>Cost per plate</span>
                            <span>₹{venue.pricePerPlate}</span>
                        </div>
                        <div className="flex justify-between text-vivah-burgundy/70">
                            <span>Total Venue Cost</span>
                            <span>₹{totalAmount.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-vivah-burgundy/70">
                            <span>GST (18%)</span>
                            <span>₹{gst.toLocaleString('en-IN')}</span>
                        </div>
                        {addInsurance && (
                            <div className="flex justify-between text-vivah-burgundy/70">
                                <span>Vivah Shield Insurance</span>
                                <span>₹{insuranceCost.toLocaleString('en-IN')}</span>
                            </div>
                        )}
                        <div className="flex justify-between font-bold text-vivah-burgundy text-base pt-2 border-t border-dashed border-vivah-burgundy/20">
                            <span>Grand Total</span>
                            <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                        </div>
                    </div>

                    <div className="mt-6 bg-vivah-rose/10 p-4 rounded-xl border border-vivah-rose/20">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-vivah-rose">Pay Now (25%)</span>
                            <span className="font-bold text-2xl text-vivah-rose">₹{bookingAmount.toLocaleString('en-IN')}</span>
                        </div>
                        <p className="text-xs text-vivah-burgundy/60 leading-tight">
                            Advance token amount to block your dates. The remaining balance of <strong className="text-vivah-burgundy">₹{remainingAmount.toLocaleString('en-IN')}</strong> is due by {dueDate}.
                        </p>
                    </div>
                </GlassCard>
            </div>
        </div>

      </div>
    </div>
  );
};
