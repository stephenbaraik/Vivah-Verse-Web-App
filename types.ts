
export interface Venue {
  id: string;
  name: string;
  location: string;
  type: 'Palace' | 'Resort' | 'Banquet' | 'Beachside';
  capacity: number;
  pricePerPlate: number;
  image: string;
  rating: number;
  available: boolean;
  description: string;
  isVerified?: boolean; 
  isEcoFriendly?: boolean; // New
}

export interface VendorService {
  id: string;
  businessName: string;
  category: 'Decor' | 'Catering' | 'Photography' | 'Makeup' | 'Entertainment' | 'Pundit' | 'Choreography' | 'Styling';
  priceRange: string;
  priceValue: number;
  description: string;
  image: string;
  rating: number;
  isVerified?: boolean;
  isEcoFriendly?: boolean; // New
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  isSystem?: boolean;
}

export interface UserPreferences {
  city: string;
  guestCount: number;
  budget: string;
  vibe: string;
  weddingDate?: string;
}

export enum PackageTier {
  SILVER = 'Silver',
  GOLD = 'Gold',
  PLATINUM = 'Platinum'
}

export interface WeddingPackage {
  tier: PackageTier;
  name: string;
  description: string;
  basePrice: number;
  includes: string[];
  color: string;
}

export interface Guest {
  id: string;
  name: string;
  mobile: string;
  status: 'Invited' | 'Confirmed' | 'Declined' | 'Pending';
  mealPreference: 'Veg' | 'Non-Veg' | 'Jain';
  roomAssigned?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  avatar: string;
}

// Phase 3 Additions
export interface ShagunTransaction {
  id: string;
  sender: string;
  amount: number;
  message: string;
  timestamp: Date;
  avatar?: string;
}

export enum AppView {
  HOME = 'HOME',
  AI_ONBOARDING = 'AI_ONBOARDING',
  PACKAGES = 'PACKAGES',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT',
  VENUES = 'VENUES',
  VENUE_DETAILS = 'VENUE_DETAILS',
  AUTH = 'AUTH',
  PAYMENT = 'PAYMENT',
  SERVICES = 'SERVICES',
  VENDOR_PORTAL = 'VENDOR_PORTAL',
  VENDOR_DASHBOARD = 'VENDOR_DASHBOARD',
  BOOKING_SUCCESS = 'BOOKING_SUCCESS',
  DASHBOARD = 'DASHBOARD',
  INSPIRATION = 'INSPIRATION',
  // New Views
  MICRO_SERVICES = 'MICRO_SERVICES',
  SHAGUN_WALLET = 'SHAGUN_WALLET',
  SOS_CENTER = 'SOS_CENTER',
  LEGAL_AID = 'LEGAL_AID',
  BLOG = 'BLOG',
  BLOG_POST = 'BLOG_POST'
}

export enum DashboardView {
  OVERVIEW = 'OVERVIEW',
  GUESTS = 'GUESTS',
  BUDGET = 'BUDGET',
  CHECKLIST = 'CHECKLIST'
}