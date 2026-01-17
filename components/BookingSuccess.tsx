import React from 'react';
import { GlassCard } from './GlassCard';
import { Venue } from '../types';
import { CheckCircle, Calendar, MapPin, Users, ArrowRight, Download } from 'lucide-react';

interface BookingSuccessProps {
  venue: Venue;
  weddingDate: string;
  guestCount: number;
  onGoToDashboard: () => void;
}

export const BookingSuccess: React.FC<BookingSuccessProps> = ({ venue, weddingDate, guestCount, onGoToDashboard }) => {
  // Calculations (same as PaymentScreen for consistency)
  const totalAmount = venue.pricePerPlate * guestCount;
  const gst = totalAmount * 0.18;
  const grandTotal = totalAmount + gst;
  const paidAmount = Math.round(grandTotal * 0.25);
  const remainingAmount = grandTotal - paidAmount;

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <GlassCard className="max-w-2xl w-full p-8 md:p-12 text-center animate-fade-in-up relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
             <div className="absolute top-10 left-10 w-20 h-20 bg-vivah-stem/20 rounded-full blur-xl animate-float"></div>
             <div className="absolute bottom-10 right-10 w-32 h-32 bg-vivah-rose/20 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6 shadow-lg animate-bounce">
                <CheckCircle size={40} />
            </div>

            <h1 className="text-4xl font-bold text-vivah-burgundy mb-2">Booking Confirmed!</h1>
            <p className="text-vivah-burgundy/70 mb-8 text-lg">
                Congratulations! Your date at <span className="font-bold text-vivah-rose">{venue.name}</span> is officially secured.
            </p>

            {/* Ticket/Receipt Style Section */}
            <div className="w-full bg-white/50 border border-white/60 rounded-2xl p-6 mb-8 text-left shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-vivah-rose"></div>
                
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start border-b border-vivah-burgundy/10 pb-6 mb-6">
                    <img src={venue.image} alt="Venue" className="w-24 h-24 rounded-xl object-cover shadow-md" />
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-vivah-burgundy">{venue.name}</h3>
                        <p className="text-sm text-vivah-burgundy/60 flex items-center gap-1 mb-2"><MapPin size={14}/> {venue.location}</p>
                        <div className="flex gap-4 text-sm font-medium text-vivah-burgundy/80">
                            <span className="flex items-center gap-1"><Calendar size={14} className="text-vivah-rose"/> {new Date(weddingDate).toDateString()}</span>
                            <span className="flex items-center gap-1"><Users size={14} className="text-vivah-rose"/> {guestCount} Guests</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-xs text-vivah-burgundy/50 uppercase font-bold">Total Amount</p>
                        <p className="font-bold text-vivah-burgundy">₹{grandTotal.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                        <p className="text-xs text-emerald-600/70 uppercase font-bold">Paid Now</p>
                        <p className="font-bold text-emerald-600">₹{paidAmount.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                        <p className="text-xs text-orange-600/70 uppercase font-bold">Due Later</p>
                        <p className="font-bold text-orange-600">₹{remainingAmount.toLocaleString('en-IN')}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full">
                <button 
                    onClick={onGoToDashboard}
                    className="flex-1 py-4 bg-gradient-to-r from-vivah-burgundy to-vivah-rose text-white rounded-xl font-bold hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                    Go to Dashboard <ArrowRight size={20} />
                </button>
                <button className="flex-1 py-4 bg-white border border-vivah-burgundy/10 text-vivah-burgundy rounded-xl font-bold hover:bg-vivah-petal/30 transition-all flex items-center justify-center gap-2">
                    <Download size={20} /> Download Receipt
                </button>
            </div>
        </div>
      </GlassCard>
    </div>
  );
};