import React from 'react';
import { GlassCard } from './GlassCard';
import { LOGO_URL } from '../constants';
import { ArrowRight } from 'lucide-react';

interface AuthScreenProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onSuccess, onCancel }) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <GlassCard className="max-w-md w-full p-8 md:p-12 relative overflow-hidden animate-fade-in-up">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-vivah-rose/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-vivah-stem/10 rounded-full blur-2xl -ml-10 -mb-10"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <img src={LOGO_URL} alt="Logo" className="w-16 h-16 mb-4 drop-shadow-md" />
          <h2 className="text-3xl font-bold text-vivah-burgundy mb-2">Welcome to Vivah</h2>
          <p className="text-vivah-burgundy/60 mb-8">Sign in to save your venue and continue planning your dream wedding.</p>

          <div className="w-full space-y-4">
            <button 
              onClick={onSuccess}
              className="w-full h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm group"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              <span className="font-semibold text-gray-700">Continue with Google</span>
            </button>

            <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-vivah-burgundy/10"></div>
                <span className="flex-shrink-0 mx-4 text-xs text-vivah-burgundy/40 uppercase font-bold">Or Email</span>
                <div className="flex-grow border-t border-vivah-burgundy/10"></div>
            </div>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSuccess(); }}>
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full px-4 py-3 bg-white/60 border border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-vivah-rose/50"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    className="w-full px-4 py-3 bg-white/60 border border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-vivah-rose/50"
                />
                <button 
                    type="submit"
                    className="w-full h-12 bg-vivah-burgundy text-white rounded-xl font-bold hover:bg-vivah-rose transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                    Sign Up <ArrowRight size={18} />
                </button>
            </form>
          </div>

          <button onClick={onCancel} className="mt-6 text-sm text-vivah-burgundy/60 hover:text-vivah-burgundy underline">
            Cancel and go back
          </button>
        </div>
      </GlassCard>
    </div>
  );
};