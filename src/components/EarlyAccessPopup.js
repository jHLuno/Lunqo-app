import React, { useState, useEffect } from 'react';

const EarlyAccessPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });

  // Prevent background scrolling when popup is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      
      // Apply styles to prevent scrolling
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restore scrolling and position
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you can add your form submission logic
    console.log('Form submitted:', formData);
    
    // Show success message or handle submission
    alert('Thank you for joining our waitlist! We\'ll be in touch soon.');
    
    // Reset form and close popup
    setFormData({ name: '', phone: '' });
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      style={{
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(8px)'
      }}
    >
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-md mx-auto"
        style={{
          background: 'rgba(68, 68, 68, 0.95)',
          borderRadius: '20px',
          padding: '32px',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors"
          style={{ fontSize: '18px' }}
        >
          ×
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 
            className="text-white font-bold mb-0"
            style={{ 
              fontSize: '24px',
              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
            }}
          >
            Get Early Access
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label 
              htmlFor="name" 
              className="block text-white mb-2"
              style={{ 
                fontSize: '16px',
                fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
              }}
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              required
              className="w-full px-4 py-3 rounded-xl border-0 outline-none transition-all focus:ring-2 focus:ring-blue-500"
              style={{
                background: 'rgba(80, 80, 80, 0.8)',
                color: 'white',
                fontSize: '16px',
                fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
              }}
            />
          </div>

          {/* Phone Field */}
          <div>
            <label 
              htmlFor="phone" 
              className="block text-white mb-2"
              style={{ 
                fontSize: '16px',
                fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
              }}
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              required
              className="w-full px-4 py-3 rounded-xl border-0 outline-none transition-all focus:ring-2 focus:ring-blue-500"
              style={{
                background: 'rgba(80, 80, 80, 0.8)',
                color: 'white',
                fontSize: '16px',
                fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:scale-105 focus:scale-105 mt-6"
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #84cc16 50%, #f97316 100%)',
              fontSize: '18px',
              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
              boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)'
            }}
          >
            Join Waitlist
          </button>
        </form>
      </div>
    </div>
  );
};

export default EarlyAccessPopup; 