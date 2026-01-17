import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/landing/Hero';
import { AboutUs } from './components/landing/AboutUs';
import { ContactUs } from './components/landing/ContactUs';
import { VenueList } from './components/booking/VenueList';
import { VenueDetails } from './components/booking/VenueDetails';
import { AuthScreen } from './components/auth/AuthScreen';
import PaymentScreen from './components/booking/PaymentScreen';
import BookingSuccess from './components/booking/BookingSuccess';
import { Dashboard } from './components/dashboard/Dashboard';
import { GuestManager } from './components/dashboard/GuestManager';
import { BudgetTracker } from './components/dashboard/BudgetTracker';
import { WeddingChecklist } from './components/dashboard/WeddingChecklist';
import { MicroServices } from './components/tools/MicroServices';
import { ShagunWallet } from './components/tools/ShagunWallet';
import { CrisisControl } from './components/tools/CrisisControl';
import { LegalAid } from './components/tools/LegalAid';
import { WeddingPlannerAI } from './components/planning/WeddingPlannerAI';
import { InspirationBoard } from './components/tools/InspirationBoard';
import { AIOnboarding } from './components/planning/AIOnboarding';
import { PackageSelection } from './components/planning/PackageSelection';
import { Problem } from './components/landing/Problem';
import { Solution } from './components/landing/Solution';
import { BusinessModel } from './components/landing/BusinessModel';
import { Sustainability } from './components/landing/Sustainability';
import { TargetAudience } from './components/landing/TargetAudience';
import { CurrentStage } from './components/landing/CurrentStage';
import { Blog } from './components/blog/Blog';
import { BlogPost } from './components/blog/BlogPost';
import { PACKAGES } from './constants';
import { AppView, Venue, UserPreferences, PackageTier, DashboardView, VendorService } from './types';
import { authService } from './services/authService';
import { MessageCircle, ArrowLeft } from 'lucide-react';

const PROTECTED_VIEWS = [
  AppView.DASHBOARD,
  AppView.PAYMENT,
  AppView.MICRO_SERVICES,
  AppView.SHAGUN_WALLET,
  AppView.SOS_CENTER,
  AppView.LEGAL_AID,
  AppView.BOOKING_SUCCESS
];

// Mock vendor services (moved from constants for inline use)
const MOCK_VENDOR_SERVICES: VendorService[] = [
  {
    id: '1',
    businessName: 'Blossom & Bloom',
    category: 'Decor',
    priceRange: '₹1,00,000 - ₹5,00,000',
    priceValue: 300000,
    description: 'Specializing in pastel floral arrangements and elegant mandap designs.',
    image: 'https://picsum.photos/id/106/800/600',
    rating: 4.8,
    isEcoFriendly: true
  },
  {
    id: '2',
    businessName: 'Spice Symphony Catering',
    category: 'Catering',
    priceRange: '₹1,500 - ₹3,000 per plate',
    priceValue: 2000,
    description: 'Authentic Indian flavors mixed with global cuisines for a delightful feast.',
    image: 'https://picsum.photos/id/292/800/600',
    rating: 4.7
  },
  {
    id: '3',
    businessName: 'Candid Moments Studio',
    category: 'Photography',
    priceRange: '₹80,000 - ₹2,00,000',
    priceValue: 150000,
    description: 'Capturing the unscripted moments of joy and love on your big day.',
    image: 'https://picsum.photos/id/338/800/600',
    rating: 4.9
  },
  {
    id: '4',
    businessName: 'Glow by Priya',
    category: 'Makeup',
    priceRange: '₹25,000 - ₹50,000',
    priceValue: 35000,
    description: 'Expert bridal makeup artist focusing on natural and radiant looks.',
    image: 'https://picsum.photos/id/64/800/600',
    rating: 4.6
  },
  {
    id: '5',
    businessName: 'Beats & Bass DJs',
    category: 'Entertainment',
    priceRange: '₹40,000 - ₹1,00,000',
    priceValue: 50000,
    description: 'High-energy DJ services to keep the dance floor packed all night.',
    image: 'https://picsum.photos/id/158/800/600',
    rating: 4.5
  },
  {
    id: '6',
    businessName: 'Vintage Vibe Decor',
    category: 'Decor',
    priceRange: '₹2,00,000 - ₹8,00,000',
    priceValue: 500000,
    description: 'Rustic and vintage themes with extensive lighting setups.',
    image: 'https://picsum.photos/id/364/800/600',
    rating: 4.7,
    isEcoFriendly: true
  },
  {
    id: '7',
    businessName: 'Acharya Shukla',
    category: 'Pundit',
    priceRange: '₹21,000 - ₹51,000',
    priceValue: 21000,
    description: 'Vedic rituals expert. Specializes in North Indian and Arya Samaj weddings.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pundit',
    rating: 5.0
  },
  {
    id: '10',
    businessName: 'Pandit Iyer',
    category: 'Pundit',
    priceRange: '₹25,000 - ₹60,000',
    priceValue: 25000,
    description: 'Authentic Tamil Brahmin rituals. Expert in South Indian wedding ceremonies.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Iyer',
    rating: 4.9
  },
  {
    id: '11',
    businessName: 'Mukherjee Moshai',
    category: 'Pundit',
    priceRange: '₹15,000 - ₹40,000',
    priceValue: 15000,
    description: 'Traditional Bengali Purohit for Biye. Knowledgeable in all Bengali rituals.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mukherjee',
    rating: 4.8
  },
  {
    id: '8',
    businessName: 'Dance with Divya',
    category: 'Choreography',
    priceRange: '₹50,000 - ₹1,00,000',
    priceValue: 50000,
    description: 'Sangeet choreography with remote video tutorials and on-site rehearsals.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Divya',
    rating: 4.8
  },
  {
    id: '9',
    businessName: 'Royal Safa & Draping',
    category: 'Styling',
    priceRange: '₹15,000 - ₹30,000',
    priceValue: 15000,
    description: 'Professional saree draping and turban tying services on venue.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Safa',
    rating: 4.9
  }
];

