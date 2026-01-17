import { Venue, VendorService, WeddingPackage, PackageTier, ShagunTransaction } from '../types';

// Local logo image path
export const LOGO_URL = '/images/vivah-logo.png';

// Helper to check for auspicious dates (Mock logic: Weekends are auspicious)
export const isAuspiciousDate = (date: Date): boolean => {
  const day = date.getDay();
  // Saturday (6) and Sunday (0) are "Muhurat" for this demo
  return day === 0 || day === 6;
};

// Mock booked dates (Random logic)
export const isBookedDate = (date: Date): boolean => {
  // Arbitrarily say the 15th of any month is booked
  return date.getDate() === 15;
};

export const PACKAGES: WeddingPackage[] = [
  {
    tier: PackageTier.SILVER,
    name: 'Essential Elegance',
    description: 'A beautiful, intimate celebration with all the essentials covered.',
    basePrice: 500000,
    includes: ['Standard Venue Choice', 'Buffet Catering', 'Basic Decor', '1 Day Photography'],
    color: '#A0AEC0' // Gray-400
  },
  {
    tier: PackageTier.GOLD,
    name: 'Royal Heritage',
    description: 'Our most popular choice. Grandeur, tradition, and seamless execution.',
    basePrice: 1200000,
    includes: ['Premium Palace/Resort', 'Gourmet Catering', 'Themed Decor', 'Cinematography', 'Bridal Makeup'],
    color: '#C5A059' // Gold
  },
  {
    tier: PackageTier.PLATINUM,
    name: 'Maharaja Opulence',
    description: 'Unlimited luxury. We curate an experience fit for royalty.',
    basePrice: 2500000,
    includes: ['Exclusive Fort Buyout', 'Michelin Star Menu', 'Celebrity Artist', 'Drone Coverage', 'Logistics Team'],
    color: '#E5E7EB' // Slate-200 (Platinum look)
  }
];

export const MOCK_VENUES: Venue[] = [
  {
    id: '1',
    name: 'The Royal Udai Vilas',
    location: 'Udaipur, Rajasthan',
    type: 'Palace',
    capacity: 500,
    pricePerPlate: 4500,
    image: 'https://picsum.photos/id/1040/800/600',
    rating: 4.9,
    available: true,
    description: 'Experience royalty in the heart of the City of Lakes. Perfect for a grand heritage wedding.'
  },
  {
    id: '2',
    name: 'Sunset Beach Resort',
    location: 'Goa',
    type: 'Beachside',
    capacity: 250,
    pricePerPlate: 2800,
    image: 'https://picsum.photos/id/1038/800/600',
    rating: 4.7,
    available: true,
    description: 'Vows by the ocean with a stunning sunset backdrop. Casual luxury at its finest.'
  },
  {
    id: '3',
    name: 'Emerald Green Lawns',
    location: 'New Delhi',
    type: 'Resort',
    capacity: 1200,
    pricePerPlate: 2200,
    image: 'https://picsum.photos/id/124/800/600',
    rating: 4.5,
    available: true,
    isEcoFriendly: true,
    description: 'Sprawling green lawns perfect for a massive Indian reception with elaborate decor.'
  },
  {
    id: '4',
    name: 'Hilltop Fort Heritage',
    location: 'Jaipur, Rajasthan',
    type: 'Palace',
    capacity: 350,
    pricePerPlate: 3800,
    image: 'https://picsum.photos/id/433/800/600',
    rating: 4.8,
    available: false,
    description: 'A historic fort converted into a luxury wedding venue with panoramic city views.'
  },
  {
    id: '5',
    name: 'Kerala Backwaters Retreat',
    location: 'Alleppey, Kerala',
    type: 'Resort',
    capacity: 200,
    pricePerPlate: 1800,
    image: 'https://picsum.photos/id/225/800/600',
    rating: 4.6,
    available: true,
    isEcoFriendly: true,
    description: 'Serene backwaters setting for an intimate and traditional wedding ceremony.'
  }
];

export const MOCK_VENDOR_SERVICES: VendorService[] = [
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
  // New Micro Services
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

export const MOCK_SHAGUN_TRANSACTIONS: ShagunTransaction[] = [
  { id: '1', sender: 'Uncle Sharma', amount: 11000, message: "Blessings for a happy married life! Enjoy the honeymoon.", timestamp: new Date(), avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Uncle' },
  { id: '2', sender: 'Riya & Friends', amount: 5001, message: "Party hard! Can't wait for the reception.", timestamp: new Date(Date.now() - 3600000), avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Riya' },
  { id: '3', sender: 'Grandma', amount: 21000, message: "Lots of love my dear children.", timestamp: new Date(Date.now() - 7200000), avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Grandma' },
];

export const APP_NAME = "Vivah Verse";
export const APP_DESCRIPTION = "Simplifying your journey from 'Yes' to 'I Do'.";

// Local image paths - place your images in /public/images/
export const IMAGES = {
  LOGO: '/images/vivah-logo.png',
  TEAM: {
    KRISH: '/images/team/Krish Pic.jpeg',
    AARAV: '/images/team/aarav.jpg',
    TANISHA: '/images/team/Tanisha Pic.jpg',
    STEPHEN: '/images/team/Stephen Pic.PNG',
    SNEHA: '/images/team/Sneha Pic.jpeg',
    ANAM: '/images/team/Anam Pic.jpg',
  }
};

