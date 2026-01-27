import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, MapPin, Star, Heart, Zap, Music, ShoppingBag, Mail, Phone, ChevronRight, Sparkles, User, LogIn, Crown, Camera, Mic, Gift, ArrowUpRight, Check, X, ChevronLeft, ChevronDown, Headphones, MessageCircle, ExternalLink, Settings, Award, History, Image, Plus, Edit, Trash2, Save, FolderOpen, Link } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

const TayKayWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [authData, setAuthData] = useState({ name: '', email: '', phone: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredNav, setHoveredNav] = useState(null);
  const [showBookingAuthPrompt, setShowBookingAuthPrompt] = useState(false);
  const [signupMethod, setSignupMethod] = useState('email');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // Newsletter & Coming Soon states
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  
  // User Profile & Loyalty states
  const [userPoints, setUserPoints] = useState(0);
  const [userBookingHistory, setUserBookingHistory] = useState([
    { id: 'TK001', date: '2026-01-15', time: '3:00 PM', duration: '1 Hour', status: 'completed', points: 80 },
    { id: 'TK002', date: '2026-01-10', time: '7:00 PM', duration: '2 Hours', status: 'completed', points: 120 },
  ]);
  const [userWishlistGifts, setUserWishlistGifts] = useState([]);
  
  // Portfolio Albums state
  const [selectedAlbum, setSelectedAlbum] = useState('all');
  const [portfolioView, setPortfolioView] = useState('photos'); // photos, videos, live, collection
  const [portfolioAlbums, setPortfolioAlbums] = useState([
    { id: 'all', name: 'All Photos', count: 12 },
    { id: 'boudoir', name: 'Boudoir', count: 4 },
    { id: 'glamour', name: 'Glamour', count: 3 },
    { id: 'editorial', name: 'Editorial', count: 3 },
    { id: 'playful', name: 'Playful', count: 2 },
  ]);
  
  // Video Albums
  const [videoAlbums, setVideoAlbums] = useState([
    { id: 'all', name: 'All Videos', count: 8 },
    { id: 'behind-scenes', name: 'Behind The Scenes', count: 3 },
    { id: 'exclusive', name: 'Exclusive Content', count: 2 },
    { id: 'teasers', name: 'Teasers', count: 3 },
  ]);
  const [selectedVideoAlbum, setSelectedVideoAlbum] = useState('all');
  
  // Portfolio Videos
  const [portfolioVideos, setPortfolioVideos] = useState([
    { id: 'v1', title: 'Morning Routine', duration: '3:24', thumbnail: '🌅', album: 'behind-scenes', price: 15, preview: true, description: 'Start the day with me' },
    { id: 'v2', title: 'Photoshoot BTS', duration: '5:12', thumbnail: '📸', album: 'behind-scenes', price: 20, preview: true, description: 'Behind the camera' },
    { id: 'v3', title: 'Getting Ready GRWM', duration: '4:45', thumbnail: '💄', album: 'behind-scenes', price: 15, preview: true, description: 'Full glam transformation' },
    { id: 'v4', title: 'Exclusive Dance', duration: '2:30', thumbnail: '💃', album: 'exclusive', price: 35, preview: false, description: 'Private performance' },
    { id: 'v5', title: 'Private Session', duration: '6:18', thumbnail: '🔥', album: 'exclusive', price: 50, preview: false, description: 'Intimate exclusive content' },
    { id: 'v6', title: 'New Content Teaser', duration: '0:45', thumbnail: '✨', album: 'teasers', price: 0, preview: true, description: 'Sneak peek' },
    { id: 'v7', title: 'Coming Soon Preview', duration: '1:02', thumbnail: '👀', album: 'teasers', price: 0, preview: true, description: 'What\'s next' },
    { id: 'v8', title: 'Special Announcement', duration: '0:38', thumbnail: '📢', album: 'teasers', price: 0, preview: true, description: 'Big news!' },
    { id: 'v9', title: 'Lingerie Try-On', duration: '8:45', thumbnail: '👙', album: 'exclusive', price: 45, preview: false, description: 'New lingerie haul' },
    { id: 'v10', title: 'Day in My Life', duration: '12:30', thumbnail: '🎥', album: 'behind-scenes', price: 25, preview: true, description: '24 hours with me' },
    { id: 'v11', title: 'Workout Routine', duration: '15:00', thumbnail: '💪', album: 'behind-scenes', price: 20, preview: true, description: 'Stay fit with the Diva' },
    { id: 'v12', title: 'Bedroom Vibes', duration: '4:20', thumbnail: '🛏️', album: 'exclusive', price: 40, preview: false, description: 'Late night content' },
    { id: 'v13', title: 'Tour Vlog Ep.1', duration: '10:15', thumbnail: '✈️', album: 'behind-scenes', price: 15, preview: true, description: 'On the road' },
    { id: 'v14', title: 'Fan Requests Special', duration: '7:30', thumbnail: '💝', album: 'exclusive', price: 55, preview: false, description: 'What you asked for' },
  ]);
  
  // Live Videos (Past streams & upcoming)
  const [liveVideos, setLiveVideos] = useState([
    { id: 'live1', title: 'Q&A with the Diva', date: '2026-01-20', time: '8:00 PM', status: 'recorded', duration: '45:00', viewers: 234 },
    { id: 'live2', title: 'Get Ready With Me', date: '2026-01-18', time: '7:00 PM', status: 'recorded', duration: '32:15', viewers: 189 },
    { id: 'live3', title: 'Late Night Chat', date: '2026-01-15', time: '10:00 PM', status: 'recorded', duration: '58:22', viewers: 312 },
    { id: 'live4', title: 'Unboxing Gifts', date: '2026-01-12', time: '6:00 PM', status: 'recorded', duration: '28:45', viewers: 156 },
    { id: 'live5', title: 'Cooking with Diva', date: '2026-01-08', time: '5:00 PM', status: 'recorded', duration: '42:10', viewers: 203 },
    { id: 'live6', title: 'Tour Kickoff Party', date: '2026-01-27', time: '9:00 PM', status: 'upcoming', duration: null, viewers: null },
    { id: 'live7', title: 'Subscriber Special', date: '2026-02-01', time: '8:00 PM', status: 'upcoming', duration: null, viewers: null },
    { id: 'live8', title: 'Valentine\'s Day Stream', date: '2026-02-14', time: '9:00 PM', status: 'upcoming', duration: null, viewers: null },
  ]);
  
  // User Subscription
  const [userSubscription, setUserSubscription] = useState(null); // null, 'monthly', 'vip'
  const [subscriptionExpiry, setSubscriptionExpiry] = useState(null);
  
  // User Collection (purchased content)
  const [userCollection, setUserCollection] = useState({
    photos: [
      { id: 'p1', src: '/images/IMG_0773.jpeg', purchaseDate: '2026-01-10', category: 'Boudoir' },
      { id: 'p2', src: '/images/IMG_0776.jpeg', purchaseDate: '2026-01-12', category: 'Glamour' },
    ],
    videos: [
      { id: 'v1', title: 'Morning Routine', purchaseDate: '2026-01-08', duration: '3:24' },
    ],
    photoSets: [
      { id: 'set1', name: 'January Exclusive Set', count: 15, purchaseDate: '2026-01-05' },
    ]
  });
  
  // Client Database (Admin view)
  const [clientDatabase, setClientDatabase] = useState([
    { id: 'c1', name: 'John Smith', email: 'john@example.com', phone: '(555) 123-4567', joinDate: '2025-12-01', visits: 5, totalSpent: 850, subscription: 'monthly', points: 340 },
    { id: 'c2', name: 'Mike Johnson', email: 'mike@example.com', phone: '(555) 234-5678', joinDate: '2025-11-15', visits: 8, totalSpent: 1200, subscription: 'vip', points: 520 },
    { id: 'c3', name: 'David Williams', email: 'david@example.com', phone: '(555) 345-6789', joinDate: '2026-01-10', visits: 2, totalSpent: 300, subscription: null, points: 75 },
    { id: 'c4', name: 'Chris Brown', email: 'chris@example.com', phone: '(555) 456-7890', joinDate: '2025-10-20', visits: 12, totalSpent: 2100, subscription: 'vip', points: 890 },
  ]);
  
  // Suggestions System
  const [suggestions, setSuggestions] = useState([
    { id: 's1', user: 'Anonymous', type: 'public', content: 'Would love to see more behind-the-scenes content!', date: '2026-01-18', likes: 12, screenshot: null },
    { id: 's2', user: 'Mike J.', type: 'public', content: 'A cooking or baking video would be amazing!', date: '2026-01-17', likes: 8, screenshot: null },
    { id: 's3', user: 'John S.', type: 'public', content: 'More Q&A live streams please!', date: '2026-01-15', likes: 15, screenshot: null },
  ]);
  const [newSuggestion, setNewSuggestion] = useState('');
  const [suggestionType, setSuggestionType] = useState('public');
  const [suggestionScreenshot, setSuggestionScreenshot] = useState(null);
  
  // User Account Settings
  const [userSettings, setUserSettings] = useState({
    notifications: { email: true, sms: false, promotions: true },
    privacy: { showProfile: true, showActivity: false, allowMessages: true },
    preferences: { theme: 'light', language: 'English' }
  });
  
  // Portfolio photos with album assignments and prices
  const [portfolioPhotos, setPortfolioPhotos] = useState([
    { src: '/images/IMG_0773.jpeg', category: 'BOUDOIR', album: 'boudoir', price: 5 },
    { src: '/images/IMG_0774.jpeg', category: 'INTIMATE', album: 'boudoir', price: 8 },
    { src: '/images/IMG_0775.jpeg', category: 'PLAYFUL', album: 'playful', price: 5 },
    { src: '/images/IMG_0776.jpeg', category: 'GLAMOUR', album: 'glamour', price: 5 },
    { src: '/images/IMG_0777.jpeg', category: 'ALLURE', album: 'boudoir', price: 8 },
    { src: '/images/IMG_0778.jpeg', category: 'BOLD', album: 'editorial', price: 10 },
    { src: '/images/IMG_0779.jpeg', category: 'FIERCE', album: 'editorial', price: 10 },
    { src: '/images/IMG_0780.jpeg', category: 'SULTRY', album: 'glamour', price: 8 },
    { src: '/images/IMG_0781.jpeg', category: 'ICONIC', album: 'boudoir', price: 12 },
    { src: '/images/IMG_0782.jpeg', category: 'SIGNATURE', album: 'editorial', price: 15 },
    { src: '/images/IMG_0783.jpeg', category: 'EDITORIAL', album: 'glamour', price: 10 },
    { src: '/images/Facetune_01-01-2026-05-14-26.jpeg', category: 'BEAUTY', album: 'playful', price: 5 },
    { src: '/images/IMG_0969.jpeg', category: 'EXCLUSIVE', album: 'boudoir', price: 20 },
    { src: '/images/Facetune_01-01-2026-05-14-35.jpeg', category: 'STUNNING', album: 'glamour', price: 8 },
  ]);
  
  // Photo Sets for purchase
  const [photoSets, setPhotoSets] = useState([
    { id: 'set1', name: 'January Exclusive Collection', count: 25, price: 45, thumbnail: '📸', description: 'Brand new exclusive photos from January shoots' },
    { id: 'set2', name: 'Boudoir Dreams', count: 20, price: 35, thumbnail: '💋', description: 'Intimate and sensual boudoir collection' },
    { id: 'set3', name: 'Glamour Queen', count: 30, price: 50, thumbnail: '👑', description: 'High fashion glamour shots' },
    { id: 'set4', name: 'Behind The Scenes', count: 15, price: 25, thumbnail: '🎬', description: 'Candid moments from photoshoots' },
    { id: 'set5', name: 'Playful Vibes', count: 18, price: 30, thumbnail: '🎀', description: 'Fun and flirty photo collection' },
  ]);
  
  // Admin states
  const [adminTab, setAdminTab] = useState('portfolio');
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [newAlbumName, setNewAlbumName] = useState('');

  const handleNewsletterSignup = (feature) => {
    if (newsletterEmail && newsletterEmail.includes('@')) {
      console.log(`Newsletter signup for ${feature}: ${newsletterEmail}`);
      setNewsletterSuccess(true);
      setTimeout(() => {
        setNewsletterSuccess(false);
        setShowComingSoon(false);
        setNewsletterEmail('');
      }, 2000);
    }
  };

  const openComingSoon = (feature) => {
    setComingSoonFeature(feature);
    setShowComingSoon(true);
    setNewsletterSuccess(false);
  };
  
  // Points system - earn points for bookings and gifts
  const addPoints = (amount, reason) => {
    setUserPoints(prev => prev + amount);
    console.log(`Added ${amount} points for: ${reason}`);
  };

  // Generate available dates (including today + next 14 days)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    // Include today
    dates.push(new Date(today));
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const availableDates = generateAvailableDates();

  // Available time slots
  const timeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM',
    '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
  ];

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const formatFullDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const calculateTotal = () => {
    let total = 0;
    if (selectedDuration) total += selectedDuration.price;
    if (selectedLocation === 'outcall') total += 100;
    return total;
  };

  const handleAuth = () => {
    // Validate required fields
    if (authMode === 'signup') {
      if (!authData.name || !authData.password) {
        setAuthError('Please fill in name and password');
        return;
      }
      // Require either email OR phone
      if (!authData.email && !authData.phone) {
        setAuthError('Please provide email or phone number');
        return;
      }
    } else {
      // Login - require email or phone + password
      if ((!authData.email && !authData.phone) || !authData.password) {
        setAuthError('Please enter email/phone and password');
        return;
      }
    }
    
    // Check for admin login (you can change these credentials)
    const isAdminLogin = (authData.email === 'admin@taykay.xxx' || authData.email === 'taykay@admin.com') && authData.password === 'DivaAdmin2026';
    
    // Store user data
    const name = authData.name || authData.email?.split('@')[0] || authData.phone;
    setUserName(isAdminLogin ? 'Tay Kay (Admin)' : name);
    setUserEmail(authData.email || '');
    setUserPhone(authData.phone || '');
    setIsAdmin(isAdminLogin);
    
    // Give new users starter points
    if (authMode === 'signup') {
      setUserPoints(50); // Welcome bonus!
    } else {
      setUserPoints(userPoints || 100); // Existing user points
    }
    setIsLoggedIn(true);
    setShowAuthModal(false);
    setShowBookingAuthPrompt(false);
    setAuthError('');
    setAuthData({ name: '', email: '', phone: '', password: '' });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setUserEmail('');
    setUserPhone('');
  };

  const generateBookingReference = () => {
    return 'TK' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();
  };

  const handleBookingSubmit = async () => {
    if (!isLoggedIn) {
      setShowBookingAuthPrompt(true);
      return;
    }

    // Generate booking reference
    const reference = generateBookingReference();
    setBookingReference(reference);

    // Prepare booking details
    const bookingDetails = {
      reference,
      client: {
        name: userName,
        email: userEmail,
        phone: userPhone
      },
      location: selectedLocation,
      duration: selectedDuration?.name,
      services: selectedServices.map(s => s.name),
      date: selectedDate ? formatFullDate(selectedDate) : 'Not selected',
      time: selectedTime,
      total: calculateTotal()
    };

    // ====== NOTIFICATION SYSTEM ======
    
    // 1. Send SMS to Tay Kay (218-355-0792)
    const smsMessage = 
      `🔔 NEW BOOKING!\n` +
      `Ref: ${reference}\n` +
      `Client: ${userName}\n` +
      `Phone: ${userPhone}\n` +
      `Email: ${userEmail}\n` +
      `Date: ${bookingDetails.date}\n` +
      `Time: ${selectedTime}\n` +
      `Duration: ${selectedDuration?.name}\n` +
      `Location: ${selectedLocation}\n` +
      `Total: $${calculateTotal().toLocaleString()}`;
    
    console.log('📱 SMS Notification to (218) 355-0792:', smsMessage);
    
    // In production: Use Twilio API
    // await fetch('/api/send-sms', { method: 'POST', body: JSON.stringify({ to: '+12183550792', message: smsMessage }) });

    // 2. Send Email to tmkehtel@gmail.com
    const emailSubject = `New Booking Request - ${reference} - ${userName}`;
    const emailBody = 
      `New Booking Request\n\n` +
      `Reference: ${reference}\n` +
      `Client: ${userName}\n` +
      `Phone: ${userPhone}\n` +
      `Email: ${userEmail}\n\n` +
      `Booking Details:\n` +
      `- Date: ${bookingDetails.date}\n` +
      `- Time: ${selectedTime}\n` +
      `- Duration: ${selectedDuration?.name}\n` +
      `- Location: ${selectedLocation}\n` +
      `- Total: $${calculateTotal().toLocaleString()}\n\n` +
      `Please confirm this booking with the client.`;
    
    console.log('📧 Email Notification to tmkehtel@gmail.com:', { subject: emailSubject, body: emailBody });
    
    // Open email client as backup (this actually works!)
    const mailtoLink = `mailto:tmkehtel@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // 3. Create Google Calendar Event
    const eventStart = selectedDate ? new Date(selectedDate) : new Date();
    const [hours, minutes] = selectedTime ? selectedTime.match(/(\d+):(\d+)/)?.slice(1) || ['12', '00'] : ['12', '00'];
    const isPM = selectedTime?.includes('PM') && hours !== '12';
    const isAM = selectedTime?.includes('AM') && hours === '12';
    eventStart.setHours(isPM ? parseInt(hours) + 12 : (isAM ? 0 : parseInt(hours)), parseInt(minutes || '00'));
    
    const eventEnd = new Date(eventStart);
    const durationHours = selectedDuration?.name.includes('30 Minutes') ? 0.5 :
                          selectedDuration?.name.includes('90 Minutes') ? 1.5 :
                          selectedDuration?.name.includes('Half Day') ? 4 :
                          selectedDuration?.name.includes('Overnight') ? 12 :
                          selectedDuration?.name.includes('Weekend') ? 48 :
                          parseInt(selectedDuration?.name) || 1;
    eventEnd.setHours(eventEnd.getHours() + durationHours);

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Booking: ${userName} - ${selectedDuration?.name}`)}&dates=${eventStart.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${eventEnd.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(`Client: ${userName}\nPhone: ${userPhone}\nEmail: ${userEmail}\nLocation: ${selectedLocation}\nTotal: $${calculateTotal()}\nRef: ${reference}`)}&location=${encodeURIComponent(selectedLocation === 'incall' ? 'My Location' : 'Client Location')}`;
    
    console.log('📅 Google Calendar Link:', googleCalendarUrl);

    // 4. Create Apple Calendar Download (.ics file)
    const icsContent = 
      `BEGIN:VCALENDAR\n` +
      `VERSION:2.0\n` +
      `PRODID:-//TayKay//Booking//EN\n` +
      `BEGIN:VEVENT\n` +
      `UID:${reference}@taykay.xxx\n` +
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z\n` +
      `DTSTART:${eventStart.toISOString().replace(/[-:]/g, '').split('.')[0]}Z\n` +
      `DTEND:${eventEnd.toISOString().replace(/[-:]/g, '').split('.')[0]}Z\n` +
      `SUMMARY:Booking: ${userName} - ${selectedDuration?.name}\n` +
      `DESCRIPTION:Client: ${userName}\\nPhone: ${userPhone}\\nEmail: ${userEmail}\\nLocation: ${selectedLocation}\\nTotal: $${calculateTotal()}\\nRef: ${reference}\n` +
      `LOCATION:${selectedLocation === 'incall' ? 'My Location' : 'Client Location'}\n` +
      `END:VEVENT\n` +
      `END:VCALENDAR`;
    
    // Create downloadable .ics file
    const icsBlob = new Blob([icsContent], { type: 'text/calendar' });
    const icsUrl = URL.createObjectURL(icsBlob);
    
    // Store for download button in confirmation
    window.bookingCalendarData = {
      googleCalendarUrl,
      icsUrl,
      icsContent,
      mailtoLink,
      reference
    };

    console.log('🍎 Apple Calendar ICS created');

    // Add to booking history and calculate points
    const pointsEarned = Math.floor(calculateTotal() / 10);
    setUserBookingHistory(prev => [{
      id: reference,
      date: bookingDetails.date,
      time: selectedTime,
      duration: selectedDuration?.name,
      status: 'upcoming',
      points: pointsEarned
    }, ...prev]);
    
    addPoints(pointsEarned, `Booking ${reference}`);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Show confirmation
    setBookingConfirmed(true);
    setBookingStep(4);
  };

  const resetBooking = () => {
    setBookingStep(1);
    setSelectedLocation(null);
    setSelectedDuration(null);
    setSelectedServices([]);
    setSelectedDate(null);
    setSelectedTime(null);
    setBookingConfirmed(false);
    setBookingReference('');
  };

  const durations = [
    { name: '30 Minutes', price: 400, icon: '⏱', description: 'Quick meet & greet' },
    { name: '1 Hour', price: 800, icon: '🕐', description: 'Standard session' },
    { name: '90 Minutes', price: 1000, icon: '⌛', description: 'Extended experience' },
    { name: '2 Hours', price: 1200, icon: '🕑', description: 'Premium time' },
    { name: '3 Hours', price: 1600, icon: '🕒', description: 'VIP experience' },
    { name: 'Half Day (4hr)', price: 2000, icon: '☀️', description: 'Day date experience' },
    { name: 'Overnight', price: 3000, icon: '🌙', description: 'Full night together' },
    { name: 'Weekend Getaway', price: 6000, icon: '✈️', description: '48hrs of adventure' }
  ];

  // Shop products
  const shopProducts = [
    { name: 'Custom Photo Pack', price: 60, icon: '📸', category: 'custom', description: '5 personalized photos' },
    { name: 'Custom Video', price: 120, icon: '🎬', category: 'custom', description: '3-5 min personalized' },
    { name: 'Used Panties', price: 50, icon: '🩲', category: 'intimate', description: '24hr worn' },
    { name: 'Used Bra', price: 60, icon: '👙', category: 'intimate', description: 'Worn just for you' },
    { name: 'Used Socks', price: 30, icon: '🧦', category: 'intimate', description: 'Gym session worn' },
    { name: '2026 Calendar', price: 35, icon: '📅', category: 'merch', description: '12 exclusive photos' }
  ];

  // Clothing placeholders
  const clothingItems = [
    { name: 'T-Shirt', price: 35, icon: '👕', category: 'clothing' },
    { name: 'Hoodie', price: 65, icon: '🧥', category: 'clothing' },
    { name: 'Tank Top', price: 30, icon: '👚', category: 'clothing' },
    { name: 'Hat', price: 25, icon: '🧢', category: 'clothing' }
  ];

  // Services (for Shop section)
  const shopServices = [
    { name: 'Lingerie Cleaning', price: 250, icon: '💎', category: 'service' },
    { name: 'Dinner Date', price: 100, icon: '🍾', category: 'service' },
    { name: 'Day In The Life', price: 250, icon: '📸', category: 'service' },
    { name: 'Gaming Date', price: 200, icon: '🎮', category: 'service' },
    { name: 'Nuru Massage', price: 200, icon: '💆', category: 'service' }
  ];

  // Shop calculator state
  const [selectedShopItems, setSelectedShopItems] = useState([]);
  const [shopTab, setShopTab] = useState('products'); // 'products', 'clothing', 'services'
  
  const calculateShopTotal = () => {
    return selectedShopItems.reduce((total, item) => total + item.price, 0);
  };

  const toggleShopItem = (item) => {
    if (selectedShopItems.find(i => i.name === item.name)) {
      setSelectedShopItems(selectedShopItems.filter(i => i.name !== item.name));
    } else {
      setSelectedShopItems([...selectedShopItems, item]);
    }
  };

  // Podcast services (for Podcast section) - lower prices
  const podcastServices = [
    { name: 'Podcast Shoutout', price: 25, icon: '📢' },
    { name: 'Ad Spot (30 sec)', price: 50, icon: '📻' },
    { name: 'Ad Spot (60 sec)', price: 75, icon: '🎧' },
    { name: 'Podcast Guest Feature', price: 100, icon: '🎙️' },
    { name: 'Episode Sponsorship', price: 150, icon: '⭐' }
  ];

  // Podcast calculator state
  const [selectedPodcastServices, setSelectedPodcastServices] = useState([]);
  
  const calculatePodcastTotal = () => {
    return selectedPodcastServices.reduce((total, s) => total + s.price, 0);
  };

  const projects = [
    { icon: <Mic className="w-12 h-12" />, title: 'The Podcast', desc: 'The Notorious Diva - Real talk, bold opinions, unfiltered conversations. New episodes weekly.', tag: 'PODCAST' },
    { icon: <MessageCircle className="w-12 h-12" />, title: 'The Chatbot', desc: "The Notorious Diva AI - Your ultimate companion. When I'm away, you can still play. 24/7 real responses, photos, videos, phone calls & video chat.", tag: 'AI' },
    { icon: <Star className="w-12 h-12" />, title: 'The Book', desc: 'My unfiltered memoir. Every secret. Every scandal. Coming 2026.', tag: 'MEMOIR' },
    { icon: <Zap className="w-12 h-12" />, title: 'Coast to Coast', desc: 'California road trip documentary. Summer 2026.', tag: 'FILM' },
    { icon: <Heart className="w-12 h-12" />, title: 'Collaborations', desc: 'Brand partnerships & exclusive content creation.', tag: 'BUSINESS' }
  ];

  const quickLinks = [
    { name: 'Shop', icon: <Gift className="w-7 h-7" />, action: () => setActiveSection('shop'), subtitle: 'Merch & More' },
    { name: 'Book Now', icon: <Calendar className="w-7 h-7" />, action: () => setActiveSection('booking'), subtitle: 'Private Sessions' },
    { name: 'Portfolio', icon: <Camera className="w-7 h-7" />, action: () => setActiveSection('portfolio'), subtitle: 'Visual Gallery' },
    { name: 'Podcast', icon: <Headphones className="w-7 h-7" />, action: () => setActiveSection('podcast'), subtitle: 'The Notorious Diva' },
    { name: 'Projects', icon: <Sparkles className="w-7 h-7" />, action: () => setActiveSection('projects'), subtitle: 'What I\'m Working On' },
    { name: 'Rewards', icon: <Award className="w-7 h-7" />, action: () => setActiveSection('rewards'), subtitle: 'Loyalty Program' },
    { name: 'Wishlist', icon: <Heart className="w-7 h-7" />, action: () => setActiveSection('wishlist'), subtitle: 'Spoil Me' },
    { name: 'Contact', icon: <Mail className="w-7 h-7" />, action: () => setActiveSection('contact'), subtitle: 'Get In Touch' }
  ];

  const navItems = ['home', 'about', 'portfolio', 'booking', 'podcast', 'shop', 'wishlist', 'projects', 'rewards', 'contact'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50/50 to-purple-50/50 text-gray-900 overflow-x-hidden selection:bg-pink-500 selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Bebas+Neue&family=Outfit:wght@300;400;500;600&display=swap');
        
        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Outfit', sans-serif; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes pulse-pink {
          0%, 100% { box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.4); }
          50% { box-shadow: 0 0 40px 10px rgba(236, 72, 153, 0.2); }
        }
        
        @keyframes slide-up {
          0% { transform: translateY(60px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-shimmer { 
          background: linear-gradient(90deg, transparent, rgba(236,72,153,0.3), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        .animate-pulse-pink { animation: pulse-pink 3s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        .animate-sparkle { animation: sparkle 2s ease-in-out infinite; }
        .animate-marquee { animation: marquee 20s linear infinite; }
        
        .news-ticker {
          display: flex;
          width: max-content;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(236, 72, 153, 0.15);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
        }
        
        .glass-card-strong {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(30px);
          border: 1px solid rgba(236, 72, 153, 0.1);
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #ec4899, #a855f7, #ec4899);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .glow-text {
          text-shadow: 0 0 60px rgba(236, 72, 153, 0.3);
        }
        
        .hover-lift {
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-8px);
        }
        
        .marquee {
          display: flex;
          overflow: hidden;
          white-space: nowrap;
        }
        
        .marquee-content {
          display: flex;
          animation: marquee 30s linear infinite;
        }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .decorative-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.3;
          pointer-events: none;
        }
      `}</style>

      {/* Decorative Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="decorative-blob w-96 h-96 bg-pink-300 top-0 -left-48" />
        <div className="decorative-blob w-80 h-80 bg-purple-300 top-1/3 -right-40" />
        <div className="decorative-blob w-72 h-72 bg-rose-300 bottom-0 left-1/4" />
        <div className="decorative-blob w-64 h-64 bg-fuchsia-200 bottom-1/4 right-1/3" />
      </div>

      {/* Custom Cursor */}
      <div 
        className="fixed w-6 h-6 rounded-full border-2 border-pink-500 pointer-events-none z-[9999] mix-blend-multiply transition-transform duration-150 hidden lg:block"
        style={{ 
          left: mousePosition.x - 12, 
          top: mousePosition.y - 12,
          transform: hoveredNav ? 'scale(2)' : 'scale(1)'
        }}
      />
      <div 
        className="fixed w-2 h-2 rounded-full bg-pink-500 pointer-events-none z-[9999] hidden lg:block"
        style={{ left: mousePosition.x - 4, top: mousePosition.y - 4 }}
      />

      {/* Auth Modal */}
      {(showAuthModal || showBookingAuthPrompt) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-xl" onClick={() => { setShowAuthModal(false); setShowBookingAuthPrompt(false); setAuthError(''); }}>
          <div className="glass-card-strong rounded-3xl p-10 max-w-md w-full mx-4 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button 
              onClick={() => { setShowAuthModal(false); setShowBookingAuthPrompt(false); setAuthError(''); }}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
            
            <div className="text-center mb-8">
              <span className="text-4xl mb-4 block">👑</span>
              <h3 className="font-display text-4xl gradient-text tracking-wider">
                {showBookingAuthPrompt ? 'SIGN IN TO BOOK' : (authMode === 'login' ? 'WELCOME BACK' : 'JOIN THE CIRCLE')}
              </h3>
              {showBookingAuthPrompt && (
                <p className="font-sans text-sm text-gray-500 mt-2">Please sign in or create an account to complete your booking</p>
              )}
            </div>
            
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => { setAuthMode('login'); setAuthError(''); }}
                className={`flex-1 py-3 rounded-2xl font-sans text-sm tracking-wide transition-all ${authMode === 'login' ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg' : 'bg-white/50 text-gray-500 hover:bg-white/80'}`}
              >
                Login
              </button>
              <button
                onClick={() => { setAuthMode('signup'); setAuthError(''); }}
                className={`flex-1 py-3 rounded-2xl font-sans text-sm tracking-wide transition-all ${authMode === 'signup' ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg' : 'bg-white/50 text-gray-500 hover:bg-white/80'}`}
              >
                Sign Up
              </button>
            </div>

            {authError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-sans text-center">
                {authError}
              </div>
            )}

            <div className="space-y-4">
              {authMode === 'signup' && (
                <>
                  <input
                    type="text"
                    value={authData.name}
                    onChange={(e) => setAuthData({...authData, name: e.target.value})}
                    placeholder="Full Name *"
                    className="w-full px-5 py-4 rounded-2xl bg-white border border-pink-100 focus:border-pink-500 focus:outline-none font-sans placeholder:text-gray-400"
                  />
                  
                  {/* Email/Phone Toggle */}
                  <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setSignupMethod('email')}
                      className={`flex-1 py-2 rounded-lg font-sans text-sm transition-all flex items-center justify-center gap-2 ${signupMethod === 'email' ? 'bg-white shadow-sm text-pink-600' : 'text-gray-500'}`}
                    >
                      <Mail className="w-4 h-4" /> Email
                    </button>
                    <button
                      type="button"
                      onClick={() => setSignupMethod('phone')}
                      className={`flex-1 py-2 rounded-lg font-sans text-sm transition-all flex items-center justify-center gap-2 ${signupMethod === 'phone' ? 'bg-white shadow-sm text-pink-600' : 'text-gray-500'}`}
                    >
                      <Phone className="w-4 h-4" /> Phone
                    </button>
                  </div>
                </>
              )}
              
              {/* Show email field for login or if email signup method selected */}
              {(authMode === 'login' || signupMethod === 'email') && (
                <input
                  type="email"
                  value={authData.email}
                  onChange={(e) => setAuthData({...authData, email: e.target.value})}
                  placeholder={authMode === 'login' ? "Email or Phone" : "Email Address *"}
                  className="w-full px-5 py-4 rounded-2xl bg-white border border-pink-100 focus:border-pink-500 focus:outline-none font-sans placeholder:text-gray-400"
                />
              )}
              
              {/* Show phone field if phone signup method selected */}
              {authMode === 'signup' && signupMethod === 'phone' && (
                <input
                  type="tel"
                  value={authData.phone}
                  onChange={(e) => setAuthData({...authData, phone: e.target.value})}
                  placeholder="Phone Number *"
                  className="w-full px-5 py-4 rounded-2xl bg-white border border-pink-100 focus:border-pink-500 focus:outline-none font-sans placeholder:text-gray-400"
                />
              )}
              
              {/* Optional: Add the other contact method */}
              {authMode === 'signup' && (
                <input
                  type={signupMethod === 'email' ? 'tel' : 'email'}
                  value={signupMethod === 'email' ? authData.phone : authData.email}
                  onChange={(e) => setAuthData({...authData, [signupMethod === 'email' ? 'phone' : 'email']: e.target.value})}
                  placeholder={signupMethod === 'email' ? "Phone Number (optional)" : "Email (optional)"}
                  className="w-full px-5 py-4 rounded-2xl bg-white border border-pink-100 focus:border-pink-500 focus:outline-none font-sans placeholder:text-gray-400"
                />
              )}
              
              <input
                type="password"
                value={authData.password}
                onChange={(e) => setAuthData({...authData, password: e.target.value})}
                placeholder="Password *"
                className="w-full px-5 py-4 rounded-2xl bg-white border border-pink-100 focus:border-pink-500 focus:outline-none font-sans placeholder:text-gray-400"
              />
              <button
                onClick={handleAuth}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-display text-xl tracking-wider hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                {authMode === 'login' ? 'ENTER' : 'CREATE ACCOUNT'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-pink-100/30' : 'bg-white/70 backdrop-blur-md'}`}>
        <nav className="container mx-auto px-6 py-2 flex justify-between items-center">
          
          {/* Left Side - Profile/Account (when logged in) or empty space */}
          <div className="w-48">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-pink-50 transition-all"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <span className="font-sans text-xs text-gray-600 block">{userName}</span>
                    <div className="flex items-center gap-1">
                      <Award className="w-3 h-3 text-pink-500" />
                      <span className="font-sans text-[10px] text-pink-600 font-medium">{userPoints} pts</span>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Profile Dropdown - LEFT ALIGNED */}
                {showProfileMenu && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-pink-100 overflow-hidden z-50">
                    <div className="p-4 border-b border-pink-100 bg-gradient-to-r from-pink-50 to-purple-50">
                      <p className="font-sans text-sm font-medium text-gray-700">{userName}</p>
                      <p className="font-sans text-xs text-gray-500">{userEmail || userPhone}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Award className="w-4 h-4 text-pink-500" />
                        <span className="font-display text-lg text-pink-600">{userPoints} Points</span>
                      </div>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => { setActiveSection('profile'); setShowProfileMenu(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-pink-50 transition-colors text-left"
                      >
                        <User className="w-5 h-5 text-pink-500" />
                        <span className="font-sans text-sm text-gray-700">My Profile</span>
                      </button>
                      <button
                        onClick={() => { setActiveSection('profile'); setShowProfileMenu(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-pink-50 transition-colors text-left"
                      >
                        <History className="w-5 h-5 text-pink-500" />
                        <span className="font-sans text-sm text-gray-700">Booking History</span>
                      </button>
                      <button
                        onClick={() => { setActiveSection('rewards'); setShowProfileMenu(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-pink-50 transition-colors text-left"
                      >
                        <Award className="w-5 h-5 text-pink-500" />
                        <span className="font-sans text-sm text-gray-700">My Rewards</span>
                      </button>
                      <button
                        onClick={() => { setActiveSection('profile'); setShowProfileMenu(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-pink-50 transition-colors text-left"
                      >
                        <Settings className="w-5 h-5 text-pink-500" />
                        <span className="font-sans text-sm text-gray-700">Account Settings</span>
                      </button>
                      {isAdmin && (
                        <button
                          onClick={() => { setActiveSection('admin'); setShowProfileMenu(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-purple-50 transition-colors text-left border-t border-pink-100 mt-2 pt-3"
                        >
                          <Settings className="w-5 h-5 text-purple-500" />
                          <span className="font-sans text-sm text-purple-700 font-medium">Admin Dashboard</span>
                        </button>
                      )}
                      <button
                        onClick={() => { setIsLoggedIn(false); setIsAdmin(false); setShowProfileMenu(false); setUserPoints(0); }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors text-left border-t border-pink-100 mt-2"
                      >
                        <LogIn className="w-5 h-5 text-red-500" />
                        <span className="font-sans text-sm text-red-600">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:block">
                <span className="font-sans text-xs text-gray-400">Welcome, Guest</span>
              </div>
            )}
          </div>
          
          {/* Center - Logo */}
          <button 
            onClick={() => setActiveSection('home')}
            onMouseEnter={() => setHoveredNav('logo')}
            onMouseLeave={() => setHoveredNav(null)}
            className="group relative text-center"
          >
            <span className="font-display text-3xl tracking-[0.2em] gradient-text group-hover:opacity-80 transition-opacity">
              TAY KAY
            </span>
            <span className="block font-sans text-[10px] tracking-[0.4em] text-pink-500/70 font-medium uppercase">
              Notorious Diva
            </span>
          </button>
          
          {/* Right Side - Login/Sign Up */}
          <div className="w-48 flex justify-end">
            {!isLoggedIn && (
              <button
                onClick={() => setShowAuthModal(true)}
                onMouseEnter={() => setHoveredNav('auth')}
                onMouseLeave={() => setHoveredNav(null)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-xs font-sans tracking-wide hover:shadow-lg hover:shadow-pink-300/50 transition-all"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
            )}
          </div>
        </nav>
        
        {/* Navigation Bar - Below Header */}
        <div className="hidden lg:block border-t border-pink-100 bg-white/50">
          <div className="container mx-auto px-6 py-2 flex justify-center gap-6">
            {navItems.map((section, i) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                onMouseEnter={() => setHoveredNav(section)}
                onMouseLeave={() => setHoveredNav(null)}
                className="relative group py-2"
              >
                <span className={`font-sans text-xs tracking-wider uppercase transition-all duration-300 ${activeSection === section ? 'text-pink-600 font-semibold' : 'text-gray-500 group-hover:text-pink-500'}`}>
                  {section}
                </span>
                <span className={`absolute -bottom-0 left-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300 rounded-full ${activeSection === section ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero */}
      {activeSection === 'home' && (
        <section className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-32">
          {/* News Ticker below header */}
          <div className="fixed top-[48px] left-0 right-0 z-40 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 py-1.5 overflow-hidden shadow-md">
            <div className="news-ticker flex items-center whitespace-nowrap">
              <div className="animate-marquee flex items-center">
                <span className="font-display text-sm text-white tracking-wider mx-6">TAY KAY</span>
                <span className="text-pink-200 mx-2">✦</span>
                <span className="font-serif italic text-sm text-white mx-6">The Notorious Diva</span>
                <span className="text-pink-200 mx-2">✦</span>
                <span className="font-sans text-xs text-yellow-300 font-semibold mx-6">📰 TOUR STARTS TOMORROW!</span>
                <span className="text-pink-200 mx-2">✦</span>
                <span className="font-sans text-xs text-white mx-6">📍 01/21-01/24 SIOUX FALLS</span>
                <span className="text-pink-200 mx-2">✦</span>
                <span className="font-sans text-xs text-white mx-6">📍 01/25-01/28 OMAHA</span>
                <span className="text-pink-200 mx-2">✦</span>
                <span className="font-sans text-xs text-yellow-300 mx-6">📞 (218) 355-0792</span>
                <span className="text-pink-200 mx-2">✦</span>
                <span className="font-display text-sm text-white tracking-wider mx-6">TAY KAY</span>
                <span className="text-pink-200 mx-2">✦</span>
                <span className="font-serif italic text-sm text-white mx-6">The Notorious Diva</span>
                <span className="text-pink-200 mx-2">✦</span>
                <span className="font-sans text-xs text-yellow-300 font-semibold mx-6">📰 TOUR STARTS TOMORROW!</span>
                <span className="text-pink-200 mx-2">✦</span>
                <span className="font-sans text-xs text-white mx-6">📍 01/21-01/24 SIOUX FALLS</span>
                <span className="text-pink-200 mx-2">✦</span>
                <span className="font-sans text-xs text-white mx-6">📍 01/25-01/28 OMAHA</span>
                <span className="text-pink-200 mx-2">✦</span>
                <span className="font-sans text-xs text-yellow-300 mx-6">📞 (218) 355-0792</span>
              </div>
            </div>
          </div>
          
          {/* Decorative Lines */}
          <div className="absolute top-1/4 left-8 w-px h-32 bg-gradient-to-b from-transparent via-pink-300 to-transparent opacity-50" />
          <div className="absolute top-1/3 right-12 w-px h-48 bg-gradient-to-b from-transparent via-purple-300 to-transparent opacity-50" />
          <div className="absolute bottom-1/3 left-1/4 w-20 h-20 border border-pink-200/30 rotate-45 rounded-lg" />
          <div className="absolute top-1/4 right-1/4 w-16 h-16 border border-purple-200/30 rotate-12 rounded-full" />
          
          {/* Large Background Text */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
            <span className="font-display text-[35vw] text-pink-100/60 tracking-tighter select-none">
              TK
            </span>
          </div>
          
          <div className="relative z-10 container mx-auto px-6 mt-8">
            <div className="max-w-6xl mx-auto">
              {/* Crown Icon */}
              <div className="flex justify-center mb-6 animate-float">
                <div className="relative">
                  <Crown className="w-16 h-16 text-pink-500 drop-shadow-lg" />
                  <Sparkles className="w-6 h-6 text-purple-400 absolute -top-2 -right-2 animate-sparkle" />
                </div>
              </div>
              
              {/* Main Title */}
              <div className="text-center space-y-4 mb-6">
                <div className="overflow-hidden">
                  <h1 className="font-display text-[15vw] md:text-[12vw] leading-none tracking-wider gradient-text glow-text animate-slide-up">
                    TAY KAY
                  </h1>
                </div>
                <div className="overflow-hidden">
                  <p className="font-serif text-2xl md:text-3xl italic text-purple-600/90 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    The Notorious Diva
                  </p>
                </div>
              </div>
              
              {/* Tagline */}
              <p className="font-sans text-sm tracking-[0.4em] text-pink-400 text-center mb-8 uppercase font-medium">
                Model · Creator · Icon
              </p>
              
              {/* Sign In / Welcome Section */}
              {!isLoggedIn ? (
                <div className="flex flex-col items-center gap-4 mb-12">
                  <p className="font-sans text-gray-500 text-center">Join the Diva's inner circle for exclusive access</p>
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-display text-lg tracking-wider hover:shadow-2xl hover:shadow-pink-400/50 hover:scale-105 transition-all flex items-center gap-3"
                  >
                    <LogIn className="w-5 h-5" />
                    SIGN IN / JOIN NOW
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 mb-12">
                  <p className="font-sans text-gray-500">Welcome back,</p>
                  <p className="font-display text-2xl gradient-text">{userName}</p>
                </div>
              )}
              
              {/* Quick Links Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto pb-20">
                {quickLinks.map((link, i) => (
                  <button
                    key={i}
                    onClick={link.action}
                    onMouseEnter={() => setHoveredNav(link.name)}
                    onMouseLeave={() => setHoveredNav(null)}
                    className="group relative p-8 md:p-10 glass-card rounded-3xl hover:bg-white/90 transition-all duration-500 hover-lift overflow-hidden text-center"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {/* Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-100/0 to-purple-100/0 group-hover:from-pink-100/80 group-hover:to-purple-100/50 rounded-3xl transition-all duration-500" />
                    
                    {/* Corner Sparkle */}
                    <Sparkles className="absolute top-4 right-4 w-4 h-4 text-pink-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative flex flex-col items-center">
                      <div className="text-pink-400 group-hover:text-pink-600 transition-colors duration-300 mb-4">
                        {link.icon}
                      </div>
                      <div className="font-display text-xl tracking-wider text-gray-800 group-hover:gradient-text transition-all duration-300">
                        {link.name.toUpperCase()}
                      </div>
                      <div className="font-sans text-[10px] tracking-wider text-gray-400 mt-2 uppercase">
                        {link.subtitle}
                      </div>
                    </div>
                    
                    <ArrowUpRight className="absolute bottom-4 right-4 w-5 h-5 text-pink-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                ))}
              </div>
              
              {/* Featured: Notorious Diva Chatbot */}
              <div className="max-w-4xl mx-auto mt-8 mb-20">
                <div className="relative glass-card-strong rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl shadow-pink-200/50 border-2 border-pink-300">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
                  
                  {/* COMING SOON badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-sans tracking-wider px-4 py-1.5 rounded-full animate-pulse shadow-lg">
                    🚀 COMING SOON
                  </div>
                  
                  <div className="relative flex flex-col md:flex-row items-center gap-8">
                    {/* Chatbot Icon */}
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-pink-400/50 animate-float">
                      <MessageCircle className="w-16 h-16 md:w-20 md:h-20 text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="font-display text-4xl md:text-5xl tracking-wider gradient-text mb-2">THE NOTORIOUS DIVA</h3>
                      <p className="font-serif text-xl italic text-purple-600 mb-4">AI Chatbot</p>
                      <p className="font-sans text-gray-600 mb-6 leading-relaxed">
                        Your ultimate companion. <span className="text-pink-600 font-medium">When I'm away, you can still play.</span> Experience the Diva 24/7 with real responses, exclusive photos & videos, phone calls, and video chat.
                      </p>
                      
                      {/* Features */}
                      <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
                        {['24/7 Available', 'Real Responses', 'Photos & Videos', 'Phone Calls', 'Video Chat'].map((feature, i) => (
                          <span key={i} className="px-4 py-2 bg-white/80 rounded-full text-xs font-sans text-pink-600 border border-pink-200 shadow-sm">
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <button 
                        onClick={() => openComingSoon('AI Chatbot')}
                        className="px-10 py-4 border-2 border-pink-400 text-pink-600 rounded-full font-display text-lg tracking-wider hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white hover:border-transparent transition-all"
                      >
                        GET NOTIFIED WHEN IT LAUNCHES →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Marquee */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-pink-200/50 py-4 bg-white/30 backdrop-blur-sm">
            <div className="marquee">
              <div className="marquee-content">
                {[...Array(10)].map((_, i) => (
                  <span key={i} className="font-sans text-xs tracking-[0.4em] text-pink-300 mx-8 uppercase">
                    Notorious Diva ✦ Unapologetic ✦ Iconic ✦ Fearless ✦
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* About */}
      {activeSection === 'about' && (
        <section className="min-h-screen flex items-center justify-center p-6 pt-32 relative">
          <div className="max-w-5xl w-full">
            <div className="mb-12 text-center">
              <span className="font-sans text-xs tracking-[0.5em] text-pink-500 font-medium">001</span>
              <h2 className="font-display text-7xl md:text-8xl tracking-wider gradient-text mt-4 glow-text">ABOUT</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="glass-card rounded-3xl p-2 shadow-xl shadow-pink-100/50">
                <div className="aspect-[3/4] bg-gradient-to-br from-pink-200 via-purple-100 to-rose-200 rounded-2xl relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-9xl opacity-60">👑</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white/80 to-transparent">
                    <span className="font-sans text-xs tracking-[0.3em] text-pink-600 font-medium">EST. 2020</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <p className="font-serif text-3xl md:text-4xl leading-snug text-gray-700 italic">
                  "Boldly confident, unapologetically fierce, and always authentic."
                </p>
                <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
                <p className="font-sans text-lg leading-relaxed text-gray-500">
                  I'm Tay Kay, known as The Notorious Diva in the modeling world. Specializing in alternative fashion, boudoir, and lifestyle modeling, I create content that's provocative, artistic, and always on my own terms.
                </p>
                <p className="font-sans text-lg leading-relaxed text-gray-500">
                  Every shoot is a statement. Every frame tells a story. This isn't just modeling—it's art, rebellion, and self-expression wrapped into one.
                </p>
                
                <div className="pt-6 flex gap-10">
                  {[
                    { num: '5+', label: 'Years' },
                    { num: '200+', label: 'Shoots' },
                    { num: '50K+', label: 'Followers' }
                  ].map((stat, i) => (
                    <div key={i}>
                      <span className="font-display text-4xl gradient-text">{stat.num}</span>
                      <p className="font-sans text-xs tracking-wider text-gray-400 mt-1 uppercase">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Portfolio */}
      {activeSection === 'portfolio' && (
        <section className="min-h-screen p-6 pt-32 relative">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <span className="font-sans text-xs tracking-[0.5em] text-pink-500 font-medium">002</span>
                <h2 className="font-display text-7xl md:text-8xl tracking-wider gradient-text mt-4 glow-text">PORTFOLIO</h2>
              </div>
              {/* Subscription Badge */}
              {userSubscription && (
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full">
                  <Crown className="w-4 h-4 text-white" />
                  <span className="font-sans text-sm text-white font-medium">
                    {userSubscription === 'vip' ? 'VIP Subscriber' : 'Premium Subscriber'}
                  </span>
                </div>
              )}
            </div>
            
            {/* Main Navigation Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                { id: 'photos', label: 'Photos', icon: <Camera className="w-4 h-4" />, count: portfolioPhotos.length },
                { id: 'videos', label: 'Videos', icon: <span className="text-sm">🎬</span>, count: portfolioVideos.length },
                { id: 'live', label: 'Live', icon: <span className="text-sm">🔴</span>, count: liveVideos.length },
                { id: 'collection', label: 'My Collection', icon: <Heart className="w-4 h-4" />, count: isLoggedIn ? (userCollection.photos.length + userCollection.videos.length) : 0 },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setPortfolioView(tab.id)}
                  className={`px-6 py-3 rounded-2xl font-sans text-sm transition-all flex items-center gap-2 ${
                    portfolioView === tab.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-300/30'
                      : 'bg-white border-2 border-pink-200 text-gray-600 hover:border-pink-400'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${portfolioView === tab.id ? 'bg-white/20' : 'bg-pink-100 text-pink-600'}`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
            
            {/* Subscription Banner (if not subscribed) */}
            {!userSubscription && portfolioView !== 'collection' && (
              <div className="mb-8 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-10"></div>
                <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Crown className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl tracking-wider">BECOME A SUBSCRIBER</h3>
                      <p className="font-sans text-sm text-pink-100">$50/month • 20% off all content • Exclusive access • Priority booking</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (!isLoggedIn) {
                        setShowAuthModal(true);
                      } else {
                        setUserSubscription('monthly');
                        addPoints(100, 'Subscription bonus');
                        alert('🎉 Welcome to the Diva Circle! You now have 20% off all content.');
                      }
                    }}
                    className="px-8 py-3 bg-white text-pink-600 rounded-full font-display tracking-wider hover:shadow-xl hover:scale-105 transition-all"
                  >
                    SUBSCRIBE NOW
                  </button>
                </div>
              </div>
            )}
            
            {/* PHOTOS VIEW */}
            {portfolioView === 'photos' && (
              <>
                {/* Album Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {portfolioAlbums.map(album => (
                    <button
                      key={album.id}
                      onClick={() => setSelectedAlbum(album.id)}
                      className={`px-5 py-2.5 rounded-full font-sans text-sm transition-all flex items-center gap-2 ${
                        selectedAlbum === album.id
                          ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                          : 'bg-white border border-pink-200 text-gray-600 hover:border-pink-400'
                      }`}
                    >
                      <FolderOpen className="w-4 h-4" />
                      {album.name}
                      <span className={`text-xs px-2 py-0.5 rounded-full ${selectedAlbum === album.id ? 'bg-white/20' : 'bg-pink-100 text-pink-600'}`}>
                        {album.id === 'all' ? portfolioPhotos.length : portfolioPhotos.filter(p => p.album === album.id).length}
                      </span>
                    </button>
                  ))}
                </div>
                
                {/* Photo Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {portfolioPhotos
                    .filter(item => selectedAlbum === 'all' || item.album === selectedAlbum)
                    .map((item, i) => (
                    <div
                      key={i}
                      className="aspect-[3/4] relative group overflow-hidden rounded-2xl hover-lift cursor-pointer"
                    >
                      <img 
                        src={item.src} 
                        alt={`Portfolio ${i + 1}`}
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                        style={{ filter: 'contrast(1.05) saturate(1.1) brightness(1.02)' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/20 mix-blend-overlay" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <span className="font-sans text-[10px] tracking-[0.3em] text-pink-300 font-medium">{item.category}</span>
                        {item.price && (
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-sans text-white text-sm">${userSubscription ? (item.price * 0.8).toFixed(0) : item.price}</span>
                            {userSubscription && <span className="text-[10px] text-green-400">20% OFF</span>}
                          </div>
                        )}
                      </div>
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <ArrowUpRight className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            
            {/* VIDEOS VIEW */}
            {portfolioView === 'videos' && (
              <>
                {/* Video Album Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {videoAlbums.map(album => (
                    <button
                      key={album.id}
                      onClick={() => setSelectedVideoAlbum(album.id)}
                      className={`px-5 py-2.5 rounded-full font-sans text-sm transition-all flex items-center gap-2 ${
                        selectedVideoAlbum === album.id
                          ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                          : 'bg-white border border-pink-200 text-gray-600 hover:border-pink-400'
                      }`}
                    >
                      🎬 {album.name}
                      <span className={`text-xs px-2 py-0.5 rounded-full ${selectedVideoAlbum === album.id ? 'bg-white/20' : 'bg-pink-100 text-pink-600'}`}>
                        {album.id === 'all' ? portfolioVideos.length : portfolioVideos.filter(v => v.album === album.id).length}
                      </span>
                    </button>
                  ))}
                </div>
                
                {/* Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portfolioVideos
                    .filter(video => selectedVideoAlbum === 'all' || video.album === selectedVideoAlbum)
                    .map((video, i) => (
                    <div key={i} className="glass-card-strong rounded-2xl overflow-hidden hover-lift group">
                      {/* Video Thumbnail */}
                      <div className="aspect-video bg-gradient-to-br from-pink-100 to-purple-100 relative flex items-center justify-center">
                        <span className="text-6xl">{video.thumbnail}</span>
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-pink-600 border-b-8 border-b-transparent ml-1"></div>
                          </div>
                        </div>
                        {/* Duration Badge */}
                        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-white text-xs font-sans">
                          {video.duration}
                        </div>
                        {/* Exclusive Badge */}
                        {!video.preview && (
                          <div className="absolute top-2 left-2 px-2 py-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded text-white text-xs font-sans">
                            🔒 Exclusive
                          </div>
                        )}
                      </div>
                      {/* Video Info */}
                      <div className="p-4">
                        <h4 className="font-display text-lg tracking-wider text-gray-800">{video.title}</h4>
                        <div className="flex items-center justify-between mt-3">
                          {video.price === 0 ? (
                            <span className="font-sans text-sm text-green-600 font-medium">FREE</span>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="font-display text-xl gradient-text">
                                ${userSubscription ? (video.price * 0.8).toFixed(0) : video.price}
                              </span>
                              {userSubscription && <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">20% OFF</span>}
                            </div>
                          )}
                          <button
                            onClick={() => {
                              if (!isLoggedIn) {
                                setShowAuthModal(true);
                              } else if (video.price === 0 || video.preview) {
                                alert('🎬 Playing preview...');
                              } else {
                                alert(`Purchase ${video.title} for $${userSubscription ? (video.price * 0.8).toFixed(0) : video.price}?`);
                              }
                            }}
                            className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-sans text-sm hover:shadow-lg transition-all"
                          >
                            {video.price === 0 ? 'WATCH' : 'BUY'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            
            {/* LIVE VIEW */}
            {portfolioView === 'live' && (
              <>
                {/* Upcoming Lives */}
                <div className="mb-10">
                  <h3 className="font-display text-2xl tracking-wider gradient-text mb-6 flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                    UPCOMING LIVE STREAMS
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {liveVideos.filter(v => v.status === 'upcoming').map((live, i) => (
                      <div key={i} className="glass-card-strong rounded-2xl p-6 border-2 border-pink-300 hover-lift">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-sans rounded-full">UPCOMING</span>
                            <h4 className="font-display text-xl tracking-wider text-gray-800 mt-3">{live.title}</h4>
                            <p className="font-sans text-sm text-gray-500 mt-2">
                              📅 {live.date} at {live.time}
                            </p>
                          </div>
                          <div className="text-4xl">🔴</div>
                        </div>
                        <button
                          onClick={() => {
                            if (!isLoggedIn) setShowAuthModal(true);
                            else alert('🔔 Reminder set! You\'ll be notified before the stream.');
                          }}
                          className="w-full mt-4 py-3 border-2 border-pink-400 text-pink-600 rounded-full font-sans hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-all"
                        >
                          SET REMINDER
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Past Recorded Lives */}
                <div>
                  <h3 className="font-display text-2xl tracking-wider gradient-text mb-6">PAST STREAMS</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {liveVideos.filter(v => v.status === 'recorded').map((live, i) => (
                      <div key={i} className="glass-card rounded-2xl p-5 hover-lift group cursor-pointer">
                        <div className="aspect-video bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl mb-4 flex items-center justify-center relative">
                          <span className="text-5xl">📺</span>
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                              <div className="w-0 h-0 border-t-6 border-t-transparent border-l-10 border-l-pink-600 border-b-6 border-b-transparent ml-1"></div>
                            </div>
                          </div>
                          <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-white text-xs">
                            {live.duration}
                          </div>
                        </div>
                        <h4 className="font-display text-lg tracking-wider text-gray-800">{live.title}</h4>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-sans text-xs text-gray-500">{live.date}</span>
                          <span className="font-sans text-xs text-pink-500">👁 {live.viewers} viewers</span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <span className="font-display text-lg gradient-text">
                            {userSubscription ? 'FREE' : '$10'}
                          </span>
                          {userSubscription && <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Subscriber Access</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            {/* MY COLLECTION VIEW */}
            {portfolioView === 'collection' && (
              <>
                {!isLoggedIn ? (
                  <div className="text-center py-20">
                    <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Heart className="w-12 h-12 text-pink-400" />
                    </div>
                    <h3 className="font-display text-3xl tracking-wider gradient-text mb-4">YOUR COLLECTION</h3>
                    <p className="font-sans text-gray-500 mb-8">Sign in to view your purchased photos, videos, and exclusive content</p>
                    <button
                      onClick={() => setShowAuthModal(true)}
                      className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-display tracking-wider hover:shadow-xl hover:scale-105 transition-all"
                    >
                      SIGN IN
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Collection Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="glass-card rounded-2xl p-5 text-center">
                        <span className="text-3xl mb-2 block">📸</span>
                        <span className="font-display text-2xl gradient-text">{userCollection.photos.length}</span>
                        <p className="font-sans text-xs text-gray-500">Photos</p>
                      </div>
                      <div className="glass-card rounded-2xl p-5 text-center">
                        <span className="text-3xl mb-2 block">🎬</span>
                        <span className="font-display text-2xl gradient-text">{userCollection.videos.length}</span>
                        <p className="font-sans text-xs text-gray-500">Videos</p>
                      </div>
                      <div className="glass-card rounded-2xl p-5 text-center">
                        <span className="text-3xl mb-2 block">📦</span>
                        <span className="font-display text-2xl gradient-text">{userCollection.photoSets.length}</span>
                        <p className="font-sans text-xs text-gray-500">Photo Sets</p>
                      </div>
                    </div>
                    
                    {/* Purchased Photos */}
                    {userCollection.photos.length > 0 && (
                      <div className="mb-10">
                        <h3 className="font-display text-xl tracking-wider text-gray-800 mb-4">MY PHOTOS</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {userCollection.photos.map((photo, i) => (
                            <div key={i} className="aspect-[3/4] relative group overflow-hidden rounded-2xl">
                              <img src={photo.src} alt="" className="absolute inset-0 w-full h-full object-cover" />
                              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                                <span className="font-sans text-xs text-white">{photo.category}</span>
                                <p className="font-sans text-[10px] text-gray-300">Purchased {photo.purchaseDate}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Purchased Videos */}
                    {userCollection.videos.length > 0 && (
                      <div className="mb-10">
                        <h3 className="font-display text-xl tracking-wider text-gray-800 mb-4">MY VIDEOS</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                          {userCollection.videos.map((video, i) => (
                            <div key={i} className="glass-card rounded-2xl p-4 flex items-center gap-4">
                              <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">🎬</span>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-sans font-medium text-gray-800">{video.title}</h4>
                                <p className="font-sans text-xs text-gray-500">{video.duration}</p>
                              </div>
                              <button className="px-4 py-2 bg-pink-500 text-white rounded-full text-sm">WATCH</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Photo Sets */}
                    {userCollection.photoSets.length > 0 && (
                      <div>
                        <h3 className="font-display text-xl tracking-wider text-gray-800 mb-4">MY PHOTO SETS</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {userCollection.photoSets.map((set, i) => (
                            <div key={i} className="glass-card-strong rounded-2xl p-6 flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                                  <span className="text-2xl">📦</span>
                                </div>
                                <div>
                                  <h4 className="font-sans font-medium text-gray-800">{set.name}</h4>
                                  <p className="font-sans text-xs text-gray-500">{set.count} photos • Purchased {set.purchaseDate}</p>
                                </div>
                              </div>
                              <button className="px-4 py-2 border-2 border-pink-400 text-pink-600 rounded-full text-sm hover:bg-pink-500 hover:text-white transition-all">
                                VIEW SET
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Empty State */}
                    {userCollection.photos.length === 0 && userCollection.videos.length === 0 && userCollection.photoSets.length === 0 && (
                      <div className="text-center py-16">
                        <span className="text-6xl mb-4 block">📭</span>
                        <h3 className="font-display text-2xl tracking-wider text-gray-600 mb-2">YOUR COLLECTION IS EMPTY</h3>
                        <p className="font-sans text-gray-500 mb-6">Browse the gallery and start building your exclusive collection!</p>
                        <button
                          onClick={() => setPortfolioView('photos')}
                          className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-sans hover:shadow-lg transition-all"
                        >
                          BROWSE CONTENT
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </section>
      )}

      {/* Booking */}
      {activeSection === 'booking' && (
        <section className="min-h-screen p-6 pt-32 relative">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <span className="font-sans text-xs tracking-[0.5em] text-pink-500 font-medium">003</span>
              <h2 className="font-display text-7xl md:text-8xl tracking-wider gradient-text mt-4 glow-text">BOOK ME</h2>
              <p className="font-sans text-sm tracking-[0.3em] text-gray-400 mt-4 uppercase">Private Sessions & Experiences</p>
            </div>
            
            {/* Session Types Quick Info */}
            {bookingStep === 1 && (
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="glass-card rounded-2xl p-4 text-center">
                  <span className="text-2xl mb-2 block">📸</span>
                  <h4 className="font-display text-sm tracking-wider text-gray-700">PHOTO SESSIONS</h4>
                  <p className="font-sans text-xs text-gray-500 mt-1">Professional & intimate shoots</p>
                </div>
                <div className="glass-card rounded-2xl p-4 text-center">
                  <span className="text-2xl mb-2 block">🥂</span>
                  <h4 className="font-display text-sm tracking-wider text-gray-700">DATE EXPERIENCES</h4>
                  <p className="font-sans text-xs text-gray-500 mt-1">Dinner, events, & companionship</p>
                </div>
                <div className="glass-card rounded-2xl p-4 text-center">
                  <span className="text-2xl mb-2 block">✨</span>
                  <h4 className="font-display text-sm tracking-wider text-gray-700">PRIVATE TIME</h4>
                  <p className="font-sans text-xs text-gray-500 mt-1">Exclusive one-on-one sessions</p>
                </div>
              </div>
            )}
            
            {/* Progress Indicator */}
            {bookingStep < 4 && (
              <div className="flex items-center gap-2 mb-10 max-w-xl mx-auto">
                {[
                  { step: 1, label: 'Location' },
                  { step: 2, label: 'Duration' },
                  { step: 3, label: 'Schedule' }
                ].map(({ step, label }) => (
                  <React.Fragment key={step}>
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
                        bookingStep >= step 
                          ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-300/50' 
                          : 'bg-white/80 border-2 border-pink-200 text-gray-400'
                      }`}>
                        {bookingStep > step ? <Check className="w-5 h-5" /> : <span className="font-display text-sm">{step}</span>}
                      </div>
                      <span className={`font-sans text-[10px] mt-1 ${bookingStep >= step ? 'text-pink-600' : 'text-gray-400'}`}>{label}</span>
                    </div>
                    {step < 3 && (
                      <div className={`flex-1 h-1 rounded-full transition-all duration-300 mb-5 ${bookingStep > step ? 'bg-gradient-to-r from-pink-500 to-purple-500' : 'bg-pink-100'}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}

            <div className="glass-card-strong rounded-3xl p-8 md:p-12 shadow-xl shadow-pink-100/50">
              {bookingStep === 1 && (
                <div className="space-y-8 animate-slide-up">
                  <h3 className="font-display text-3xl tracking-wider gradient-text text-center">SELECT LOCATION</h3>
                  <div className="grid grid-cols-2 gap-6">
                    {['incall', 'outcall'].map(loc => (
                      <button
                        key={loc}
                        onClick={() => { setSelectedLocation(loc); setBookingStep(2); }}
                        className={`p-8 rounded-2xl transition-all duration-500 group hover-lift ${
                          selectedLocation === loc ? 'bg-gradient-to-br from-pink-100 to-purple-100 border-2 border-pink-400 shadow-lg' : 'bg-white/60 border-2 border-pink-100 hover:border-pink-300'
                        }`}
                      >
                        <MapPin className={`w-12 h-12 mx-auto mb-4 transition-colors ${selectedLocation === loc ? 'text-pink-600' : 'text-pink-300 group-hover:text-pink-500'}`} />
                        <div className="font-display text-2xl tracking-wider text-gray-800 capitalize">{loc}</div>
                        <div className="font-sans text-sm text-purple-600 mt-2 font-medium">
                          {loc === 'outcall' ? '+$100 Travel Fee' : 'Base Rate'}
                        </div>
                        <p className="font-sans text-xs text-gray-400 mt-2">
                          {loc === 'incall' ? 'Visit my private location' : 'I come to your location'}
                        </p>
                      </button>
                    ))}
                  </div>
                  
                  {/* Quick Contact for Questions */}
                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-4 text-center">
                    <p className="font-sans text-sm text-gray-600">
                      Questions before booking? <a href="tel:+12183550792" className="text-pink-600 font-medium hover:underline">Call (218) 355-0792</a>
                    </p>
                  </div>
                </div>
              )}

              {bookingStep === 2 && (
                <div className="space-y-8 animate-slide-up">
                  <h3 className="font-display text-3xl tracking-wider gradient-text text-center">SELECT DURATION</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {durations.map(dur => (
                      <button
                        key={dur.name}
                        onClick={() => { setSelectedDuration(dur); setBookingStep(3); }}
                        className={`p-5 rounded-2xl transition-all duration-500 group hover-lift ${
                          selectedDuration?.name === dur.name ? 'bg-gradient-to-br from-pink-100 to-purple-100 border-2 border-pink-400 shadow-lg' : 'bg-white/60 border-2 border-pink-100 hover:border-pink-300'
                        }`}
                      >
                        <span className="text-2xl mb-2 block">{dur.icon}</span>
                        <div className="font-sans text-sm text-gray-700">{dur.name}</div>
                        <div className="font-display text-xl gradient-text mt-1">${dur.price.toLocaleString()}</div>
                        <div className="font-sans text-[10px] text-gray-400 mt-1">{dur.description}</div>
                      </button>
                    ))}
                  </div>
                  
                  {/* Add-ons Preview */}
                  <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200">
                    <p className="font-sans text-sm text-purple-700 text-center">
                      ✨ <strong>Pro Tip:</strong> Longer sessions include complimentary add-ons like photos, outfit changes, and more!
                    </p>
                  </div>
                  <button onClick={() => setBookingStep(1)} className="font-sans text-sm text-gray-400 hover:text-pink-600 transition-colors">
                    ← Back
                  </button>
                </div>
              )}

              {bookingStep === 3 && (
                <div className="space-y-8 animate-slide-up">
                  <h3 className="font-display text-3xl tracking-wider gradient-text text-center">SELECT DATE & TIME</h3>
                  <p className="font-sans text-sm text-gray-500 text-center">Choose your preferred appointment within the next 2 weeks</p>
                  
                  {/* Date Selection */}
                  <div>
                    <h4 className="font-sans text-sm font-medium text-gray-600 mb-4 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-pink-500" /> SELECT DATE
                    </h4>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {availableDates.map((date, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedDate(date)}
                          className={`p-4 rounded-2xl transition-all duration-300 text-center ${
                            selectedDate?.toDateString() === date.toDateString()
                              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                              : 'bg-white border-2 border-pink-100 hover:border-pink-300 text-gray-700'
                          }`}
                        >
                          <div className="font-sans text-xs uppercase">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                          <div className="font-display text-2xl">{date.getDate()}</div>
                          <div className="font-sans text-xs">{date.toLocaleDateString('en-US', { month: 'short' })}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Selection */}
                  {selectedDate && (
                    <div className="animate-slide-up">
                      <h4 className="font-sans text-sm font-medium text-gray-600 mb-4 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-pink-500" /> SELECT TIME
                      </h4>
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                        {timeSlots.map((time, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedTime(time)}
                            className={`p-4 rounded-2xl transition-all duration-300 ${
                              selectedTime === time
                                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                                : 'bg-white border-2 border-pink-100 hover:border-pink-300 text-gray-700'
                            }`}
                          >
                            <span className="font-sans">{time}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Booking Summary */}
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl border-2 border-pink-200">
                    <h4 className="font-display text-lg tracking-wider gradient-text mb-4">BOOKING SUMMARY</h4>
                    <div className="space-y-2 text-sm">
                      {selectedDate && (
                        <div className="flex justify-between font-sans">
                          <span className="text-gray-500">Date</span>
                          <span className="text-gray-700">{formatDate(selectedDate)}</span>
                        </div>
                      )}
                      {selectedTime && (
                        <div className="flex justify-between font-sans">
                          <span className="text-gray-500">Time</span>
                          <span className="text-gray-700">{selectedTime}</span>
                        </div>
                      )}
                      {selectedLocation && (
                        <div className="flex justify-between font-sans">
                          <span className="text-gray-500">Location</span>
                          <span className="text-gray-700 capitalize">{selectedLocation}</span>
                        </div>
                      )}
                      {selectedDuration && (
                        <div className="flex justify-between font-sans">
                          <span className="text-gray-500">Duration</span>
                          <span className="text-gray-700">{selectedDuration.name}</span>
                        </div>
                      )}
                      <div className="border-t border-pink-200 mt-3 pt-3 flex justify-between">
                        <span className="font-display text-lg text-gray-800">TOTAL</span>
                        <span className="font-display text-2xl gradient-text">${calculateTotal()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Login Reminder */}
                  {!isLoggedIn && (
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-4">
                      <User className="w-8 h-8 text-amber-500" />
                      <p className="font-sans text-sm text-amber-800">You'll need to sign in to complete your booking</p>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button onClick={() => setBookingStep(2)} className="font-sans text-sm text-gray-400 hover:text-pink-600 transition-colors">
                      ← Back
                    </button>
                    <button
                      onClick={handleBookingSubmit}
                      disabled={!selectedDate || !selectedTime}
                      className={`flex-1 py-4 rounded-full font-display text-xl tracking-wider transition-all ${
                        selectedDate && selectedTime
                          ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-xl hover:shadow-pink-300/50 hover:scale-[1.02]'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {isLoggedIn ? 'SUBMIT REQUEST' : 'SIGN IN & SUBMIT'}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {bookingStep === 4 && bookingConfirmed && (
                <div className="space-y-8 animate-slide-up text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-pink-300/50">
                    <Check className="w-12 h-12 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="font-display text-4xl tracking-wider gradient-text mb-4">BOOKING CONFIRMED!</h3>
                    <p className="font-sans text-gray-500">Thank you for your booking request, {userName}!</p>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-2xl border-2 border-pink-200">
                    <div className="font-sans text-sm text-gray-500 mb-2">Your Reference Number</div>
                    <div className="font-display text-3xl gradient-text tracking-wider">{bookingReference}</div>
                  </div>

                  <div className="bg-white/80 p-6 rounded-2xl border border-pink-200 text-left space-y-3">
                    <div className="flex justify-between font-sans">
                      <span className="text-gray-500">Date & Time</span>
                      <span className="text-gray-700 font-medium">{selectedDate && formatDate(selectedDate)} at {selectedTime}</span>
                    </div>
                    <div className="flex justify-between font-sans">
                      <span className="text-gray-500">Duration</span>
                      <span className="text-gray-700 font-medium">{selectedDuration?.name}</span>
                    </div>
                    <div className="flex justify-between font-sans">
                      <span className="text-gray-500">Location</span>
                      <span className="text-gray-700 font-medium capitalize">{selectedLocation}</span>
                    </div>
                    <div className="flex justify-between font-sans border-t border-pink-100 pt-3 mt-3">
                      <span className="text-gray-800 font-medium">Total</span>
                      <span className="font-display text-2xl gradient-text">${calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Notification Sent Confirmation */}
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                    <h4 className="font-display text-lg text-green-700 mb-3">✅ NOTIFICATIONS SENT</h4>
                    <div className="grid grid-cols-2 gap-3 text-left">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="font-sans text-sm text-green-700">SMS to Tay Kay</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="font-sans text-sm text-green-700">Email notification</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="font-sans text-sm text-green-700">Confirmation to {userEmail}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="font-sans text-sm text-green-700">Points earned: +{Math.floor(calculateTotal() / 10)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Add to Calendar */}
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                    <h4 className="font-display text-lg text-blue-700 mb-4">📅 ADD TO CALENDAR</h4>
                    <div className="flex flex-wrap justify-center gap-3">
                      <a 
                        href={window.bookingCalendarData?.googleCalendarUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-blue-300 text-blue-700 rounded-xl font-sans text-sm hover:bg-blue-100 transition-all"
                      >
                        <span className="text-lg">📆</span>
                        Google Calendar
                      </a>
                      <button
                        onClick={() => {
                          if (window.bookingCalendarData?.icsUrl) {
                            const a = document.createElement('a');
                            a.href = window.bookingCalendarData.icsUrl;
                            a.download = `TayKay-Booking-${bookingReference}.ics`;
                            a.click();
                          }
                        }}
                        className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-sans text-sm hover:bg-gray-100 transition-all"
                      >
                        <span className="text-lg">🍎</span>
                        Apple Calendar (.ics)
                      </button>
                      <a 
                        href={window.bookingCalendarData?.mailtoLink || '#'}
                        className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-purple-300 text-purple-700 rounded-xl font-sans text-sm hover:bg-purple-100 transition-all"
                      >
                        <span className="text-lg">📧</span>
                        Email Details
                      </a>
                    </div>
                  </div>
                  
                  {/* Payment Options */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
                    <p className="font-sans text-purple-700 font-medium mb-3">💳 Deposit Required to Confirm</p>
                    <p className="font-sans text-gray-600 text-sm mb-4">A 50% deposit (${Math.floor(calculateTotal() / 2).toLocaleString()}) is required to secure your booking.</p>
                    <a 
                      href="https://venmo.com/taykaybabyxoxo" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-6 py-3 bg-[#008CFF] text-white rounded-xl font-sans hover:shadow-lg hover:scale-105 transition-all"
                    >
                      <span className="text-xl">💸</span>
                      <div className="text-left">
                        <span className="text-xs opacity-80">Pay with Venmo</span>
                        <p className="font-medium">@taykaybabyxoxo</p>
                      </div>
                    </a>
                  </div>

                  <button
                    onClick={resetBooking}
                    className="px-8 py-4 border-2 border-pink-400 text-pink-600 rounded-full font-display tracking-wider hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white hover:border-transparent transition-all"
                  >
                    BOOK ANOTHER SESSION
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Podcast */}
      {activeSection === 'podcast' && (
        <section className="min-h-screen p-6 pt-32 relative">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-center">
              <span className="font-sans text-xs tracking-[0.5em] text-pink-500 font-medium">004</span>
              <h2 className="font-display text-7xl md:text-8xl tracking-wider gradient-text mt-4 glow-text">PODCAST</h2>
              <p className="font-sans text-sm tracking-[0.3em] text-gray-400 mt-4 uppercase">The Notorious Diva Show</p>
            </div>
            
            {/* Podcast Info */}
            <div className="glass-card rounded-3xl p-10 mb-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-32 h-32 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Mic className="w-16 h-16 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-sans tracking-wider px-4 py-1.5 rounded-full mb-3">
                    COMING SOON
                  </div>
                  <h3 className="font-display text-4xl tracking-wider gradient-text mb-2">THE NOTORIOUS DIVA</h3>
                  <p className="font-sans text-gray-500 mb-4">Real talk, bold opinions, and unfiltered conversations about life, modeling, relationships, and everything in between. Subscribe to be notified when we launch!</p>
                  
                  {/* Newsletter Signup */}
                  <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 px-5 py-3 rounded-full bg-white border-2 border-pink-200 focus:border-pink-500 focus:outline-none font-sans text-sm"
                    />
                    <button 
                      onClick={() => handleNewsletterSignup('Podcast')}
                      className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-sans text-sm tracking-wider hover:shadow-lg transition-all whitespace-nowrap"
                    >
                      NOTIFY ME
                    </button>
                  </div>
                  {newsletterSuccess && (
                    <p className="text-green-600 font-sans text-sm mt-2 flex items-center gap-2">
                      <Check className="w-4 h-4" /> You're on the list! We'll notify you when we launch.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Podcast Services Calculator */}
            <div className="glass-card-strong rounded-3xl p-8 md:p-10 shadow-xl">
              <div className="text-center mb-8">
                <h3 className="font-display text-3xl tracking-wider gradient-text">ADVERTISE WITH ME</h3>
                <p className="font-sans text-sm text-gray-500 mt-2">Promote your brand on The Notorious Diva podcast</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Services Selection */}
                <div>
                  <h4 className="font-sans text-sm font-medium text-gray-600 mb-4 flex items-center gap-2">
                    <Headphones className="w-4 h-4 text-pink-500" /> SELECT SERVICES
                  </h4>
                  <div className="space-y-3">
                    {podcastServices.map(service => (
                      <button
                        key={service.name}
                        onClick={() => {
                          if (selectedPodcastServices.find(s => s.name === service.name)) {
                            setSelectedPodcastServices(selectedPodcastServices.filter(s => s.name !== service.name));
                          } else {
                            setSelectedPodcastServices([...selectedPodcastServices, service]);
                          }
                        }}
                        className={`w-full p-4 rounded-2xl transition-all duration-300 flex justify-between items-center ${
                          selectedPodcastServices.find(s => s.name === service.name) 
                            ? 'bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-pink-400' 
                            : 'bg-white border-2 border-pink-100 hover:border-pink-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{service.icon}</span>
                          <span className="font-sans text-gray-700 text-sm">{service.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-display text-lg text-purple-600">${service.price}</span>
                          {selectedPodcastServices.find(s => s.name === service.name) && <Check className="w-4 h-4 text-pink-500" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Summary */}
                <div>
                  <h4 className="font-sans text-sm font-medium text-gray-600 mb-4">ORDER SUMMARY</h4>
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl border-2 border-pink-200">
                    {selectedPodcastServices.length === 0 ? (
                      <p className="text-gray-400 font-sans text-sm text-center py-8">Select services to see your total</p>
                    ) : (
                      <div className="space-y-3">
                        {selectedPodcastServices.map(s => (
                          <div key={s.name} className="flex justify-between font-sans text-sm">
                            <span className="text-gray-600">{s.icon} {s.name}</span>
                            <span className="text-gray-700 font-medium">${s.price}</span>
                          </div>
                        ))}
                        <div className="border-t-2 border-pink-200 mt-4 pt-4 flex justify-between items-center">
                          <span className="font-display text-xl tracking-wider text-gray-800">TOTAL</span>
                          <span className="font-display text-3xl gradient-text">${calculatePodcastTotal()}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {selectedPodcastServices.length > 0 && (
                    <button
                      onClick={() => {
                        if (!isLoggedIn) {
                          setShowAuthModal(true);
                        } else {
                          alert(`Podcast order submitted!\nServices: ${selectedPodcastServices.map(s => s.name).join(', ')}\nTotal: $${calculatePodcastTotal()}`);
                          setSelectedPodcastServices([]);
                        }
                      }}
                      className="w-full mt-4 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-display text-lg tracking-wider hover:shadow-xl hover:shadow-pink-300/50 hover:scale-[1.02] transition-all"
                    >
                      {isLoggedIn ? 'SUBMIT ORDER' : 'SIGN IN TO ORDER'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Other Projects */}
            <div className="mt-12">
              <h3 className="font-display text-2xl tracking-wider text-gray-800 mb-6 text-center">OTHER PROJECTS</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {projects.filter(p => p.tag !== 'PODCAST').map((project, i) => (
                  <div
                    key={i}
                    className="glass-card rounded-2xl p-8 relative group overflow-hidden hover-lift text-center"
                  >
                    <div className="absolute top-3 right-3">
                      <span className="font-sans text-[9px] tracking-wider text-pink-600 bg-pink-100 px-2 py-1 rounded-full font-medium">{project.tag}</span>
                    </div>
                    <div className="text-pink-300 group-hover:text-pink-600 transition-colors duration-300 mb-4 flex justify-center">
                      {project.icon}
                    </div>
                    <h4 className="font-display text-xl tracking-wider text-gray-800 mb-2">{project.title.toUpperCase()}</h4>
                    <p className="font-sans text-gray-500 text-sm leading-relaxed">{project.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Wishlist */}
      {activeSection === 'wishlist' && (
        <section className="min-h-screen p-6 pt-32 relative">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <span className="font-sans text-xs tracking-[0.5em] text-pink-500 font-medium">006</span>
              <h2 className="font-display text-7xl md:text-8xl tracking-wider gradient-text mt-4 glow-text">WISHLIST</h2>
              <p className="font-sans text-sm tracking-[0.3em] text-gray-400 mt-4 uppercase">Spoil The Diva & Earn Points</p>
            </div>
            
            {/* Points Incentive Banner */}
            {isLoggedIn && (
              <div className="mb-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-6 text-center text-white">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Award className="w-8 h-8" />
                  <span className="font-display text-3xl">EARN 25 POINTS</span>
                </div>
                <p className="font-sans text-pink-100">For every gift you send from my wishlist!</p>
              </div>
            )}
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Throne Wishlist */}
              <div className="glass-card-strong rounded-3xl p-8 text-center shadow-xl hover-lift">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Crown className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-display text-3xl tracking-wider gradient-text mb-2">THRONE</h3>
                <p className="font-sans text-gray-500 mb-6">
                  My curated wishlist of designer items, lingerie, and luxury pieces
                </p>
                
                <div className="grid grid-cols-2 gap-3 my-6">
                  {['👠 Heels', '👜 Bags', '💍 Jewelry', '👗 Lingerie'].map((item, i) => (
                    <div key={i} className="bg-white/50 rounded-xl p-3">
                      <span className="font-sans text-sm text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
                
                <a 
                  href="https://throne.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-display tracking-wider hover:shadow-xl hover:scale-105 transition-all"
                >
                  <ExternalLink className="w-5 h-5" />
                  VIEW ON THRONE
                </a>
                
                <p className="font-sans text-xs text-gray-400 mt-4">$50 - $500+ items</p>
              </div>
              
              {/* GoFundMe / Support */}
              <div className="glass-card-strong rounded-3xl p-8 text-center shadow-xl hover-lift">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-display text-3xl tracking-wider text-emerald-600 mb-2">SUPPORT ME</h3>
                <p className="font-sans text-gray-500 mb-6">
                  Help fund my dreams - podcast equipment, travel, and creative projects
                </p>
                
                <div className="bg-emerald-50 rounded-2xl p-4 my-6">
                  <p className="font-sans text-sm text-emerald-700 mb-2">Current Goal:</p>
                  <p className="font-display text-2xl text-emerald-600">Coast to Coast Documentary</p>
                  <div className="w-full bg-emerald-200 rounded-full h-3 mt-3">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full" style={{width: '35%'}}></div>
                  </div>
                  <p className="font-sans text-xs text-emerald-600 mt-2">35% funded</p>
                </div>
                
                <a 
                  href="https://gofundme.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-display tracking-wider hover:shadow-xl hover:scale-105 transition-all"
                >
                  <ExternalLink className="w-5 h-5" />
                  DONATE ON GOFUNDME
                </a>
                
                <p className="font-sans text-xs text-gray-400 mt-4">Every dollar helps! 💖</p>
              </div>
            </div>
            
            {/* Quick Tip / Venmo */}
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              {/* Amazon Wishlist */}
              <div className="glass-card rounded-3xl p-8 text-center">
                <h3 className="font-display text-2xl tracking-wider gradient-text mb-4">AMAZON WISHLIST</h3>
                <p className="font-sans text-gray-500 mb-6">Everyday items, beauty products, and essentials</p>
                <a 
                  href="https://amazon.com/wishlist" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-pink-400 text-pink-600 rounded-full font-sans tracking-wider hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white hover:border-transparent transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  VIEW AMAZON WISHLIST
                </a>
              </div>
              
              {/* Venmo / Cash Tip */}
              <div className="glass-card rounded-3xl p-8 text-center bg-gradient-to-br from-[#008CFF]/10 to-purple-100/50">
                <div className="w-16 h-16 bg-[#008CFF] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💸</span>
                </div>
                <h3 className="font-display text-2xl tracking-wider text-[#008CFF] mb-2">TIP THE DIVA</h3>
                <p className="font-sans text-gray-500 mb-6">Send a cash gift directly - no item needed!</p>
                <a 
                  href="https://venmo.com/taykaybabyxoxo" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-[#008CFF] text-white rounded-full font-sans tracking-wider hover:shadow-xl hover:scale-105 transition-all"
                >
                  <span className="text-lg">💳</span>
                  @taykaybabyxoxo
                </a>
                <p className="font-sans text-xs text-gray-400 mt-4">Venmo • Instant • Appreciated 💖</p>
              </div>
            </div>
            
            {/* Points Info */}
            <div className="mt-8 text-center">
              <p className="font-sans text-sm text-gray-500">
                <Award className="w-4 h-4 inline text-pink-500 mr-1" />
                Send me a gift and earn <strong className="text-pink-600">25 loyalty points</strong> toward exclusive rewards!
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Shop */}
      {activeSection === 'shop' && (
        <section className="min-h-screen p-6 pt-32 relative">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <span className="font-sans text-xs tracking-[0.5em] text-pink-500 font-medium">005</span>
              <h2 className="font-display text-7xl md:text-8xl tracking-wider gradient-text mt-4 glow-text">SHOP</h2>
              <p className="font-sans text-sm tracking-[0.3em] text-gray-400 mt-4 uppercase">Products, Books, Merch & More</p>
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {[
                { id: 'products', label: 'Products', icon: '🛍️' },
                { id: 'clothing', label: 'Merch & Clothing', icon: '👕' },
                { id: 'books', label: 'Books & Ebooks', icon: '📚' },
                { id: 'guides', label: 'Guides & Templates', icon: '📋' },
                { id: 'services', label: 'Services', icon: '💎' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setShopTab(tab.id)}
                  className={`px-5 py-3 rounded-full font-sans text-sm transition-all ${
                    shopTab === tab.id 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg' 
                      : 'bg-white border border-pink-200 text-gray-600 hover:border-pink-400'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
            
            {/* Products Tab */}
            {shopTab === 'products' && (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="glass-card-strong rounded-3xl p-6 md:p-8 shadow-xl">
                    <h3 className="font-display text-2xl tracking-wider gradient-text mb-6">EXCLUSIVE ITEMS</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {shopProducts.map(item => (
                        <button
                          key={item.name}
                          onClick={() => toggleShopItem(item)}
                          className={`p-4 rounded-2xl transition-all duration-300 text-center hover-lift ${
                            selectedShopItems.find(i => i.name === item.name)
                              ? 'bg-gradient-to-br from-pink-100 to-purple-100 border-2 border-pink-400 shadow-lg'
                              : 'bg-white border-2 border-pink-100 hover:border-pink-300'
                          }`}
                        >
                          <span className="text-3xl block mb-2">{item.icon}</span>
                          <span className="font-sans text-sm text-gray-700 block">{item.name}</span>
                          <span className="font-sans text-xs text-gray-500 block">{item.description}</span>
                          <span className="font-display text-xl text-purple-600 block mt-1">${item.price}</span>
                          {selectedShopItems.find(i => i.name === item.name) && (
                            <Check className="w-5 h-5 text-pink-500 mx-auto mt-2" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Cart */}
                <div className="lg:col-span-1">
                  <div className="glass-card-strong rounded-3xl p-6 shadow-xl sticky top-24">
                    <h3 className="font-display text-xl tracking-wider gradient-text mb-6 flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5" /> YOUR CART
                    </h3>
                    {selectedShopItems.length === 0 ? (
                      <div className="text-center py-8">
                        <Gift className="w-12 h-12 text-pink-200 mx-auto mb-3" />
                        <p className="font-sans text-gray-400 text-sm">Your cart is empty</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {selectedShopItems.map(item => (
                            <div key={item.name} className="flex justify-between items-center p-2 bg-white rounded-xl">
                              <span className="font-sans text-sm text-gray-700">{item.icon} {item.name}</span>
                              <div className="flex items-center gap-2">
                                <span className="font-sans text-gray-600">${item.price}</span>
                                <button onClick={() => toggleShopItem(item)} className="text-pink-500 hover:text-pink-700">
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-pink-200 mt-4 pt-4">
                          <div className="flex justify-between mb-4">
                            <span className="font-display text-lg">TOTAL</span>
                            <span className="font-display text-2xl gradient-text">${calculateShopTotal()}</span>
                          </div>
                          <button
                            onClick={() => isLoggedIn ? openComingSoon('Checkout') : setShowAuthModal(true)}
                            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-display tracking-wider hover:shadow-lg transition-all"
                          >
                            {isLoggedIn ? 'CHECKOUT' : 'SIGN IN'}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Merch & Clothing Tab - Shopify */}
            {shopTab === 'clothing' && (
              <div className="animate-slide-up">
                <div className="glass-card-strong rounded-3xl p-8 shadow-xl mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-display text-3xl tracking-wider gradient-text">DIVA COLLECTION</h3>
                      <p className="font-sans text-gray-500 mt-1">Official merch & clothing line</p>
                    </div>
                    <div className="px-4 py-2 bg-green-100 rounded-full">
                      <span className="font-sans text-sm text-green-700">🛒 Powered by Shopify</span>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { name: 'Diva Hoodie', price: 65, icon: '🧥', color: 'Pink/Black', sizes: 'S-XXL' },
                      { name: 'Notorious Tee', price: 35, icon: '👕', color: 'Multiple Colors', sizes: 'XS-XXL' },
                      { name: 'Crown Tank Top', price: 30, icon: '👚', color: 'White/Pink', sizes: 'S-XL' },
                      { name: 'Diva Dad Hat', price: 25, icon: '🧢', color: 'Black/Pink', sizes: 'One Size' },
                      { name: 'Jogger Set', price: 85, icon: '👖', color: 'Pink/Gray', sizes: 'S-XXL' },
                      { name: 'Crop Hoodie', price: 55, icon: '💖', color: 'Pink', sizes: 'XS-L' },
                      { name: 'Socks (3-Pack)', price: 20, icon: '🧦', color: 'Mixed', sizes: 'One Size' },
                      { name: 'Tote Bag', price: 25, icon: '👜', color: 'Canvas', sizes: 'One Size' },
                    ].map((item, i) => (
                      <div key={i} className="bg-white rounded-2xl p-5 border border-pink-100 hover:border-pink-300 hover:shadow-lg transition-all">
                        <div className="aspect-square bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl flex items-center justify-center mb-4">
                          <span className="text-5xl">{item.icon}</span>
                        </div>
                        <h4 className="font-display text-lg text-gray-800">{item.name}</h4>
                        <p className="font-sans text-xs text-gray-500">{item.color} • {item.sizes}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="font-display text-xl gradient-text">${item.price}</span>
                          <a 
                            href="https://shopify.com/taykay" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-xs font-sans hover:shadow-lg transition-all"
                          >
                            VIEW
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 text-center">
                    <a 
                      href="https://shopify.com/taykay" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-display tracking-wider hover:shadow-xl hover:scale-105 transition-all"
                    >
                      <span className="text-xl">🛍️</span>
                      SHOP ALL ON SHOPIFY
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                
                {/* Tell All Book - Shopify */}
                <div className="glass-card rounded-3xl p-8 shadow-xl bg-gradient-to-br from-pink-50 to-purple-50">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-48 h-64 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                      <div className="text-center text-white p-4">
                        <span className="text-4xl mb-2 block">📖</span>
                        <span className="font-display text-lg">THE NOTORIOUS DIVA</span>
                        <p className="font-serif text-xs italic mt-1">Tell-All Book</p>
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <span className="px-3 py-1 bg-pink-500 text-white text-xs font-sans rounded-full">PRE-ORDER NOW</span>
                      <h3 className="font-display text-4xl tracking-wider gradient-text mt-3">THE NOTORIOUS DIVA</h3>
                      <p className="font-serif text-lg italic text-gray-500">The Tell-All Book</p>
                      <p className="font-sans text-gray-600 mt-3">Raw, unfiltered stories from my journey. The highs, the lows, and everything in between. Limited first edition with exclusive bonus content.</p>
                      <div className="flex flex-wrap gap-4 mt-6">
                        <a 
                          href="https://shopify.com/taykay/tell-all-book" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-display tracking-wider hover:shadow-xl hover:scale-105 transition-all"
                        >
                          📚 PRE-ORDER PHYSICAL BOOK - $29.99
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Books & Ebooks Tab - Amazon Kindle */}
            {shopTab === 'books' && (
              <div className="animate-slide-up">
                <div className="glass-card-strong rounded-3xl p-8 shadow-xl">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="font-display text-3xl tracking-wider gradient-text">EBOOKS & DIGITAL BOOKS</h3>
                      <p className="font-sans text-gray-500 mt-1">Available on all your devices</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-3 py-2 bg-orange-100 rounded-full font-sans text-xs text-orange-700">🔥 Amazon Kindle</span>
                      <span className="px-3 py-2 bg-green-100 rounded-full font-sans text-xs text-green-700">📱 Google Play</span>
                    </div>
                  </div>
                  
                  {/* Featured Ebook Series */}
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 mb-8 border-2 border-emerald-200">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="w-32 h-44 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-xl">
                        <span className="text-5xl">📚</span>
                      </div>
                      <div className="flex-1">
                        <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-sans rounded-full">EBOOK SERIES</span>
                        <h4 className="font-display text-2xl tracking-wider text-emerald-800 mt-2">SURVIVAL GUIDE FOR THE NOTORIOUS & ENVIED</h4>
                        <p className="font-sans text-gray-600 mt-2">Everything they don't teach you about navigating life when you're the one everyone's watching.</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          <a href="https://amazon.com/kindle/survival-guide-vol1" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-sans hover:bg-orange-600">📖 Vol 1: The Mindset - $9.99</a>
                          <a href="https://amazon.com/kindle/survival-guide-vol2" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-sans hover:bg-orange-600">📖 Vol 2: The Hustle - $9.99</a>
                          <a href="https://amazon.com/kindle/survival-guide-vol3" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-sans hover:bg-orange-600">📖 Vol 3: The Lifestyle - $9.99</a>
                          <a href="https://amazon.com/kindle/survival-guide-bundle" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full text-sm font-sans hover:shadow-lg">🎁 BUNDLE ALL 3 - $24.99</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Other Ebooks */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { title: 'The Notorious Diva', subtitle: 'Tell-All Ebook', price: 14.99, icon: '📖', platform: 'Kindle', link: 'https://amazon.com/kindle/notorious-diva' },
                      { title: 'Building Your Brand', subtitle: 'Creator\'s Guide', price: 12.99, icon: '💫', platform: 'Kindle', link: 'https://amazon.com/kindle/building-brand' },
                      { title: 'Confidence Code', subtitle: 'Inner Diva Workbook', price: 9.99, icon: '💪', platform: 'Kindle', link: 'https://amazon.com/kindle/confidence-code' },
                      { title: 'Social Media Secrets', subtitle: 'Grow Your Following', price: 11.99, icon: '📱', platform: 'Google Play', link: 'https://play.google.com/social-secrets' },
                      { title: 'Self-Care Sunday', subtitle: 'Wellness Journal', price: 7.99, icon: '🧘', platform: 'Kindle', link: 'https://amazon.com/kindle/self-care' },
                      { title: 'Money Moves', subtitle: 'Financial Freedom', price: 14.99, icon: '💰', platform: 'Kindle', link: 'https://amazon.com/kindle/money-moves' },
                    ].map((book, i) => (
                      <div key={i} className="bg-white rounded-2xl p-5 border border-pink-100 hover:border-pink-300 hover:shadow-lg transition-all">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-20 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center">
                            <span className="text-3xl">{book.icon}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-display text-lg text-gray-800">{book.title}</h4>
                            <p className="font-sans text-xs text-gray-500">{book.subtitle}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="font-display text-xl gradient-text">${book.price}</span>
                              <span className="text-xs text-gray-400">• {book.platform}</span>
                            </div>
                          </div>
                        </div>
                        <a 
                          href={book.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="mt-4 w-full py-2 bg-orange-500 text-white rounded-full text-sm font-sans hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
                        >
                          GET ON {book.platform.toUpperCase()} <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Guides & Templates Tab - Etsy */}
            {shopTab === 'guides' && (
              <div className="animate-slide-up">
                <div className="glass-card-strong rounded-3xl p-8 shadow-xl">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="font-display text-3xl tracking-wider gradient-text">GUIDES & TEMPLATES</h3>
                      <p className="font-sans text-gray-500 mt-1">Printable downloads & digital resources</p>
                    </div>
                    <div className="px-4 py-2 bg-orange-100 rounded-full">
                      <span className="font-sans text-sm text-orange-700">🛒 Available on Etsy</span>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { title: 'Content Calendar Template', desc: 'Plan your posts like a pro', price: 12.99, icon: '📅', downloads: 847 },
                      { title: 'Brand Kit Template', desc: 'Complete branding package', price: 24.99, icon: '🎨', downloads: 523 },
                      { title: 'Social Media Checklist', desc: 'Daily posting routine', price: 7.99, icon: '✅', downloads: 1203 },
                      { title: 'Rate Card Template', desc: 'Professional pricing guide', price: 14.99, icon: '💰', downloads: 689 },
                      { title: 'Media Kit Template', desc: 'Impress brands & sponsors', price: 19.99, icon: '📊', downloads: 412 },
                      { title: 'Goal Setting Workbook', desc: '90-day planner', price: 9.99, icon: '🎯', downloads: 956 },
                      { title: 'Photoshoot Planner', desc: 'Plan perfect shoots', price: 11.99, icon: '📸', downloads: 334 },
                      { title: 'DM Script Templates', desc: 'Professional outreach', price: 8.99, icon: '💬', downloads: 1567 },
                      { title: 'Budget Tracker', desc: 'Financial planning sheets', price: 6.99, icon: '📈', downloads: 789 },
                    ].map((item, i) => (
                      <div key={i} className="bg-white rounded-2xl p-5 border border-orange-100 hover:border-orange-300 hover:shadow-lg transition-all">
                        <div className="flex items-start justify-between">
                          <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">{item.icon}</span>
                          </div>
                          <span className="text-xs text-gray-400">{item.downloads} sold</span>
                        </div>
                        <h4 className="font-display text-lg text-gray-800 mt-3">{item.title}</h4>
                        <p className="font-sans text-xs text-gray-500">{item.desc}</p>
                        <div className="flex items-center justify-between mt-4">
                          <span className="font-display text-xl text-orange-600">${item.price}</span>
                          <a 
                            href="https://etsy.com/shop/taykay" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-orange-500 text-white rounded-full text-xs font-sans hover:bg-orange-600 transition-all"
                          >
                            VIEW ON ETSY
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 text-center">
                    <a 
                      href="https://etsy.com/shop/taykay" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-display tracking-wider hover:shadow-xl hover:scale-105 transition-all"
                    >
                      <span className="text-xl">🛒</span>
                      VISIT MY ETSY SHOP
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            )}
            
            {/* Services Tab */}
            {shopTab === 'services' && (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="glass-card-strong rounded-3xl p-6 md:p-8 shadow-xl">
                    <h3 className="font-display text-2xl tracking-wider gradient-text mb-6">SPECIAL SERVICES</h3>
                    <div className="space-y-3">
                      {shopServices.map(service => (
                        <button
                          key={service.name}
                          onClick={() => toggleShopItem(service)}
                          className={`w-full p-4 rounded-2xl transition-all duration-300 flex justify-between items-center ${
                            selectedShopItems.find(i => i.name === service.name)
                              ? 'bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-pink-400'
                              : 'bg-white border-2 border-pink-100 hover:border-pink-300'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-2xl">{service.icon}</span>
                            <span className="font-sans text-gray-700">{service.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-display text-xl text-purple-600">${service.price}</span>
                            {selectedShopItems.find(i => i.name === service.name) && (
                              <Check className="w-5 h-5 text-pink-500" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Cart */}
                <div className="lg:col-span-1">
                  <div className="glass-card-strong rounded-3xl p-6 shadow-xl sticky top-24">
                    <h3 className="font-display text-xl tracking-wider gradient-text mb-6 flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5" /> YOUR CART
                    </h3>
                    {selectedShopItems.length === 0 ? (
                      <div className="text-center py-8">
                        <Gift className="w-12 h-12 text-pink-200 mx-auto mb-3" />
                        <p className="font-sans text-gray-400 text-sm">Your cart is empty</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {selectedShopItems.map(item => (
                            <div key={item.name} className="flex justify-between items-center p-2 bg-white rounded-xl">
                              <span className="font-sans text-sm text-gray-700">{item.icon} {item.name}</span>
                              <div className="flex items-center gap-2">
                                <span className="font-sans text-gray-600">${item.price}</span>
                                <button onClick={() => toggleShopItem(item)} className="text-pink-500 hover:text-pink-700">
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-pink-200 mt-4 pt-4">
                          <div className="flex justify-between mb-4">
                            <span className="font-display text-lg">TOTAL</span>
                            <span className="font-display text-2xl gradient-text">${calculateShopTotal()}</span>
                          </div>
                          <button
                            onClick={() => isLoggedIn ? openComingSoon('Checkout') : setShowAuthModal(true)}
                            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-display tracking-wider hover:shadow-lg transition-all"
                          >
                            {isLoggedIn ? 'CHECKOUT' : 'SIGN IN'}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Rewards */}
      {activeSection === 'rewards' && (
        <section className="min-h-screen p-6 pt-32 relative">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <span className="font-sans text-xs tracking-[0.5em] text-pink-500 font-medium">009</span>
              <h2 className="font-display text-7xl md:text-8xl tracking-wider gradient-text mt-4 glow-text">REWARDS</h2>
              <p className="font-sans text-sm tracking-[0.3em] text-gray-400 mt-4 uppercase">Loyalty Program</p>
            </div>
            
            {/* Current Points Display */}
            <div className="glass-card-strong rounded-3xl p-8 md:p-12 text-center shadow-xl mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-12 h-12 text-white" />
              </div>
              {isLoggedIn ? (
                <>
                  <h3 className="font-display text-2xl text-gray-600 mb-2">YOUR BALANCE</h3>
                  <p className="font-display text-7xl gradient-text mb-4">{userPoints}</p>
                  <p className="font-sans text-gray-500">Loyalty Points</p>
                </>
              ) : (
                <>
                  <h3 className="font-display text-2xl text-gray-600 mb-4">JOIN TO START EARNING</h3>
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-display tracking-wider hover:shadow-xl hover:scale-105 transition-all"
                  >
                    SIGN UP NOW
                  </button>
                  <p className="font-sans text-sm text-gray-400 mt-4">Get 50 bonus points when you join!</p>
                </>
              )}
            </div>
            
            {/* How to Earn */}
            <div className="glass-card rounded-3xl p-8 mb-8">
              <h3 className="font-display text-2xl tracking-wider gradient-text mb-6 text-center">HOW TO EARN POINTS</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { points: '+50', action: 'Sign Up Bonus', icon: '🎉' },
                  { points: '+10', action: 'Per $100 Booking', icon: '📅' },
                  { points: '+25', action: 'Wishlist Gift', icon: '🎁' },
                  { points: '+5', action: 'Shop Purchase', icon: '🛍️' },
                  { points: '+15', action: 'Referral', icon: '👯' },
                  { points: '+10', action: 'Social Share', icon: '📱' },
                  { points: '+20', action: 'Review/Testimonial', icon: '⭐' },
                  { points: '+100', action: 'VIP Event', icon: '👑' }
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 text-center border border-pink-100 hover:border-pink-300 transition-colors">
                    <span className="text-2xl block mb-2">{item.icon}</span>
                    <span className="font-display text-xl text-pink-600 block">{item.points}</span>
                    <span className="font-sans text-xs text-gray-500">{item.action}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Rewards Tiers */}
            <div className="glass-card rounded-3xl p-8 mb-8">
              <h3 className="font-display text-2xl tracking-wider gradient-text mb-6 text-center">REWARD TIERS</h3>
              <div className="space-y-4">
                {[
                  { tier: 'BRONZE', points: '100 pts', reward: '5% off next booking', color: 'from-amber-600 to-amber-400', achieved: userPoints >= 100 },
                  { tier: 'SILVER', points: '250 pts', reward: 'Priority booking access', color: 'from-gray-400 to-gray-300', achieved: userPoints >= 250 },
                  { tier: 'GOLD', points: '500 pts', reward: 'Free 30-min session add-on', color: 'from-yellow-500 to-yellow-300', achieved: userPoints >= 500 },
                  { tier: 'PLATINUM', points: '1000 pts', reward: 'VIP status + exclusive content', color: 'from-purple-500 to-pink-400', achieved: userPoints >= 1000 },
                  { tier: 'DIAMOND', points: '2500 pts', reward: 'Free session + lifetime VIP', color: 'from-cyan-400 to-blue-400', achieved: userPoints >= 2500 }
                ].map((tier, i) => (
                  <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${tier.achieved ? 'border-pink-400 bg-pink-50' : 'border-gray-100 bg-white'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tier.color} flex items-center justify-center`}>
                        {tier.achieved ? <Check className="w-6 h-6 text-white" /> : <Award className="w-6 h-6 text-white/70" />}
                      </div>
                      <div>
                        <h4 className="font-display text-lg tracking-wider text-gray-800">{tier.tier}</h4>
                        <p className="font-sans text-sm text-gray-500">{tier.reward}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`font-display text-xl ${tier.achieved ? 'text-pink-600' : 'text-gray-400'}`}>{tier.points}</span>
                      {tier.achieved && <p className="font-sans text-xs text-green-600">Unlocked!</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Redeem Points - Specific Rewards */}
            <div className="glass-card-strong rounded-3xl p-8 shadow-xl">
              <h3 className="font-display text-3xl tracking-wider gradient-text mb-2 text-center">REDEEM YOUR POINTS</h3>
              <p className="font-sans text-gray-500 mb-8 text-center">Use your hard-earned points for exclusive experiences</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: 'FaceTime Show', points: 1600, icon: '📱', description: 'Private 15-min video call experience', color: 'from-pink-500 to-rose-500' },
                  { name: 'Dinner Date', points: 1500, icon: '🍽️', description: 'Join me for an intimate dinner', color: 'from-purple-500 to-pink-500' },
                  { name: 'Personalized Photoshoot', points: 2500, icon: '📸', description: 'Custom photoshoot just for you', color: 'from-violet-500 to-purple-500' },
                  { name: 'Custom Video Request', points: 3500, icon: '🎬', description: 'Personalized video made for you', color: 'from-fuchsia-500 to-pink-500' },
                  { name: 'Gaming Session', points: 1200, icon: '🎮', description: '1-hour gaming date online', color: 'from-indigo-500 to-purple-500' },
                  { name: 'Voice Call', points: 800, icon: '📞', description: '30-min private phone call', color: 'from-rose-500 to-pink-500' },
                  { name: 'Exclusive Content Bundle', points: 1000, icon: '🔥', description: 'Unreleased photos & videos', color: 'from-orange-500 to-red-500' },
                  { name: 'Signed Polaroid', points: 500, icon: '🖼️', description: 'Personalized signed photo mailed to you', color: 'from-amber-500 to-orange-500' },
                  { name: 'Birthday Shoutout Video', points: 600, icon: '🎂', description: 'Custom birthday message video', color: 'from-pink-400 to-rose-400' },
                  { name: 'Priority Booking', points: 400, icon: '⚡', description: 'Skip the line for 1 booking', color: 'from-cyan-500 to-blue-500' },
                  { name: 'Merch Discount (25%)', points: 300, icon: '👕', description: '25% off any shop item', color: 'from-green-500 to-emerald-500' },
                  { name: 'Name in Credits', points: 2000, icon: '⭐', description: 'Featured in podcast/video credits', color: 'from-yellow-500 to-amber-500' },
                ].map((reward, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 border border-pink-100 hover:border-pink-300 hover:shadow-lg transition-all group">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${reward.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <span className="text-2xl">{reward.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-display text-lg tracking-wider text-gray-800">{reward.name}</h4>
                        <p className="font-sans text-xs text-gray-500 mb-2">{reward.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Award className="w-4 h-4 text-pink-500" />
                            <span className="font-display text-lg text-pink-600">{reward.points.toLocaleString()}</span>
                            <span className="font-sans text-xs text-gray-400">pts</span>
                          </div>
                          {isLoggedIn && (
                            <button
                              onClick={() => {
                                if (userPoints >= reward.points) {
                                  alert(`🎉 Redeeming: ${reward.name}\n\nYou'll receive a confirmation email shortly!`);
                                  setUserPoints(prev => prev - reward.points);
                                } else {
                                  alert(`You need ${reward.points - userPoints} more points to redeem this reward!`);
                                }
                              }}
                              className={`px-4 py-1.5 rounded-full font-sans text-xs transition-all ${
                                userPoints >= reward.points 
                                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg' 
                                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              {userPoints >= reward.points ? 'REDEEM' : 'LOCKED'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {!isLoggedIn && (
                <div className="mt-8 text-center">
                  <p className="font-sans text-gray-500 mb-4">Sign in to start redeeming rewards!</p>
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-display tracking-wider hover:shadow-xl hover:scale-105 transition-all"
                  >
                    SIGN IN TO REDEEM
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Projects */}
      {activeSection === 'projects' && (
        <section className="min-h-screen p-6 pt-32 relative">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <span className="font-sans text-xs tracking-[0.5em] text-pink-500 font-medium">008</span>
              <h2 className="font-display text-7xl md:text-8xl tracking-wider gradient-text mt-4 glow-text">PROJECTS</h2>
              <p className="font-sans text-sm tracking-[0.3em] text-gray-400 mt-4 uppercase">What I'm Working On</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Ebook Series - Survival Guide */}
              <div className="glass-card-strong rounded-3xl p-8 shadow-xl hover-lift md:col-span-2 border-2 border-pink-300">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl">📚</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-sans text-[10px] tracking-wider text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">EBOOK SERIES</span>
                      <span className="font-sans text-[10px] tracking-wider text-pink-600 bg-pink-100 px-3 py-1 rounded-full">NEW</span>
                    </div>
                    <h3 className="font-display text-3xl tracking-wider gradient-text mt-2">SURVIVAL GUIDE FOR THE NOTORIOUS & ENVIED</h3>
                    <p className="font-serif italic text-gray-500 text-lg">The Ultimate Playbook for Rising Above</p>
                    <p className="font-sans text-sm text-gray-600 mt-3 leading-relaxed">
                      Everything they don't teach you about navigating life when you're the one everyone's watching. From handling haters to building your empire, this series covers it all - relationships, money moves, self-care, and the mindset you need to thrive while being envied.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="px-3 py-1 bg-white border border-emerald-200 rounded-full text-xs text-emerald-700">Vol 1: The Mindset</span>
                      <span className="px-3 py-1 bg-white border border-emerald-200 rounded-full text-xs text-emerald-700">Vol 2: The Hustle</span>
                      <span className="px-3 py-1 bg-white border border-emerald-200 rounded-full text-xs text-emerald-700">Vol 3: The Lifestyle</span>
                    </div>
                    <button 
                      onClick={() => openComingSoon('Ebook Series')}
                      className="mt-6 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-sans tracking-wider hover:shadow-xl hover:scale-105 transition-all"
                    >
                      GET NOTIFIED ON RELEASE
                    </button>
                  </div>
                </div>
              </div>
              
              {/* The Notorious Diva Book */}
              <div className="glass-card-strong rounded-3xl p-8 shadow-xl hover-lift">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">📖</span>
                  </div>
                  <div>
                    <span className="font-sans text-[10px] tracking-wider text-pink-600 bg-pink-100 px-3 py-1 rounded-full">BOOK</span>
                    <h3 className="font-display text-2xl tracking-wider gradient-text mt-2">THE NOTORIOUS DIVA</h3>
                    <p className="font-serif italic text-gray-500">Tell-All Memoir</p>
                    <p className="font-sans text-sm text-gray-600 mt-3">Raw, unfiltered stories from my journey. The highs, the lows, and everything in between.</p>
                    <button 
                      onClick={() => openComingSoon('Book Pre-Order')}
                      className="mt-4 px-6 py-2 border-2 border-pink-400 text-pink-600 rounded-full font-sans text-sm hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-all"
                    >
                      PRE-ORDER SOON
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Documentary */}
              <div className="glass-card-strong rounded-3xl p-8 shadow-xl hover-lift">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">🎬</span>
                  </div>
                  <div>
                    <span className="font-sans text-[10px] tracking-wider text-purple-600 bg-purple-100 px-3 py-1 rounded-full">FILM</span>
                    <h3 className="font-display text-2xl tracking-wider gradient-text mt-2">COAST TO COAST</h3>
                    <p className="font-serif italic text-gray-500">Documentary</p>
                    <p className="font-sans text-sm text-gray-600 mt-3">Following my journey across America. Real stories, real people, real experiences.</p>
                    <button 
                      onClick={() => openComingSoon('Documentary Updates')}
                      className="mt-4 px-6 py-2 border-2 border-purple-400 text-purple-600 rounded-full font-sans text-sm hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-all"
                    >
                      GET UPDATES
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Podcast */}
              <div className="glass-card-strong rounded-3xl p-8 shadow-xl hover-lift">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Mic className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <span className="font-sans text-[10px] tracking-wider text-rose-600 bg-rose-100 px-3 py-1 rounded-full">PODCAST</span>
                    <h3 className="font-display text-2xl tracking-wider gradient-text mt-2">THE NOTORIOUS DIVA SHOW</h3>
                    <p className="font-serif italic text-gray-500">Weekly Podcast</p>
                    <p className="font-sans text-sm text-gray-600 mt-3">Real talk, bold opinions, and unfiltered conversations about life, modeling, and more.</p>
                    <button 
                      onClick={() => setActiveSection('podcast')}
                      className="mt-4 px-6 py-2 border-2 border-rose-400 text-rose-600 rounded-full font-sans text-sm hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all"
                    >
                      LEARN MORE
                    </button>
                  </div>
                </div>
              </div>
              
              {/* AI Chatbot */}
              <div className="glass-card-strong rounded-3xl p-8 shadow-xl hover-lift">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <span className="font-sans text-[10px] tracking-wider text-violet-600 bg-violet-100 px-3 py-1 rounded-full">AI</span>
                    <h3 className="font-display text-2xl tracking-wider gradient-text mt-2">DIVA AI CHATBOT</h3>
                    <p className="font-serif italic text-gray-500">24/7 Companion</p>
                    <p className="font-sans text-sm text-gray-600 mt-3">When I'm away, you can still play. Real responses, photos, videos, and more.</p>
                    <button 
                      onClick={() => openComingSoon('AI Chatbot')}
                      className="mt-4 px-6 py-2 border-2 border-violet-400 text-violet-600 rounded-full font-sans text-sm hover:bg-violet-500 hover:text-white hover:border-violet-500 transition-all"
                    >
                      COMING SOON
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Collaborations */}
              <div className="glass-card-strong rounded-3xl p-8 shadow-xl hover-lift">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">🤝</span>
                  </div>
                  <div>
                    <span className="font-sans text-[10px] tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full">COLLAB</span>
                    <h3 className="font-display text-2xl tracking-wider gradient-text mt-2">COLLABORATIONS</h3>
                    <p className="font-serif italic text-gray-500">Brand Partnerships</p>
                    <p className="font-sans text-sm text-gray-600 mt-3">Working with amazing brands and creators. Interested in collaborating? Let's talk!</p>
                    <button 
                      onClick={() => setActiveSection('contact')}
                      className="mt-4 px-6 py-2 border-2 border-amber-400 text-amber-600 rounded-full font-sans text-sm hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all"
                    >
                      CONTACT ME
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Merch */}
              <div className="glass-card-strong rounded-3xl p-8 shadow-xl hover-lift">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-fuchsia-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">👑</span>
                  </div>
                  <div>
                    <span className="font-sans text-[10px] tracking-wider text-fuchsia-600 bg-fuchsia-100 px-3 py-1 rounded-full">MERCH</span>
                    <h3 className="font-display text-2xl tracking-wider gradient-text mt-2">DIVA COLLECTION</h3>
                    <p className="font-serif italic text-gray-500">Official Merch</p>
                    <p className="font-sans text-sm text-gray-600 mt-3">Rep the Diva lifestyle. Hoodies, tees, accessories, and exclusive drops.</p>
                    <button 
                      onClick={() => setActiveSection('shop')}
                      className="mt-4 px-6 py-2 border-2 border-fuchsia-400 text-fuchsia-600 rounded-full font-sans text-sm hover:bg-fuchsia-500 hover:text-white hover:border-fuchsia-500 transition-all"
                    >
                      SHOP NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* SUGGESTIONS SECTION */}
            <div className="mt-12">
              <div className="glass-card-strong rounded-3xl p-8 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-display text-3xl tracking-wider gradient-text">SUGGESTIONS</h3>
                    <p className="font-sans text-sm text-gray-500 mt-1">Share your ideas & earn 15 reward points!</p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
                    <Award className="w-4 h-4 text-green-600" />
                    <span className="font-sans text-sm text-green-700 font-medium">+15 pts per suggestion</span>
                  </div>
                </div>
                
                {/* Submit Suggestion Form */}
                {isLoggedIn ? (
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 mb-8">
                    <h4 className="font-display text-lg tracking-wider text-gray-700 mb-4">SHARE YOUR IDEA</h4>
                    <textarea
                      value={newSuggestion}
                      onChange={(e) => setNewSuggestion(e.target.value)}
                      placeholder="What content would you like to see? What would make your experience better?"
                      className="w-full p-4 rounded-xl border-2 border-pink-200 focus:border-pink-500 focus:outline-none font-sans text-sm resize-none"
                      rows={3}
                    />
                    
                    {/* Suggestion Type Toggle */}
                    <div className="flex items-center gap-4 mt-4">
                      <span className="font-sans text-sm text-gray-600">Post as:</span>
                      <button
                        onClick={() => setSuggestionType('public')}
                        className={`px-4 py-2 rounded-full font-sans text-sm transition-all ${
                          suggestionType === 'public' 
                            ? 'bg-pink-500 text-white' 
                            : 'bg-white border border-pink-200 text-gray-600'
                        }`}
                      >
                        🌐 Public
                      </button>
                      <button
                        onClick={() => setSuggestionType('private')}
                        className={`px-4 py-2 rounded-full font-sans text-sm transition-all ${
                          suggestionType === 'private' 
                            ? 'bg-purple-500 text-white' 
                            : 'bg-white border border-purple-200 text-gray-600'
                        }`}
                      >
                        🔒 Private (only Tay Kay sees)
                      </button>
                    </div>
                    
                    {/* Screenshot Upload for Website Shares */}
                    <div className="mt-4 p-4 bg-white rounded-xl border-2 border-dashed border-pink-200">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                          <Camera className="w-6 h-6 text-pink-500" />
                        </div>
                        <div className="flex-1">
                          <p className="font-sans text-sm font-medium text-gray-700">Share My Website & Earn Extra Points!</p>
                          <p className="font-sans text-xs text-gray-500">Upload a screenshot of you sharing taykay.xxx to earn +25 bonus points</p>
                        </div>
                        <label className="px-4 py-2 bg-pink-100 text-pink-600 rounded-full font-sans text-sm cursor-pointer hover:bg-pink-200 transition-all">
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files[0]) {
                                setSuggestionScreenshot(e.target.files[0].name);
                              }
                            }}
                          />
                          UPLOAD SCREENSHOT
                        </label>
                      </div>
                      {suggestionScreenshot && (
                        <div className="mt-3 flex items-center gap-2 text-green-600">
                          <Check className="w-4 h-4" />
                          <span className="font-sans text-sm">{suggestionScreenshot} uploaded - +25 bonus points!</span>
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={() => {
                        if (newSuggestion.trim()) {
                          const basePoints = 15;
                          const bonusPoints = suggestionScreenshot ? 25 : 0;
                          const totalPoints = basePoints + bonusPoints;
                          
                          setSuggestions(prev => [{
                            id: `s${Date.now()}`,
                            user: userName,
                            type: suggestionType,
                            content: newSuggestion,
                            date: new Date().toISOString().split('T')[0],
                            likes: 0,
                            screenshot: suggestionScreenshot
                          }, ...prev]);
                          
                          addPoints(totalPoints, 'Suggestion submitted');
                          setNewSuggestion('');
                          setSuggestionScreenshot(null);
                          alert(`🎉 Thanks for your suggestion! You earned ${totalPoints} points!`);
                        }
                      }}
                      disabled={!newSuggestion.trim()}
                      className={`mt-4 w-full py-3 rounded-full font-display tracking-wider transition-all ${
                        newSuggestion.trim()
                          ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      SUBMIT SUGGESTION (+{15 + (suggestionScreenshot ? 25 : 0)} PTS)
                    </button>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8 mb-8 text-center">
                    <p className="font-sans text-gray-600 mb-4">Sign in to share your suggestions and earn reward points!</p>
                    <button
                      onClick={() => setShowAuthModal(true)}
                      className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-sans"
                    >
                      SIGN IN TO SUGGEST
                    </button>
                  </div>
                )}
                
                {/* Public Suggestions Feed */}
                <div>
                  <h4 className="font-display text-xl tracking-wider text-gray-700 mb-4">COMMUNITY IDEAS</h4>
                  <div className="space-y-4">
                    {suggestions.filter(s => s.type === 'public').map((suggestion, i) => (
                      <div key={i} className="bg-white rounded-2xl p-5 border border-pink-100 hover:border-pink-300 transition-all">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <span className="font-sans text-sm font-medium text-gray-700">{suggestion.user}</span>
                              <span className="font-sans text-xs text-gray-400 ml-2">{suggestion.date}</span>
                              {suggestion.screenshot && (
                                <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">📷 Shared Website</span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setSuggestions(prev => prev.map(s => 
                                s.id === suggestion.id ? {...s, likes: s.likes + 1} : s
                              ));
                            }}
                            className="flex items-center gap-1 px-3 py-1 rounded-full bg-pink-50 hover:bg-pink-100 transition-all"
                          >
                            <Heart className="w-4 h-4 text-pink-500" />
                            <span className="font-sans text-sm text-pink-600">{suggestion.likes}</span>
                          </button>
                        </div>
                        <p className="font-sans text-gray-600 mt-3 pl-13">{suggestion.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Rewards */}
      {activeSection === 'rewards' && (
        <section className="min-h-screen p-6 pt-32 relative">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <span className="font-sans text-xs tracking-[0.5em] text-pink-500 font-medium">009</span>
              <h2 className="font-display text-7xl md:text-8xl tracking-wider gradient-text mt-4 glow-text">REWARDS</h2>
              <p className="font-sans text-sm tracking-[0.3em] text-gray-400 mt-4 uppercase">Diva Loyalty Program</p>
            </div>
            
            {/* Points Display for Logged In Users */}
            {isLoggedIn && (
              <div className="glass-card-strong rounded-3xl p-8 mb-8 text-center shadow-xl">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Award className="w-10 h-10 text-pink-500" />
                  <span className="font-display text-6xl gradient-text">{userPoints}</span>
                </div>
                <p className="font-sans text-gray-500">Your Current Points</p>
                <div className="mt-4 flex justify-center gap-4">
                  <button 
                    onClick={() => setActiveSection('booking')}
                    className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-sans text-sm"
                  >
                    Earn More Points
                  </button>
                  <button 
                    onClick={() => openComingSoon('Redeem Rewards')}
                    className="px-6 py-2 border-2 border-pink-400 text-pink-600 rounded-full font-sans text-sm hover:bg-pink-500 hover:text-white transition-all"
                  >
                    Redeem Points
                  </button>
                </div>
              </div>
            )}
            
            {/* How to Earn */}
            <div className="glass-card rounded-3xl p-8 mb-8">
              <h3 className="font-display text-3xl tracking-wider gradient-text mb-6 text-center">HOW TO EARN POINTS</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { points: '10 pts', action: 'Per $100 Booking', icon: '📅', color: 'pink' },
                  { points: '25 pts', action: 'Per Wishlist Gift', icon: '🎁', color: 'purple' },
                  { points: '5 pts', action: 'Per Shop Purchase', icon: '🛍️', color: 'rose' },
                  { points: '50 pts', action: 'New Member Bonus', icon: '⭐', color: 'amber' },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-pink-100">
                    <span className="text-4xl mb-3 block">{item.icon}</span>
                    <span className="font-display text-2xl text-pink-600 block">{item.points}</span>
                    <span className="font-sans text-sm text-gray-500">{item.action}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Reward Tiers */}
            <div className="glass-card rounded-3xl p-8 mb-8">
              <h3 className="font-display text-3xl tracking-wider gradient-text mb-6 text-center">REWARD TIERS</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Bronze */}
                <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-6 text-center border-2 border-amber-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🥉</span>
                  </div>
                  <h4 className="font-display text-2xl text-amber-700">BRONZE</h4>
                  <p className="font-sans text-sm text-amber-600 mb-4">100 - 249 Points</p>
                  <ul className="font-sans text-sm text-amber-800 space-y-2 text-left">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4" /> 5% off bookings</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Early access to content</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Member-only updates</li>
                  </ul>
                </div>
                
                {/* Silver */}
                <div className="bg-gradient-to-br from-gray-100 to-slate-200 rounded-2xl p-6 text-center border-2 border-gray-400">
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-slate-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🥈</span>
                  </div>
                  <h4 className="font-display text-2xl text-gray-700">SILVER</h4>
                  <p className="font-sans text-sm text-gray-600 mb-4">250 - 499 Points</p>
                  <ul className="font-sans text-sm text-gray-800 space-y-2 text-left">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4" /> 10% off bookings</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Priority scheduling</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Free digital content</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Birthday surprise</li>
                  </ul>
                </div>
                
                {/* Gold */}
                <div className="bg-gradient-to-br from-yellow-100 to-amber-200 rounded-2xl p-6 text-center border-2 border-yellow-500 shadow-lg">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🥇</span>
                  </div>
                  <h4 className="font-display text-2xl text-amber-800">GOLD VIP</h4>
                  <p className="font-sans text-sm text-amber-700 mb-4">500+ Points</p>
                  <ul className="font-sans text-sm text-amber-900 space-y-2 text-left">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4" /> 15% off everything</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4" /> VIP priority access</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Exclusive content</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Personal shoutouts</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Free merchandise</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Not Logged In CTA */}
            {!isLoggedIn && (
              <div className="text-center mt-8">
                <p className="font-sans text-gray-500 mb-4">Join the Diva's inner circle to start earning rewards!</p>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-display text-lg tracking-wider hover:shadow-2xl hover:scale-105 transition-all"
                >
                  SIGN UP & GET 50 BONUS POINTS
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Contact */}
      {activeSection === 'contact' && (
        <section className="min-h-screen flex items-center justify-center p-6 pt-32 relative">
          <div className="max-w-2xl w-full">
            <div className="mb-12 text-center">
              <span className="font-sans text-xs tracking-[0.5em] text-pink-500 font-medium">010</span>
              <h2 className="font-display text-7xl md:text-8xl tracking-wider gradient-text mt-4 glow-text">CONTACT</h2>
            </div>
            
            <div className="glass-card-strong rounded-3xl p-12 md:p-16 shadow-xl shadow-pink-100/50 relative">
              <div className="space-y-8 text-center">
                <p className="font-serif text-xl italic text-gray-500 mb-10">
                  For bookings, collaborations, and inquiries
                </p>
                
                <a href="tel:+12183550792" className="flex items-center justify-center gap-4 text-xl group py-4 border-b border-pink-100 hover:border-pink-300 transition-all">
                  <Phone className="w-6 h-6 text-pink-500" />
                  <span className="font-sans text-gray-600 group-hover:text-pink-600 transition-colors">(218) 355-0792</span>
                </a>
                
                <a href="sms:+12183550792" className="flex items-center justify-center gap-4 text-xl group py-4 border-b border-pink-100 hover:border-pink-300 transition-all">
                  <MessageCircle className="w-6 h-6 text-pink-500" />
                  <span className="font-sans text-gray-600 group-hover:text-pink-600 transition-colors">Text Me</span>
                </a>
                
                <a href="mailto:contact@taykay.xxx" className="flex items-center justify-center gap-4 text-xl group py-4">
                  <Mail className="w-6 h-6 text-pink-500" />
                  <span className="font-sans text-gray-600 group-hover:text-pink-600 transition-colors">contact@taykay.xxx</span>
                </a>
                
                <div className="pt-8">
                  <p className="font-sans text-xs tracking-[0.3em] text-gray-400 mb-6 uppercase">Follow The Diva</p>
                  <div className="grid grid-cols-2 gap-3">
                    <a 
                      href="https://instagram.com/xtayxkayx" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white hover:shadow-lg hover:scale-105 transition-all"
                    >
                      <span className="text-xl">📷</span>
                      <div>
                        <span className="font-sans text-xs opacity-80">Instagram</span>
                        <p className="font-sans text-sm font-medium">@xtayxkayx</p>
                      </div>
                    </a>
                    <a 
                      href="https://twitter.com/ItsTayKay" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 bg-black rounded-xl text-white hover:shadow-lg hover:scale-105 transition-all"
                    >
                      <span className="text-xl">𝕏</span>
                      <div>
                        <span className="font-sans text-xs opacity-80">Twitter/X</span>
                        <p className="font-sans text-sm font-medium">@ItsTayKay</p>
                      </div>
                    </a>
                    <a 
                      href="https://fansly.com/ItsTayKay" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white hover:shadow-lg hover:scale-105 transition-all"
                    >
                      <span className="text-xl">💎</span>
                      <div>
                        <span className="font-sans text-xs opacity-80">Fansly</span>
                        <p className="font-sans text-sm font-medium">ItsTayKay</p>
                      </div>
                    </a>
                    <a 
                      href="https://reddit.com/u/ItsTayKay" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white hover:shadow-lg hover:scale-105 transition-all"
                    >
                      <span className="text-xl">🔥</span>
                      <div>
                        <span className="font-sans text-xs opacity-80">Reddit</span>
                        <p className="font-sans text-sm font-medium">u/ItsTayKay</p>
                      </div>
                    </a>
                  </div>
                </div>
                
                {/* Tip / Venmo */}
                <div className="pt-8 border-t border-pink-100">
                  <p className="font-sans text-xs tracking-[0.3em] text-gray-400 mb-4 uppercase">Support The Diva</p>
                  <a 
                    href="https://venmo.com/taykaybabyxoxo" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 px-6 py-4 bg-[#008CFF] rounded-xl text-white hover:shadow-lg hover:scale-105 transition-all"
                  >
                    <span className="text-2xl">💸</span>
                    <div>
                      <span className="font-sans text-xs opacity-80">Venmo</span>
                      <p className="font-sans text-lg font-medium">@taykaybabyxoxo</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Profile / My Account */}
      {activeSection === 'profile' && isLoggedIn && (
        <section className="min-h-screen p-6 pt-32 relative">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <span className="font-sans text-xs tracking-[0.5em] text-pink-500 font-medium">MY ACCOUNT</span>
              <h2 className="font-display text-7xl md:text-8xl tracking-wider gradient-text mt-4 glow-text">PROFILE</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* User Info Card */}
              <div className="glass-card-strong rounded-3xl p-8 shadow-xl">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                    <User className="w-12 h-12 text-white" />
                    {userSubscription && (
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center border-4 border-white">
                        <Crown className="w-4 h-4 text-yellow-800" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-display text-2xl gradient-text">{userName}</h3>
                  <p className="font-sans text-sm text-gray-500 mt-1">{userEmail || userPhone}</p>
                  
                  {/* Subscription Badge */}
                  {userSubscription && (
                    <div className="mt-3 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full inline-flex items-center gap-2">
                      <Crown className="w-4 h-4 text-white" />
                      <span className="font-sans text-sm text-white font-medium">
                        {userSubscription === 'vip' ? 'VIP Member' : 'Premium Subscriber'}
                      </span>
                    </div>
                  )}
                  
                  {/* Points Display */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl">
                    <div className="flex items-center justify-center gap-2">
                      <Award className="w-6 h-6 text-pink-500" />
                      <span className="font-display text-4xl gradient-text">{userPoints}</span>
                    </div>
                    <p className="font-sans text-xs text-gray-500 mt-1">Loyalty Points</p>
                  </div>
                  
                  <div className="mt-6 space-y-2 text-left">
                    <div className="flex justify-between font-sans text-sm">
                      <span className="text-gray-500">Member Since</span>
                      <span className="text-gray-700">Jan 2026</span>
                    </div>
                    <div className="flex justify-between font-sans text-sm">
                      <span className="text-gray-500">Total Bookings</span>
                      <span className="text-gray-700">{userBookingHistory.length}</span>
                    </div>
                    <div className="flex justify-between font-sans text-sm">
                      <span className="text-gray-500">Collection Items</span>
                      <span className="text-gray-700">{userCollection.photos.length + userCollection.videos.length}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Subscription Management */}
              <div className="md:col-span-2 glass-card-strong rounded-3xl p-8 shadow-xl">
                <h3 className="font-display text-2xl tracking-wider gradient-text mb-6 flex items-center gap-2">
                  <Crown className="w-6 h-6" /> SUBSCRIPTION
                </h3>
                
                {userSubscription ? (
                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-display text-xl text-gray-800">{userSubscription === 'vip' ? 'VIP MEMBERSHIP' : 'PREMIUM SUBSCRIPTION'}</span>
                        <p className="font-sans text-sm text-gray-500 mt-1">Active • Renews Feb 26, 2026</p>
                      </div>
                      <span className="font-display text-3xl gradient-text">$50<span className="text-lg">/mo</span></span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="flex items-center gap-2 text-green-600">
                        <Check className="w-4 h-4" />
                        <span className="font-sans text-sm">20% off all content</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-600">
                        <Check className="w-4 h-4" />
                        <span className="font-sans text-sm">Free live streams</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-600">
                        <Check className="w-4 h-4" />
                        <span className="font-sans text-sm">Priority booking</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-600">
                        <Check className="w-4 h-4" />
                        <span className="font-sans text-sm">Exclusive content</span>
                      </div>
                    </div>
                    <button className="mt-4 px-4 py-2 border border-gray-300 text-gray-600 rounded-full font-sans text-sm hover:bg-gray-100 transition-all">
                      Manage Subscription
                    </button>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 rounded-2xl p-6 mb-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-display text-2xl">UPGRADE TO PREMIUM</span>
                        <p className="font-sans text-sm text-pink-100 mt-1">Get 20% off everything + exclusive perks</p>
                      </div>
                      <span className="font-display text-4xl">$50<span className="text-lg">/mo</span></span>
                    </div>
                    <button
                      onClick={() => {
                        setUserSubscription('monthly');
                        addPoints(100, 'Subscription bonus');
                        alert('🎉 Welcome to the Diva Circle! You now have 20% off all content.');
                      }}
                      className="mt-4 px-8 py-3 bg-white text-pink-600 rounded-full font-display tracking-wider hover:shadow-lg transition-all"
                    >
                      SUBSCRIBE NOW
                    </button>
                  </div>
                )}
                
                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPortfolioView('collection'); setActiveSection('portfolio');}
                    className="p-4 bg-white rounded-xl border border-pink-100 hover:border-pink-300 transition-all text-left"
                  >
                    <Heart className="w-6 h-6 text-pink-500 mb-2" />
                    <span className="font-sans text-sm font-medium text-gray-700 block">My Collection</span>
                    <span className="font-sans text-xs text-gray-500">{userCollection.photos.length + userCollection.videos.length} items</span>
                  </button>
                  <button
                    onClick={() => setActiveSection('rewards')}
                    className="p-4 bg-white rounded-xl border border-pink-100 hover:border-pink-300 transition-all text-left"
                  >
                    <Award className="w-6 h-6 text-pink-500 mb-2" />
                    <span className="font-sans text-sm font-medium text-gray-700 block">Rewards</span>
                    <span className="font-sans text-xs text-gray-500">{userPoints} points</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Booking History */}
            <div className="mt-8 glass-card-strong rounded-3xl p-8 shadow-xl">
              <h3 className="font-display text-2xl tracking-wider gradient-text mb-6 flex items-center gap-2">
                <History className="w-6 h-6" /> BOOKING HISTORY
              </h3>
              
              {userBookingHistory.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-pink-200 mx-auto mb-4" />
                  <p className="font-sans text-gray-400">No bookings yet</p>
                  <button
                    onClick={() => setActiveSection('booking')}
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-sans text-sm"
                  >
                    Book Your First Session
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {userBookingHistory.map((booking, i) => (
                    <div key={i} className="p-4 bg-white rounded-2xl border border-pink-100 flex justify-between items-center">
                      <div>
                        <div className="font-sans text-sm font-medium text-gray-700">{booking.duration}</div>
                        <div className="font-sans text-xs text-gray-500">{booking.date} at {booking.time}</div>
                        <div className="font-sans text-xs text-gray-400">Ref: {booking.id}</div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-sans ${
                          booking.status === 'completed' ? 'bg-green-100 text-green-600' :
                          booking.status === 'upcoming' ? 'bg-blue-100 text-blue-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {booking.status}
                        </span>
                        <div className="flex items-center gap-1 mt-2 justify-end">
                          <Award className="w-3 h-3 text-pink-500" />
                          <span className="font-sans text-xs text-pink-600">+{booking.points} pts</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Account Settings */}
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              {/* Notification Settings */}
              <div className="glass-card rounded-3xl p-8">
                <h3 className="font-display text-xl tracking-wider gradient-text mb-6 flex items-center gap-2">
                  <Settings className="w-5 h-5" /> NOTIFICATION SETTINGS
                </h3>
                <div className="space-y-4">
                  {[
                    { key: 'email', label: 'Email Notifications', desc: 'Booking confirmations & updates' },
                    { key: 'sms', label: 'SMS Notifications', desc: 'Text message alerts' },
                    { key: 'promotions', label: 'Promotional Emails', desc: 'Sales, new content & offers' },
                  ].map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between p-3 bg-white rounded-xl">
                      <div>
                        <span className="font-sans text-sm font-medium text-gray-700">{setting.label}</span>
                        <p className="font-sans text-xs text-gray-500">{setting.desc}</p>
                      </div>
                      <button
                        onClick={() => setUserSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, [setting.key]: !prev.notifications[setting.key] }
                        }))}
                        className={`w-12 h-6 rounded-full transition-all ${
                          userSettings.notifications[setting.key] ? 'bg-pink-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          userSettings.notifications[setting.key] ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Privacy Settings */}
              <div className="glass-card rounded-3xl p-8">
                <h3 className="font-display text-xl tracking-wider gradient-text mb-6 flex items-center gap-2">
                  🔒 PRIVACY SETTINGS
                </h3>
                <div className="space-y-4">
                  {[
                    { key: 'showProfile', label: 'Public Profile', desc: 'Show your name in suggestions' },
                    { key: 'showActivity', label: 'Activity Status', desc: 'Show when you\'re online' },
                    { key: 'allowMessages', label: 'Allow Messages', desc: 'Receive messages from Tay Kay' },
                  ].map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between p-3 bg-white rounded-xl">
                      <div>
                        <span className="font-sans text-sm font-medium text-gray-700">{setting.label}</span>
                        <p className="font-sans text-xs text-gray-500">{setting.desc}</p>
                      </div>
                      <button
                        onClick={() => setUserSettings(prev => ({
                          ...prev,
                          privacy: { ...prev.privacy, [setting.key]: !prev.privacy[setting.key] }
                        }))}
                        className={`w-12 h-6 rounded-full transition-all ${
                          userSettings.privacy[setting.key] ? 'bg-pink-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          userSettings.privacy[setting.key] ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Danger Zone */}
            <div className="mt-8 glass-card rounded-3xl p-8 border-2 border-red-100">
              <h3 className="font-display text-xl tracking-wider text-red-600 mb-4">ACCOUNT ACTIONS</h3>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-full font-sans text-sm hover:bg-gray-100 transition-all">
                  Change Password
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-full font-sans text-sm hover:bg-gray-100 transition-all">
                  Update Email/Phone
                </button>
                <button className="px-4 py-2 border border-red-300 text-red-600 rounded-full font-sans text-sm hover:bg-red-50 transition-all">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Admin Dashboard */}
      {activeSection === 'admin' && isAdmin && (
        <section className="min-h-screen p-6 pt-32 relative">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 text-center">
              <span className="font-sans text-xs tracking-[0.5em] text-purple-500 font-medium">ADMIN</span>
              <h2 className="font-display text-6xl md:text-7xl tracking-wider text-purple-600 mt-4">DASHBOARD</h2>
            </div>
            
            {/* Admin Tabs */}
            <div className="flex justify-center gap-2 mb-8">
              {[
                { id: 'portfolio', label: 'Portfolio', icon: <Image className="w-4 h-4" /> },
                { id: 'bookings', label: 'Bookings', icon: <Calendar className="w-4 h-4" /> },
                { id: 'users', label: 'Users', icon: <User className="w-4 h-4" /> },
                { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setAdminTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-sans text-sm transition-all flex items-center gap-2 ${
                    adminTab === tab.id
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-white border border-purple-200 text-gray-600 hover:border-purple-400'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
            
            {/* Portfolio Management */}
            {adminTab === 'portfolio' && (
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-display text-2xl text-purple-600">Manage Portfolio</h3>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-xl font-sans text-sm flex items-center gap-2 hover:bg-purple-700 transition-colors">
                    <Plus className="w-4 h-4" /> Add Photo
                  </button>
                </div>
                
                {/* Albums Management */}
                <div className="mb-8">
                  <h4 className="font-sans text-sm font-medium text-gray-600 mb-4">Albums</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {portfolioAlbums.filter(a => a.id !== 'all').map(album => (
                      <div key={album.id} className="px-4 py-2 bg-purple-50 rounded-xl flex items-center gap-2">
                        <FolderOpen className="w-4 h-4 text-purple-500" />
                        <span className="font-sans text-sm text-gray-700">{album.name}</span>
                        <span className="text-xs bg-purple-200 text-purple-700 px-2 py-0.5 rounded-full">{album.count}</span>
                        <button className="text-gray-400 hover:text-red-500 ml-2">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newAlbumName}
                      onChange={(e) => setNewAlbumName(e.target.value)}
                      placeholder="New album name"
                      className="flex-1 px-4 py-2 rounded-xl border border-purple-200 focus:border-purple-500 focus:outline-none font-sans text-sm"
                    />
                    <button 
                      onClick={() => {
                        if (newAlbumName) {
                          setPortfolioAlbums([...portfolioAlbums, { id: newAlbumName.toLowerCase().replace(/\s+/g, '-'), name: newAlbumName, count: 0 }]);
                          setNewAlbumName('');
                        }
                      }}
                      className="px-4 py-2 bg-purple-100 text-purple-600 rounded-xl font-sans text-sm hover:bg-purple-200 transition-colors"
                    >
                      Add Album
                    </button>
                  </div>
                </div>
                
                {/* Photos Grid */}
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {portfolioPhotos.map((photo, i) => (
                    <div key={i} className="aspect-square relative group rounded-xl overflow-hidden">
                      <img src={photo.src} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-purple-100">
                          <Edit className="w-4 h-4 text-purple-600" />
                        </button>
                        <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-red-100">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                      <div className="absolute bottom-1 left-1 right-1">
                        <span className="text-[8px] bg-black/50 text-white px-2 py-0.5 rounded-full">{photo.album}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Client Database (Users Tab) */}
            {adminTab === 'users' && (
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-display text-2xl text-purple-600">Client Database</h3>
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-sm text-gray-500">{clientDatabase.length} clients</span>
                    <button className="px-4 py-2 bg-purple-100 text-purple-600 rounded-xl font-sans text-sm hover:bg-purple-200 transition-colors">
                      Export CSV
                    </button>
                  </div>
                </div>
                
                {/* Search & Filter */}
                <div className="flex gap-3 mb-6">
                  <input
                    type="text"
                    placeholder="Search by name, email, or phone..."
                    className="flex-1 px-4 py-3 rounded-xl border border-purple-200 focus:border-purple-500 focus:outline-none font-sans text-sm"
                  />
                  <select className="px-4 py-3 rounded-xl border border-purple-200 focus:border-purple-500 focus:outline-none font-sans text-sm">
                    <option>All Clients</option>
                    <option>Subscribers Only</option>
                    <option>VIP Members</option>
                    <option>Non-Subscribers</option>
                  </select>
                </div>
                
                {/* Client Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-purple-100">
                        <th className="text-left py-3 px-4 font-sans text-sm font-medium text-gray-600">Client</th>
                        <th className="text-left py-3 px-4 font-sans text-sm font-medium text-gray-600">Contact</th>
                        <th className="text-left py-3 px-4 font-sans text-sm font-medium text-gray-600">Visits</th>
                        <th className="text-left py-3 px-4 font-sans text-sm font-medium text-gray-600">Spent</th>
                        <th className="text-left py-3 px-4 font-sans text-sm font-medium text-gray-600">Points</th>
                        <th className="text-left py-3 px-4 font-sans text-sm font-medium text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 font-sans text-sm font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientDatabase.map((client) => (
                        <tr key={client.id} className="border-b border-gray-100 hover:bg-purple-50 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-medium text-sm">{client.name.charAt(0)}</span>
                              </div>
                              <div>
                                <span className="font-sans text-sm font-medium text-gray-800 block">{client.name}</span>
                                <span className="font-sans text-xs text-gray-500">Since {client.joinDate}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-sans text-sm text-gray-700">{client.email}</div>
                            <div className="font-sans text-xs text-gray-500">{client.phone}</div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-display text-lg text-gray-800">{client.visits}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-display text-lg text-green-600">${client.totalSpent}</span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-1">
                              <Award className="w-4 h-4 text-pink-500" />
                              <span className="font-display text-lg text-pink-600">{client.points}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            {client.subscription ? (
                              <span className={`px-3 py-1 rounded-full text-xs font-sans ${
                                client.subscription === 'vip' 
                                  ? 'bg-yellow-100 text-yellow-700' 
                                  : 'bg-purple-100 text-purple-700'
                              }`}>
                                {client.subscription === 'vip' ? '👑 VIP' : '⭐ Premium'}
                              </span>
                            ) : (
                              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-sans">Regular</span>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <button className="p-2 hover:bg-purple-100 rounded-lg transition-colors">
                                <Mail className="w-4 h-4 text-purple-600" />
                              </button>
                              <button className="p-2 hover:bg-purple-100 rounded-lg transition-colors">
                                <Phone className="w-4 h-4 text-purple-600" />
                              </button>
                              <button className="p-2 hover:bg-purple-100 rounded-lg transition-colors">
                                <Edit className="w-4 h-4 text-purple-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Summary Stats */}
                <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-purple-100">
                  <div className="text-center">
                    <span className="font-display text-3xl text-purple-600">{clientDatabase.length}</span>
                    <p className="font-sans text-xs text-gray-500">Total Clients</p>
                  </div>
                  <div className="text-center">
                    <span className="font-display text-3xl text-purple-600">{clientDatabase.filter(c => c.subscription).length}</span>
                    <p className="font-sans text-xs text-gray-500">Subscribers</p>
                  </div>
                  <div className="text-center">
                    <span className="font-display text-3xl text-green-600">${clientDatabase.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}</span>
                    <p className="font-sans text-xs text-gray-500">Total Revenue</p>
                  </div>
                  <div className="text-center">
                    <span className="font-display text-3xl text-purple-600">{clientDatabase.reduce((sum, c) => sum + c.visits, 0)}</span>
                    <p className="font-sans text-xs text-gray-500">Total Visits</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Bookings Tab */}
            {adminTab === 'bookings' && (
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h3 className="font-display text-2xl text-purple-600 mb-6">Booking Management</h3>
                <div className="space-y-4">
                  {userBookingHistory.map((booking, i) => (
                    <div key={i} className="p-4 border border-purple-100 rounded-xl flex justify-between items-center hover:bg-purple-50 transition-colors">
                      <div>
                        <span className="font-sans text-sm font-medium text-gray-800">{booking.duration}</span>
                        <p className="font-sans text-xs text-gray-500">{booking.date} at {booking.time}</p>
                        <p className="font-sans text-xs text-purple-600">Ref: {booking.id}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          booking.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                        }`}>{booking.status}</span>
                        <button className="p-2 hover:bg-purple-100 rounded-lg">
                          <Edit className="w-4 h-4 text-purple-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Settings Tab */}
            {adminTab === 'settings' && (
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h3 className="font-display text-2xl text-purple-600 mb-6">Admin Settings</h3>
                <div className="space-y-6">
                  <div className="p-4 border border-purple-100 rounded-xl">
                    <h4 className="font-sans font-medium text-gray-800 mb-2">Subscription Pricing</h4>
                    <div className="flex items-center gap-3">
                      <span className="font-sans text-sm text-gray-600">Monthly Price:</span>
                      <input type="text" defaultValue="$50" className="px-3 py-2 border border-purple-200 rounded-lg font-sans text-sm w-24" />
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-sans text-sm">Save</button>
                    </div>
                  </div>
                  <div className="p-4 border border-purple-100 rounded-xl">
                    <h4 className="font-sans font-medium text-gray-800 mb-2">Subscriber Discount</h4>
                    <div className="flex items-center gap-3">
                      <span className="font-sans text-sm text-gray-600">Discount %:</span>
                      <input type="text" defaultValue="20" className="px-3 py-2 border border-purple-200 rounded-lg font-sans text-sm w-24" />
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-sans text-sm">Save</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Coming Soon Modal */}
      {showComingSoon && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="glass-card-strong rounded-3xl p-8 md:p-12 max-w-md w-full relative animate-slide-up shadow-2xl">
            <button
              onClick={() => setShowComingSoon(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center hover:bg-pink-200 transition-colors"
            >
              <X className="w-5 h-5 text-pink-600" />
            </button>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="font-display text-3xl tracking-wider gradient-text mb-2">COMING SOON</h3>
              <p className="font-serif text-lg italic text-purple-600 mb-4">{comingSoonFeature}</p>
              <p className="font-sans text-gray-500 mb-8">
                Be the first to know when this launches! Join the newsletter and get exclusive updates.
              </p>
              
              {!newsletterSuccess ? (
                <div className="space-y-4">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-5 py-4 rounded-full bg-white border-2 border-pink-200 focus:border-pink-500 focus:outline-none font-sans text-center"
                  />
                  <button
                    onClick={() => handleNewsletterSignup(comingSoonFeature)}
                    className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-display tracking-wider hover:shadow-xl transition-all"
                  >
                    NOTIFY ME
                  </button>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                  <Check className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <p className="font-sans text-green-700">You're on the list! We'll notify you when {comingSoonFeature} launches.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-pink-200/50 py-8 mt-20 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <span className="font-sans text-xs tracking-[0.2em] text-gray-400">© 2026 TAY KAY. ALL RIGHTS RESERVED.</span>
            <span className="font-display text-xl tracking-wider gradient-text">THE NOTORIOUS DIVA</span>
            <span className="font-sans text-xs tracking-[0.2em] text-gray-400">(218) 355-0792</span>
          </div>
          <div className="text-center pt-4 border-t border-pink-100">
            <span className="font-sans text-xs tracking-[0.15em] text-gray-400">
              Created by <span className="text-pink-500 font-medium">Sinnovative Designs</span> ✨
            </span>
          </div>
        </div>
      </footer>
      <Analytics />
    </div>
  );
};

export default TayKayWebsite;
