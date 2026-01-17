import React from 'react';
import { GlassCard } from './GlassCard';
import { Upload } from 'lucide-react';

export const VendorForm: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Partner with Vivah Verse</h2>
        <p className="text-gray-600 mt-2">Simplify the market. Grow your business.</p>
      </div>

      <GlassCard className="p-8">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border-none bg-white/60 focus:ring-2 focus:ring-pink-400" placeholder="e.g., Royal Decorators" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select className="w-full px-4 py-3 rounded-xl border-none bg-white/60 focus:ring-2 focus:ring-pink-400 text-gray-600">
                <option>Venue Owner</option>
                <option>Decor</option>
                <option>Catering</option>
                <option>Photography</option>
                <option>Makeup Artist</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Description</label>
            <textarea rows={4} className="w-full px-4 py-3 rounded-xl border-none bg-white/60 focus:ring-2 focus:ring-pink-400" placeholder="Tell us about your services..."></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio Images</label>
            <div className="border-2 border-dashed border-pink-300 rounded-xl p-8 flex flex-col items-center justify-center text-gray-500 bg-white/30 hover:bg-white/50 transition-colors cursor-pointer">
              <Upload size={32} className="mb-2 text-pink-500" />
              <p>Click to upload or drag and drop</p>
            </div>
          </div>

          <button type="button" className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-emerald-500/30 transition-all">
            Submit Listing for Review
          </button>
          
          <p className="text-xs text-center text-gray-500">
            By submitting, you agree to our vendor terms. We handle the bookings, you handle the service.
          </p>
        </form>
      </GlassCard>
    </div>
  );
};
