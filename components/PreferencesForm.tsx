import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { UserPreferences } from '../types';
import { MapPin, Users, IndianRupee, Heart, ArrowRight } from 'lucide-react';

interface PreferencesFormProps {
  weddingDate: string;
  onComplete: (prefs: UserPreferences) => void;
}

export const PreferencesForm: React.FC<PreferencesFormProps> = ({ weddingDate, onComplete }) => {
  const [city, setCity] = useState('');
  const [guestCount, setGuestCount] = useState<number>(0);
  const [budget, setBudget] = useState('');
  const [vibe, setVibe] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city && guestCount && budget && vibe) {
      onComplete({ city, guestCount, budget, vibe });
    }
  };

  const vibes = ['Royal Heritage', 'Beachside Bliss', 'Modern Minimal', 'Boho Chic', 'Traditional'];

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 py-16">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold text-vivah-burgundy mb-4">Designing Your Day</h2>
          <p className="text-vivah-burgundy/70 text-2xl font-light">
            Tell us a bit more about your dream wedding on <span className="font-bold text-vivah-rose bg-white/50 px-3 py-1 rounded-lg">{new Date(weddingDate).toDateString()}</span>
          </p>
        </div>

        <GlassCard className="p-10 md:p-16 animate-slide-up delay-100 rounded-[3rem]">
          <form onSubmit={handleSubmit} className="space-y-10">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* City Selection */}
              <div className="space-y-3 group">
                <label className="flex items-center gap-2 text-base font-bold text-vivah-burgundy/70 uppercase tracking-wide">
                  <MapPin size={18} className="text-vivah-rose" /> Destination City
                </label>
                <select 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-white/60 border border-white/80 rounded-2xl px-6 py-5 text-xl text-vivah-burgundy font-semibold focus:ring-4 focus:ring-vivah-rose/20 focus:bg-white transition-all outline-none appearance-none cursor-pointer hover:bg-white/80"
                  required
                >
                  <option value="" disabled>Select a City</option>
                  <option value="Udaipur">Udaipur, Rajasthan</option>
                  <option value="Jaipur">Jaipur, Rajasthan</option>
                  <option value="Goa">Goa</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Delhi">New Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                </select>
              </div>

              {/* Guest Count */}
              <div className="space-y-3 group">
                <label className="flex items-center gap-2 text-base font-bold text-vivah-burgundy/70 uppercase tracking-wide">
                  <Users size={18} className="text-vivah-rose" /> Number of Guests
                </label>
                <input 
                  type="number" 
                  min="50"
                  step="25"
                  placeholder="e.g. 250"
                  value={guestCount || ''}
                  onChange={(e) => setGuestCount(parseInt(e.target.value))}
                  className="w-full bg-white/60 border border-white/80 rounded-2xl px-6 py-5 text-xl text-vivah-burgundy font-semibold focus:ring-4 focus:ring-vivah-rose/20 focus:bg-white transition-all outline-none placeholder-vivah-burgundy/30 hover:bg-white/80"
                  required
                />
              </div>

              {/* Budget */}
              <div className="space-y-3 group">
                <label className="flex items-center gap-2 text-base font-bold text-vivah-burgundy/70 uppercase tracking-wide">
                  <IndianRupee size={18} className="text-vivah-rose" /> Total Budget
                </label>
                <select 
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-white/60 border border-white/80 rounded-2xl px-6 py-5 text-xl text-vivah-burgundy font-semibold focus:ring-4 focus:ring-vivah-rose/20 focus:bg-white transition-all outline-none appearance-none cursor-pointer hover:bg-white/80"
                  required
                >
                  <option value="" disabled>Select Budget Range</option>
                  <option value="10-25L">₹10 Lakhs - ₹25 Lakhs</option>
                  <option value="25-50L">₹25 Lakhs - ₹50 Lakhs</option>
                  <option value="50L-1Cr">₹50 Lakhs - ₹1 Crore</option>
                  <option value="1Cr+">₹1 Crore +</option>
                </select>
              </div>

              {/* Vibe Selection */}
              <div className="space-y-3 group">
                <label className="flex items-center gap-2 text-base font-bold text-vivah-burgundy/70 uppercase tracking-wide">
                  <Heart size={18} className="text-vivah-rose" /> Wedding Vibe
                </label>
                <div className="flex flex-wrap gap-3">
                  {vibes.map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setVibe(v)}
                      className={`px-6 py-4 rounded-2xl text-base font-medium transition-all duration-300 flex-grow md:flex-grow-0 ${
                        vibe === v 
                          ? 'bg-vivah-rose text-white shadow-lg transform scale-105' 
                          : 'bg-white/50 text-vivah-burgundy hover:bg-white hover:shadow-md border border-transparent hover:border-vivah-soft'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
                {/* Hidden input for validation if needed */}
                <input type="hidden" required value={vibe} /> 
              </div>
            </div>

            <div className="pt-12 flex justify-center">
              <button
                type="submit"
                disabled={!city || !guestCount || !budget || !vibe}
                className="w-full md:w-2/3 h-[80px] bg-vivah-burgundy text-white text-xl font-bold rounded-3xl shadow-xl hover:shadow-2xl hover:bg-black transform hover:-translate-y-2 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 disabled:hover:translate-y-0"
              >
                Find My Dream Venue <ArrowRight size={24} />
              </button>
            </div>

          </form>
        </GlassCard>
      </div>
    </div>
  );
};