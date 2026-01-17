import React from 'react';
import { Venue } from '../types';

interface BookingSuccessProps {
  venue: Venue;
  weddingDate: string;
  guestCount: number;
  onGoToDashboard: () => void;
}

const BookingSuccess: React.FC<BookingSuccessProps> = ({ onGoToDashboard, venue, weddingDate, guestCount }) => {
  return (
    <div className="bg-gray-100 min-h-screen pt-12">
      <main className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-10">
          <svg className="w-24 h-24 mx-auto text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-6">Congratulations! Your wedding at <strong>{venue.name}</strong> for <strong>{guestCount}</strong> guests on <strong>{new Date(weddingDate).toLocaleDateString()}</strong> is confirmed.</p>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-left mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Next Steps:</h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <span>You will receive an email confirmation with your booking details shortly.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <span>Your dedicated Wedding Manager will contact you within 24 hours to begin the planning process.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <span>Explore your dashboard to start managing your guest list and checklist.</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onGoToDashboard}
            className="bg-blue-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go to My Dashboard
          </button>
        </div>
      </main>
    </div>
  );
};

export default BookingSuccess;
