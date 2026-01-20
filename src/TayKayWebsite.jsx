import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, MapPin, Star, Heart, Zap, Music, ShoppingBag, Mail, Phone, ChevronRight, Sparkles, User, LogIn, Crown, Camera, Mic, Gift, ArrowUpRight, Check, X, ChevronLeft, ChevronDown, Headphones, MessageCircle } from 'lucide-react';

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
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [authData, setAuthData] = useState({ name: '', email: '', phone: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredNav, setHoveredNav] = useState(null);
  const [showBookingAuthPrompt, setShowBookingAuthPrompt] = useState(false);
  const [signupMethod, setSignupMethod] = useState('email'); // 'email' or 'phone'

  // Generate available dates (next 14 days)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
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
    
    // Store user data
    const name = authData.name || authData.email?.split('@')[0] || authData.phone;
    setUserName(name);
    setUserEmail(authData.email || '');
    setUserPhone(authData.phone || '');
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

    // Simulate sending SMS to you (218-355-0792)
    // In production, this would be an API call to your backend with Twilio
    console.log('📱 SMS to Tay Kay (218-355-0792):', 
      `New Booking! Ref: ${reference}\n` +
      `Client: ${userName}\n` +
      `Phone: ${userPhone}\n` +
      `Date: ${bookingDetails.date} at ${selectedTime}\n` +
      `Duration: ${selectedDuration?.name}\n` +
      `Services: ${selectedServices.map(s => s.name).join(', ') || 'None'}\n` +
      `Location: ${selectedLocation}\n` +
      `Total: $${calculateTotal().toLocaleString()}`
    );

    // Simulate API call
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
    { name: '30 Minutes', price: 400, icon: '⏱' },
    { name: '1 Hour', price: 800, icon: '🕐' },
    { name: '90 Minutes', price: 1000, icon: '⌛' },
    { name: '2 Hours', price: 1200, icon: '🕑' },
    { name: 'Overnight', price: 2500, icon: '🌙' }
  ];

  // Shop products
  const shopProducts = [
    { name: 'Used Panties', price: 50, icon: '🩲', category: 'intimate' },
    { name: 'Used Bra', price: 60, icon: '👙', category: 'intimate' },
    { name: 'Used Socks', price: 30, icon: '🧦', category: 'intimate' },
    { name: 'Custom Video Request', price: 100, icon: '🎬', category: 'custom' },
    { name: 'Custom Photo Request', price: 50, icon: '📷', category: 'custom' },
    { name: '2026 Calendar', price: 35, icon: '📅', category: 'merch' }
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
    { name: 'Contact', icon: <Mail className="w-7 h-7" />, action: () => setActiveSection('contact'), subtitle: 'Get In Touch' },
    { name: 'Wishlist', icon: <Heart className="w-7 h-7" />, action: () => setActiveSection('wishlist'), subtitle: 'Spoil Me' }
  ];

  const navItems = ['home', 'about', 'portfolio', 'booking', 'podcast', 'shop', 'wishlist', 'contact'];

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
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-shimmer { 
          background: linear-gradient(90deg, transparent, rgba(236,72,153,0.3), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        .animate-pulse-pink { animation: pulse-pink 3s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        .animate-sparkle { animation: sparkle 2s ease-in-out infinite; }
        
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
      <header className={`fixed top-0 w-full z-40 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-pink-100/30' : 'bg-white/70 backdrop-blur-md'}`}>
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <button 
            onClick={() => setActiveSection('home')}
            onMouseEnter={() => setHoveredNav('logo')}
            onMouseLeave={() => setHoveredNav(null)}
            className="group relative"
          >
            <span className="font-display text-3xl tracking-[0.2em] gradient-text group-hover:opacity-80 transition-opacity">
              TAY KAY
            </span>
            <span className="block font-sans text-[10px] tracking-[0.4em] text-pink-500/70 font-medium uppercase">
              Notorious Diva
            </span>
          </button>
          
          <div className="hidden lg:flex gap-6 items-center">
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
            
            {isLoggedIn ? (
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-pink-200">
                <Crown className="w-4 h-4 text-pink-500" />
                <span className="font-sans text-sm text-gray-600">{userName}</span>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                onMouseEnter={() => setHoveredNav('auth')}
                onMouseLeave={() => setHoveredNav(null)}
                className="ml-4 flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-xs font-sans tracking-wide hover:shadow-lg hover:shadow-pink-300/50 transition-all"
              >
                <LogIn className="w-4 h-4" />
                Login
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Hero */}
      {activeSection === 'home' && (
        <section className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20">
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
          
          <div className="relative z-10 container mx-auto px-6">
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
              <p className="font-sans text-sm tracking-[0.4em] text-pink-400 text-center mb-16 uppercase font-medium">
                Model · Creator · Icon
              </p>
              
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
                  
                  {/* NEW badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-sans tracking-wider px-4 py-1.5 rounded-full animate-pulse shadow-lg">
                    ✨ NEW
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
                      
                      <button className="px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-display text-lg tracking-wider hover:shadow-2xl hover:shadow-pink-400/50 hover:scale-105 transition-all animate-pulse-pink">
                        CHAT WITH ME NOW →
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
            <div className="mb-12 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <span className="font-sans text-xs tracking-[0.5em] text-pink-500 font-medium">002</span>
                <h2 className="font-display text-7xl md:text-8xl tracking-wider gradient-text mt-4 glow-text">PORTFOLIO</h2>
              </div>
              <span className="font-sans text-xs tracking-[0.3em] text-gray-400 uppercase">Selected Works</span>
            </div>
            
            {/* Photo Grid with Filter Effects */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                { src: '/images/IMG_0773.jpeg', category: 'BOUDOIR' },
                { src: '/images/IMG_0774.jpeg', category: 'INTIMATE' },
                { src: '/images/IMG_0775.jpeg', category: 'PLAYFUL' },
                { src: '/images/IMG_0776.jpeg', category: 'GLAMOUR' },
                { src: '/images/IMG_0777.jpeg', category: 'ALLURE' },
                { src: '/images/IMG_0778.jpeg', category: 'BOLD' },
                { src: '/images/IMG_0779.jpeg', category: 'FIERCE' },
                { src: '/images/IMG_0780.jpeg', category: 'SULTRY' },
                { src: '/images/IMG_0781.jpeg', category: 'ICONIC' },
                { src: '/images/IMG_0782.jpeg', category: 'SIGNATURE' },
                { src: '/images/IMG_0783.jpeg', category: 'EDITORIAL' },
                { src: '/images/Facetune_01-01-2026-05-14-26.jpeg', category: 'BEAUTY' }
              ].map((item, i) => (
                <div
                  key={i}
                  className="aspect-[3/4] relative group overflow-hidden rounded-2xl hover-lift cursor-pointer"
                >
                  {/* Image with filter */}
                  <img 
                    src={item.src} 
                    alt={`Portfolio ${i + 1}`}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    style={{
                      filter: 'contrast(1.05) saturate(1.1) brightness(1.02)',
                    }}
                  />
                  {/* Pink/Purple overlay filter */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/20 mix-blend-overlay" />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Category label on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <span className="font-sans text-[10px] tracking-[0.3em] text-pink-300 font-medium">{item.category}</span>
                  </div>
                  {/* Corner icon on hover */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <button className="font-sans text-sm tracking-wider text-pink-600 border-2 border-pink-400 px-10 py-4 rounded-full hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300">
                VIEW FULL GALLERY
              </button>
            </div>
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
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {bookingStep === 2 && (
                <div className="space-y-8 animate-slide-up">
                  <h3 className="font-display text-3xl tracking-wider gradient-text text-center">SELECT DURATION</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {durations.map(dur => (
                      <button
                        key={dur.name}
                        onClick={() => { setSelectedDuration(dur); setBookingStep(3); }}
                        className={`p-6 rounded-2xl transition-all duration-500 group hover-lift ${
                          selectedDuration?.name === dur.name ? 'bg-gradient-to-br from-pink-100 to-purple-100 border-2 border-pink-400 shadow-lg' : 'bg-white/60 border-2 border-pink-100 hover:border-pink-300'
                        }`}
                      >
                        <span className="text-3xl mb-3 block">{dur.icon}</span>
                        <div className="font-sans text-gray-700">{dur.name}</div>
                        <div className="font-display text-2xl gradient-text mt-2">${dur.price.toLocaleString()}</div>
                      </button>
                    ))}
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

                  <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                    <p className="font-sans text-green-700">
                      📱 A confirmation has been sent to <strong>{userEmail}</strong>
                    </p>
                    <p className="font-sans text-green-600 text-sm mt-2">
                      Tay Kay will review your request and contact you shortly to confirm.
                    </p>
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
            <div className="glass-card rounded-3xl p-10 mb-8 text-center">
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
                </div>
                <button className="px-8 py-4 border-2 border-pink-400 text-pink-600 rounded-full font-display tracking-wider hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white hover:border-transparent transition-all">
                  NOTIFY ME
                </button>
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
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <span className="font-sans text-xs tracking-[0.5em] text-pink-500 font-medium">006</span>
              <h2 className="font-display text-7xl md:text-8xl tracking-wider gradient-text mt-4 glow-text">WISHLIST</h2>
              <p className="font-sans text-sm tracking-[0.3em] text-gray-400 mt-4 uppercase">Spoil The Diva</p>
            </div>
            
            <div className="glass-card-strong rounded-3xl p-12 text-center group relative overflow-hidden shadow-xl shadow-pink-100/50">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-100/0 to-purple-100/0 group-hover:from-pink-100/60 group-hover:to-purple-100/40 transition-all duration-500 rounded-3xl" />
              <div className="relative">
                <Heart className="w-20 h-20 mx-auto mb-6 text-pink-400" />
                <h3 className="font-display text-5xl tracking-wider gradient-text mb-4">TREAT ME</h3>
                <p className="font-serif text-xl italic text-gray-500 mb-8 max-w-xl mx-auto">
                  Designer items, luxury pieces, and everything a diva deserves
                </p>
                <p className="font-display text-6xl gradient-text my-6">$200 - $800+</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10">
                  {['👠 Heels', '👜 Bags', '💍 Jewelry', '👗 Dresses'].map((item, i) => (
                    <div key={i} className="bg-white/50 rounded-2xl p-4">
                      <span className="font-sans text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
                
                <button className="px-12 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-display text-xl tracking-wider hover:shadow-xl hover:shadow-pink-300/50 hover:scale-105 transition-all">
                  VIEW WISHLIST
                </button>
              </div>
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
              <p className="font-sans text-sm tracking-[0.3em] text-gray-400 mt-4 uppercase">Products, Merch & Services</p>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center gap-2 mb-8">
              {[
                { id: 'products', label: 'Products', icon: '🛍️' },
                { id: 'clothing', label: 'Clothing', icon: '👕' },
                { id: 'services', label: 'Services', icon: '💎' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setShopTab(tab.id)}
                  className={`px-6 py-3 rounded-full font-sans text-sm transition-all ${
                    shopTab === tab.id 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg' 
                      : 'bg-white border border-pink-200 text-gray-600 hover:border-pink-400'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Products/Items Selection */}
              <div className="lg:col-span-2">
                <div className="glass-card-strong rounded-3xl p-6 md:p-8 shadow-xl">
                  
                  {/* Products Tab */}
                  {shopTab === 'products' && (
                    <div className="animate-slide-up">
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
                            <span className="font-display text-xl text-purple-600 block mt-1">${item.price}</span>
                            {selectedShopItems.find(i => i.name === item.name) && (
                              <Check className="w-5 h-5 text-pink-500 mx-auto mt-2" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Clothing Tab */}
                  {shopTab === 'clothing' && (
                    <div className="animate-slide-up">
                      <h3 className="font-display text-2xl tracking-wider gradient-text mb-6">MERCH & CLOTHING</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {clothingItems.map(item => (
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
                            <span className="font-display text-xl text-purple-600 block mt-1">${item.price}</span>
                            {selectedShopItems.find(i => i.name === item.name) && (
                              <Check className="w-5 h-5 text-pink-500 mx-auto mt-2" />
                            )}
                          </button>
                        ))}
                      </div>
                      <p className="font-sans text-xs text-gray-400 mt-4 text-center italic">* More designs coming soon!</p>
                    </div>
                  )}

                  {/* Services Tab */}
                  {shopTab === 'services' && (
                    <div className="animate-slide-up">
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
                  )}
                </div>
              </div>

              {/* Order Summary / Cart */}
              <div className="lg:col-span-1">
                <div className="glass-card-strong rounded-3xl p-6 md:p-8 shadow-xl sticky top-24">
                  <h3 className="font-display text-xl tracking-wider gradient-text mb-6 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5" /> YOUR CART
                  </h3>
                  
                  {selectedShopItems.length === 0 ? (
                    <div className="text-center py-12">
                      <Gift className="w-16 h-16 text-pink-200 mx-auto mb-4" />
                      <p className="font-sans text-gray-400">Your cart is empty</p>
                      <p className="font-sans text-sm text-gray-300 mt-2">Select items to add them here</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {selectedShopItems.map(item => (
                          <div key={item.name} className="flex justify-between items-center p-3 bg-white rounded-xl">
                            <div className="flex items-center gap-2">
                              <span>{item.icon}</span>
                              <span className="font-sans text-sm text-gray-700">{item.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-sans text-gray-600">${item.price}</span>
                              <button 
                                onClick={() => toggleShopItem(item)}
                                className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center hover:bg-pink-200 transition-colors"
                              >
                                <X className="w-3 h-3 text-pink-600" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t-2 border-pink-200 mt-6 pt-6">
                        <div className="flex justify-between items-center mb-6">
                          <span className="font-display text-lg text-gray-800">TOTAL</span>
                          <span className="font-display text-3xl gradient-text">${calculateShopTotal()}</span>
                        </div>
                        
                        <button
                          onClick={() => {
                            if (!isLoggedIn) {
                              setShowAuthModal(true);
                            } else {
                              alert(`Order submitted!\n\nItems: ${selectedShopItems.map(i => i.name).join(', ')}\nTotal: $${calculateShopTotal()}\n\nTay Kay will contact you soon! 👑`);
                              setSelectedShopItems([]);
                            }
                          }}
                          className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-display text-lg tracking-wider hover:shadow-xl hover:shadow-pink-300/50 hover:scale-[1.02] transition-all"
                        >
                          {isLoggedIn ? 'CHECKOUT' : 'SIGN IN TO ORDER'}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      {activeSection === 'contact' && (
        <section className="min-h-screen flex items-center justify-center p-6 pt-32 relative">
          <div className="max-w-2xl w-full">
            <div className="mb-12 text-center">
              <span className="font-sans text-xs tracking-[0.5em] text-pink-500 font-medium">007</span>
              <h2 className="font-display text-7xl md:text-8xl tracking-wider gradient-text mt-4 glow-text">CONTACT</h2>
            </div>
            
            <div className="glass-card-strong rounded-3xl p-12 md:p-16 shadow-xl shadow-pink-100/50 relative">
              <div className="space-y-8 text-center">
                <p className="font-serif text-xl italic text-gray-500 mb-10">
                  For bookings, collaborations, and inquiries
                </p>
                
                <a href="mailto:booking@taykay.com" className="flex items-center justify-center gap-4 text-xl group py-4 border-b border-pink-100 hover:border-pink-300 transition-all">
                  <Mail className="w-6 h-6 text-pink-500" />
                  <span className="font-sans text-gray-600 group-hover:text-pink-600 transition-colors">booking@taykay.com</span>
                </a>
                
                <a href="tel:+1234567890" className="flex items-center justify-center gap-4 text-xl group py-4">
                  <Phone className="w-6 h-6 text-pink-500" />
                  <span className="font-sans text-gray-600 group-hover:text-pink-600 transition-colors">Available for Bookings</span>
                </a>
                
                <div className="pt-8">
                  <p className="font-sans text-xs tracking-[0.3em] text-gray-400 mb-4 uppercase">Follow The Diva</p>
                  <div className="flex justify-center gap-4">
                    {['IG', 'TW', 'OF', 'TT'].map((platform) => (
                      <button key={platform} className="w-12 h-12 bg-white/50 rounded-full flex items-center justify-center font-sans text-sm text-gray-500 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white transition-all shadow-sm">
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-pink-200/50 py-8 mt-20 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-sans text-xs tracking-[0.2em] text-gray-400">© 2026 TAY KAY. ALL RIGHTS RESERVED.</span>
          <span className="font-display text-xl tracking-wider gradient-text">THE NOTORIOUS DIVA</span>
          <span className="font-sans text-xs tracking-[0.2em] text-gray-400">DESIGNED WITH 👑</span>
        </div>
      </footer>
    </div>
  );
};

export default TayKayWebsite;
