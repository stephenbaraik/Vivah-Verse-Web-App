import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { LOGO_URL } from '../../constants';
import { ArrowRight, LogIn } from 'lucide-react';
import { authService } from '../../services/authService';

interface AuthScreenProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onSuccess, onCancel }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleGoogleSignIn = () => {
    console.log("Attempting Google Sign-In");
    setError("Google Sign-In is not implemented yet.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRegistrationSuccess(false);

    if (isLogin) {
      try {
        await authService.login(email, password);
        onSuccess();
      } catch (err) {
        setError(err.message);
      }
    } else {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      }
      try {
        await authService.register(email, password);
        setRegistrationSuccess(true);
        setTimeout(() => {
          setIsLogin(true);
          setRegistrationSuccess(false);
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        }, 2000);
      } catch (err) {
        setError(err.message);
      }
    }
    setLoading(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError(null);
    setRegistrationSuccess(false);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <GlassCard className="max-w-md w-full p-8 md:p-12 relative overflow-hidden animate-fade-in-up">
        <div className="absolute top-0 right-0 w-32 h-32 bg-vivah-rose/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-vivah-stem/10 rounded-full blur-2xl -ml-10 -mb-10"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <img src={LOGO_URL} alt="Logo" className="w-16 h-16 mb-4 drop-shadow-md" />
          <h2 className="text-3xl font-bold text-vivah-burgundy mb-2">
            {isLogin ? 'Welcome Back' : 'Create Your Account'}
          </h2>
          <p className="text-vivah-burgundy/60 mb-8">
            {isLogin ? 'Sign in to continue planning your dream wedding.' : 'Get started by creating an account.'}
          </p>

          <div className="w-full space-y-4">
            <button
              onClick={handleGoogleSignIn}
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

            {error && <p className="text-red-500 text-sm bg-red-100 p-3 rounded-lg">{error}</p>}
            {registrationSuccess && <p className="text-green-600 text-sm bg-green-100 p-3 rounded-lg">Registration successful! Please log in.</p>}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/60 border border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-vivah-rose/50"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/60 border border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-vivah-rose/50"
              />
              {!isLogin && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/60 border border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-vivah-rose/50 animate-fade-in"
                />
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-vivah-burgundy text-white rounded-xl font-bold hover:bg-vivah-rose transition-colors shadow-lg flex items-center justify-center gap-2 disabled:bg-vivah-burgundy/50"
              >
                {loading ? 'Please wait...' : (isLogin ? <><LogIn size={18} /> Login</> : <><ArrowRight size={18} /> Create Account</>)}
              </button>
            </form>
          </div>

          <div className="mt-6 text-sm text-vivah-burgundy/60">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={toggleMode} className="font-semibold text-vivah-burgundy hover:underline focus:outline-none">
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </div>
          
          <button onClick={onCancel} className="mt-4 text-xs text-vivah-burgundy/60 hover:text-vivah-burgundy underline">
            Cancel
          </button>
        </div>
      </GlassCard>
    </div>
  );
};

