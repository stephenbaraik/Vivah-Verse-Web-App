import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { ContactUs } from './components/ContactUs';
import { VenueList } from './components/VenueList';
import { VenueDetails } from './components/VenueDetails';
import { AuthScreen } from './components/AuthScreen';
import { PaymentScreen } from './components/PaymentScreen';
import { BookingSuccess } from './components/BookingSuccess';
import { VendorServiceList } from './components/VendorServiceList';
import { VendorForm } from './components/VendorForm';
import { VendorDashboard } from './components/VendorDashboard';
import { Dashboard } from './components/Dashboard';
import { GuestManager } from './components/GuestManager';
import { MicroServices } from './components/MicroServices';
import { ShagunWallet } from './components/ShagunWallet';
import { CrisisControl } from './components/CrisisControl';
import { LegalAid } from './components/LegalAid';
import { WeddingPlannerAI } from './components/WeddingPlannerAI';
import { InspirationBoard } from './components/InspirationBoard';
import { AIOnboarding } from './components/AIOnboarding';
import { PackageSelection } from './components/PackageSelection';
import { Problem } from './components/Problem';
import { Solution } from './components/Solution';
import { BusinessModel } from './components/BusinessModel';
import { Sustainability } from './components/Sustainability';
import { Team } from './components/Team';
import { TargetAudience } from './components/TargetAudience';
import { CurrentStage } from './components/CurrentStage';
import { MOCK_VENDOR_SERVICES } from './constants';
import { AppView, Venue, UserPreferences, PackageTier } from './types';
import { MessageCircle, ArrowLeft } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [weddingDate, setWeddingDate] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<PackageTier | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [bookedServiceIds, setBookedServiceIds] = useState<string[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const bookedServices = MOCK_VENDOR_SERVICES.filter(s => bookedServiceIds.includes(s.id));
  const hasActivePlan = !!weddingDate;

  // Flow Handlers
  const handleStartPlanning = () => {
    if (weddingDate) {
      setCurrentView(AppView.AI_ONBOARDING);
    }
  };

  const handleOnboardingComplete = (prefs: UserPreferences) => {
    setPreferences(prefs);
    setCurrentView(AppView.PACKAGES);
  };

  const handlePackageSelect = (tier: PackageTier) => {
    setSelectedPackage(tier);
    setCurrentView(AppView.VENUES); // Go to venues, ideally filtered by tier
  };

  const handleViewVenueDetails = (venue: Venue) => {
    setSelectedVenue(venue);
    setCurrentView(AppView.VENUE_DETAILS);
  };

  const handleProceedToBook = () => {
    // If user has selected package and venue, go to customization (Services) before payment
    setCurrentView(AppView.SERVICES); 
  };

  const handleServicesDone = () => {
     if (isLoggedIn) {
      setCurrentView(AppView.PAYMENT);
    } else {
      setCurrentView(AppView.AUTH);
    }
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setCurrentView(AppView.PAYMENT);
  };

  const handlePaymentSuccess = () => {
    setCurrentView(AppView.BOOKING_SUCCESS);
  };

  const handleToggleService = (serviceId: string) => {
    setBookedServiceIds(prev => {
      if (prev.includes(serviceId)) {
        return prev.filter(id => id !== serviceId);
      }
      return [...prev, serviceId];
    });
  };

  const renderContent = () => {
    switch (currentView) {
      case AppView.HOME:
        return (
          <>
            <Hero 
              selectedDate={weddingDate}
              onDateChange={setWeddingDate}
              onStart={handleStartPlanning}
            />
            <Problem />
            <Solution />
            <BusinessModel />
            <Sustainability />
            <Team />
            <TargetAudience />
            <CurrentStage />
          </>
        );
      case AppView.AI_ONBOARDING:
        return (
          <AIOnboarding 
            weddingDate={weddingDate}
            onComplete={handleOnboardingComplete}
          />
        );
      case AppView.PACKAGES:
        return preferences ? (
           <PackageSelection 
             preferences={preferences}
             onSelect={handlePackageSelect}
           />
        ) : <Hero selectedDate={weddingDate} onDateChange={setWeddingDate} onStart={handleStartPlanning} />;
      case AppView.VENUES:
        return (
          <VenueList 
            selectedDate={weddingDate}
            userPreferences={preferences}
            onViewDetails={handleViewVenueDetails}
          />
        );
      case AppView.VENUE_DETAILS:
        return selectedVenue ? (
          <VenueDetails 
            venue={selectedVenue} 
            onBook={handleProceedToBook}
            onBack={() => setCurrentView(AppView.VENUES)}
          />
        ) : <VenueList selectedDate={weddingDate} userPreferences={preferences} onViewDetails={handleViewVenueDetails} />;
      case AppView.SERVICES:
        return (
          <div className="flex flex-col">
            <VendorServiceList 
              bookedServiceIds={bookedServiceIds}
              onToggleService={handleToggleService}
            />
            <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-lg p-6 border-t border-gray-200 flex justify-between items-center z-50">
               <div>
                  <p className="text-sm font-bold text-gray-500 uppercase">Total Services</p>
                  <p className="text-xl font-bold text-vivah-burgundy">{bookedServiceIds.length} Selected</p>
               </div>
               <button onClick={handleServicesDone} className="px-8 py-3 bg-vivah-burgundy text-white rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">
                  Proceed to Payment
               </button>
            </div>
          </div>
        );
      case AppView.AUTH:
        return (
          <AuthScreen 
            onSuccess={handleAuthSuccess}
            onCancel={() => setCurrentView(AppView.SERVICES)}
          />
        );
      case AppView.PAYMENT:
        return selectedVenue ? (
          <PaymentScreen 
            venue={selectedVenue}
            preferences={preferences}
            weddingDate={weddingDate}
            onPaymentComplete={handlePaymentSuccess}
            onBack={() => setCurrentView(AppView.SERVICES)}
          />
        ) : null;
      case AppView.BOOKING_SUCCESS:
        return selectedVenue ? (
          <BookingSuccess
            venue={selectedVenue}
            weddingDate={weddingDate}
            guestCount={preferences?.guestCount || 0}
            onGoToDashboard={() => setCurrentView(AppView.DASHBOARD)}
          />
        ) : null;
      case AppView.DASHBOARD:
        return (
          <Dashboard 
            weddingDate={weddingDate}
            guestCount={preferences?.guestCount || 0}
            bookedVenue={selectedVenue}
            bookedServices={bookedServices}
            onRemoveService={(id) => handleToggleService(id)}
            onBrowseMore={() => setCurrentView(AppView.SERVICES)}
            onOpenGuestManager={() => setCurrentView(AppView.GUEST_MANAGER)}
            onOpenMicroServices={() => setCurrentView(AppView.MICRO_SERVICES)}
            onOpenShagunWallet={() => setCurrentView(AppView.SHAGUN_WALLET)}
            onOpenSOS={() => setCurrentView(AppView.SOS_CENTER)}
            onOpenLegal={() => setCurrentView(AppView.LEGAL_AID)}
          />
        );
      case AppView.GUEST_MANAGER:
        return <GuestManager onBack={() => setCurrentView(AppView.DASHBOARD)} />;
      case AppView.MICRO_SERVICES:
        return <MicroServices onBack={() => setCurrentView(AppView.DASHBOARD)} />;
      case AppView.SHAGUN_WALLET:
        return <ShagunWallet onBack={() => setCurrentView(AppView.DASHBOARD)} />;
      case AppView.SOS_CENTER:
        return <CrisisControl onBack={() => setCurrentView(AppView.DASHBOARD)} />;
      case AppView.LEGAL_AID:
        return <LegalAid onBack={() => setCurrentView(AppView.DASHBOARD)} />;
      case AppView.INSPIRATION:
        return <InspirationBoard userPreferences={preferences} />;
      case AppView.ABOUT:
        return <AboutUs />;
      case AppView.CONTACT:
        return <ContactUs />;
      case AppView.VENDOR_PORTAL:
        return (
            <div className="relative">
                <VendorForm />
                <div className="fixed bottom-4 left-4 z-50">
                    <button onClick={() => setCurrentView(AppView.VENDOR_DASHBOARD)} className="px-4 py-2 bg-gray-900 text-white rounded text-xs opacity-50 hover:opacity-100">
                        Demo: View Vendor Analytics
                    </button>
                </div>
            </div>
        );
      case AppView.VENDOR_DASHBOARD:
          return <VendorDashboard />;
      default:
        return (
          <Hero 
            selectedDate={weddingDate}
            onDateChange={setWeddingDate}
            onStart={handleStartPlanning}
          />
        );
    }
  };

  const isFlow = [AppView.VENUES, AppView.SERVICES, AppView.PACKAGES].includes(currentView);

  return (
    <div className="min-h-screen font-sans pb-0 text-gray-800 flex flex-col">
      <Navbar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        hasActivePlan={hasActivePlan}
      />

      <main className="relative z-10 animate-fade-in flex-grow">
        {isFlow && (
          <div className="max-w-[90rem] mx-auto px-6 pt-8">
            <button 
              onClick={() => setCurrentView(AppView.HOME)} 
              className="flex items-center text-vivah-burgundy/50 hover:text-vivah-burgundy transition-colors"
            >
              <ArrowLeft size={16} className="mr-1" /> Start Over
            </button>
          </div>
        )}
        {renderContent()}
      </main>
      
      <Footer onNavigate={setCurrentView} />

      {/* Floating Chat */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isChatOpen ? (
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-black text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-200 group border border-gray-700"
          >
            <MessageCircle size={32} className="group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 bg-vivah-gold text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-black font-bold">AI</span>
          </button>
        ) : (
          <div className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px]">
             <WeddingPlannerAI 
                weddingDate={weddingDate} 
                venueName={selectedVenue?.name || null}
                onClose={() => setIsChatOpen(false)}
             />
          </div>
        )}
      </div>

    </div>
  );
}

export default App;