// Vendor Service List Component (inline to avoid missing file)
const VendorServiceList: React.FC<{ bookedServiceIds: string[]; onToggleService: (id: string) => void }> = ({ bookedServiceIds, onToggleService }) => {
  const categories = ['All', 'Decor', 'Catering', 'Photography', 'Makeup', 'Entertainment', 'Pundit', 'Choreography', 'Styling'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredServices = selectedCategory === 'All' 
    ? MOCK_VENDOR_SERVICES 
    : MOCK_VENDOR_SERVICES.filter(s => s.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-wrap gap-4 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category 
                ? 'bg-vivah-burgundy text-white shadow-lg' 
                : 'bg-white/60 text-vivah-burgundy hover:bg-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map(service => (
          <div 
            key={service.id}
            className={`bg-white rounded-2xl overflow-hidden shadow-lg transition-all hover:shadow-xl ${
              bookedServiceIds.includes(service.id) ? 'ring-2 ring-vivah-gold' : ''
            }`}
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={service.image} 
                alt={service.businessName}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-vivah-burgundy">
                {service.category}
              </div>
              {service.isEcoFriendly && (
                <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                  <span>🌿</span> Eco
                </div>
              )}
            </div>
            
            <div className="p-5">
              <h3 className="text-lg font-bold text-vivah-burgundy mb-1">{service.businessName}</h3>
              <div className="flex items-center gap-1 mb-2">
                <span className="text-sm text-gray-500">{service.rating} ★</span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{service.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="font-bold text-vivah-rose">{service.priceRange}</span>
                <button
                  onClick={() => onToggleService(service.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    bookedServiceIds.includes(service.id)
                      ? 'bg-vivah-gold text-white'
                      : 'bg-vivah-petal text-vivah-burgundy hover:bg-vivah-rose hover:text-white'
                  }`}
                >
                  {bookedServiceIds.includes(service.id) ? 'Selected' : 'Add Service'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [dashboardView, setDashboardView] = useState<DashboardView>(DashboardView.OVERVIEW);
  const [weddingDate, setWeddingDate] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<PackageTier | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [bookedServiceIds, setBookedServiceIds] = useState<string[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedBlogPost, setSelectedBlogPost] = useState<string | null>(null);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const packagePrice = selectedPackage ? PACKAGES.find(p => p.tier === selectedPackage)?.basePrice || 0 : 0;
    const servicesPrice = bookedServiceIds.reduce((acc, id) => {
      const service = MOCK_VENDOR_SERVICES.find(s => s.id === id);
      return acc + (service?.priceValue || 0);
    }, 0);
    setTotalAmount(packagePrice + servicesPrice);
  }, [selectedPackage, bookedServiceIds]);

  const handleNavigateToPost = (slug: string) => {
    setSelectedBlogPost(slug);
    setCurrentView(AppView.BLOG_POST);
  };

  const handleBackToBlog = () => {
    setSelectedBlogPost(null);
    setCurrentView(AppView.BLOG);
  };

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
    setCurrentView(AppView.VENUES);
  };

  const handleViewVenueDetails = (venue: Venue) => {
    setSelectedVenue(venue);
    setCurrentView(AppView.VENUE_DETAILS);
  };

  const handleProceedToBook = () => {
    setCurrentView(AppView.SERVICES);
  };

  const handleServicesDone = () => {
    if (isAuthenticated) {
      setCurrentView(AppView.PAYMENT);
    } else {
      setCurrentView(AppView.AUTH);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setCurrentView(AppView.PAYMENT);
  };
  
  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setCurrentView(AppView.HOME);
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

  const handleNavigateToDashboard = () => {
    setCurrentView(AppView.DASHBOARD);
    setDashboardView(DashboardView.OVERVIEW);
  };

  const renderContent = () => {
    if (PROTECTED_VIEWS.includes(currentView) && !isAuthenticated) {
      return <AuthScreen 
        onSuccess={handleAuthSuccess}
        onCancel={() => setCurrentView(AppView.HOME)} 
      />;
    }

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
        ) : (
          <Hero 
            selectedDate={weddingDate} 
            onDateChange={setWeddingDate} 
            onStart={handleStartPlanning} 
          />
        );
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
        ) : (
          <VenueList 
            selectedDate={weddingDate} 
            userPreferences={preferences} 
            onViewDetails={handleViewVenueDetails} 
          />
        );
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
              <button 
                onClick={handleServicesDone} 
                className="px-8 py-3 bg-vivah-burgundy text-white rounded-xl font-bold shadow-lg hover:scale-105 transition-transform"
              >
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
            totalAmount={totalAmount}
            onPaymentComplete={handlePaymentSuccess}
            onBack={() => setCurrentView(AppView.SERVICES)}
          />
        ) : (
          <div className="text-center p-12">
            <h2 className="text-2xl font-bold mb-4">No Venue Selected</h2>
            <p className="mb-6">Please select a venue before proceeding to payment.</p>
            <button 
              onClick={() => setCurrentView(AppView.VENUES)} 
              className="bg-vivah-burgundy text-white font-bold py-2 px-6 rounded-lg hover:bg-vivah-burgundy/90"
            >
              Select a Venue
            </button>
          </div>
        );
      case AppView.BOOKING_SUCCESS:
        return selectedVenue ? (
          <BookingSuccess
            venue={selectedVenue}
            weddingDate={weddingDate}
            guestCount={preferences?.guestCount || 0}
            onGoToDashboard={handleNavigateToDashboard}
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
            dashboardView={dashboardView}
            setDashboardView={setDashboardView}
            onOpenMicroServices={() => setCurrentView(AppView.MICRO_SERVICES)}
            onOpenShagunWallet={() => setCurrentView(AppView.SHAGUN_WALLET)}
            onOpenSOS={() => setCurrentView(AppView.SOS_CENTER)}
            onOpenLegal={() => setCurrentView(AppView.LEGAL_AID)}
          />
        );
      case AppView.MICRO_SERVICES:
        return <MicroServices onBack={handleNavigateToDashboard} />;
      case AppView.SHAGUN_WALLET:
        return <ShagunWallet onBack={handleNavigateToDashboard} />;
      case AppView.SOS_CENTER:
        return <CrisisControl onBack={handleNavigateToDashboard} />;
      case AppView.LEGAL_AID:
        return <LegalAid onBack={handleNavigateToDashboard} />;
      case AppView.INSPIRATION:
        return <InspirationBoard userPreferences={preferences} />;
      case AppView.ABOUT:
        return (
          <AboutUs />
        );
      case AppView.CONTACT:
        return <ContactUs />;
      case AppView.BLOG:
        return <Blog onNavigate={handleNavigateToPost} />;
      case AppView.BLOG_POST:
        return <BlogPost slug={selectedBlogPost!} onBack={handleBackToBlog} />;
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
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />

      <main className="relative z-10 animate-fade-in flex-grow">
        {isFlow && (
          <div className="max-w-[90rem] mx-auto px-6 pt-8">
            <button 
              onClick={handleNavigateToDashboard}
              className="flex items-center text-vivah-burgundy/50 hover:text-vivah-burgundy transition-colors"
            >
              <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
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
