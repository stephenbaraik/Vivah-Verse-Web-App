import React, { useState } from 'react';
import { LOGO_URL, APP_NAME } from '../constants';
import { AppView } from '../types';
import { Menu, X, LayoutDashboard, Sparkles, LogIn, LogOut } from 'lucide-react';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  hasActivePlan: boolean;
  isAuthenticated: boolean;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, hasActivePlan, isAuthenticated, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [clickedItem, setClickedItem] = useState<AppView | null>(null);

  const navItems = [
    { label: 'Home', view: AppView.HOME },
    { label: 'Vision Board', view: AppView.INSPIRATION },
    { label: 'About', view: AppView.ABOUT },
    { label: 'Contact', view: AppView.CONTACT },
    { label: 'Vendors', view: AppView.VENDOR_PORTAL },
    { label: 'Blog', view: AppView.BLOG },
  ];

  const handleNav = (view: AppView) => {
    setClickedItem(view);
    onNavigate(view);
    setIsMobileMenuOpen(false);
    setTimeout(() => setClickedItem(null), 300); // Reset after animation
  };

  const handleLogoutClick = () => {
    setIsMobileMenuOpen(false);
    onLogout();
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-28">
          
          <div 
            className="flex items-center gap-4 cursor-pointer group" 
            onClick={() => handleNav(AppView.HOME)}
          >
            <div className={`w-14 h-14 relative opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 ${clickedItem === AppView.HOME ? 'pop-nav-item' : ''}`}>
                 <img src={LOGO_URL} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-3xl font-medium tracking-tight text-vivah-burgundy">
              {APP_NAME}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <button 
                key={item.label}
                onClick={() => handleNav(item.view)}
                className={`relative text-base font-medium tracking-wide transition-all duration-300 flex items-center gap-2 group ${
                  currentView === item.view ? 'text-vivah-rose' : 'text-vivah-burgundy/60 hover:text-vivah-burgundy'
                } ${clickedItem === item.view ? 'pop-nav-item' : ''}`}
              >
                {item.label === 'Vision Board' && <Sparkles size={18} className="opacity-70 group-hover:text-vivah-rose group-hover:animate-spin" />}
                {item.label}
                <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-vivah-rose transform origin-left transition-transform duration-300 ${currentView === item.view ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </button>
            ))}

            <div className="w-px h-6 bg-vivah-burgundy/10 mx-4"></div>
            
            {isAuthenticated ? (
                <>
                    <button 
                        onClick={() => handleNav(AppView.DASHBOARD)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider bg-vivah-burgundy text-white hover:bg-vivah-rose transition-all shadow-lg shadow-vivah-burgundy/10 hover:-translate-y-0.5 ${clickedItem === AppView.DASHBOARD ? 'pop-nav-item' : ''}`}
                    >
                        <LayoutDashboard size={16} /> Dashboard
                    </button>
                    <button 
                        onClick={onLogout}
                        className="text-vivah-burgundy/60 hover:text-vivah-burgundy transition-colors"
                        title="Logout"
                    >
                        <LogOut size={20} />
                    </button>
                </>
            ) : (
                <button 
                    onClick={() => handleNav(AppView.AUTH)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider bg-vivah-rose text-white hover:bg-vivah-burgundy transition-all shadow-lg shadow-vivah-rose/20 hover:-translate-y-0.5 ${clickedItem === AppView.AUTH ? 'pop-nav-item' : ''}`}
                >
                    <LogIn size={16} /> Login
                </button>
            )}
          </div>

          <button 
            className="md:hidden p-2 text-vivah-burgundy/80"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={32} strokeWidth={1.5} /> : <Menu size={32} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 absolute w-full animate-fade-in h-screen z-50">
          <div className="px-8 pt-12 pb-6 flex flex-col h-full">
            <div className="space-y-8">
              {navItems.map((item, idx) => (
                <button 
                  key={item.label}
                  onClick={() => handleNav(item.view)}
                  className={`block w-full text-left text-4xl font-light animate-slide-up ${
                    currentView === item.view ? 'text-vivah-rose' : 'text-vivah-burgundy'
                  }`}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="mt-auto pt-8 border-t border-gray-100 space-y-6">
                {isAuthenticated ? (
                  <>
                    <button 
                      onClick={() => handleNav(AppView.DASHBOARD)}
                      className="block w-full text-left text-3xl font-light text-vivah-burgundy animate-slide-up"
                      style={{ animationDelay: '500ms' }}
                    >
                      My Dashboard
                    </button>
                     <button 
                      onClick={handleLogoutClick}
                      className="block w-full text-left text-3xl font-light text-vivah-burgundy/60 animate-slide-up"
                       style={{ animationDelay: '600ms' }}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => handleNav(AppView.AUTH)}
                    className="block w-full text-left text-3xl font-light text-vivah-burgundy animate-slide-up"
                    style={{ animationDelay: '500ms' }}
                  >
                    Login / Sign Up
                  </button>
                )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
