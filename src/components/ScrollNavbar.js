import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import lunqoLogo from '../Lunqo-white.png';

const ScrollNavbar = () => {
  const { t } = useLanguage();
  const navbarRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const lastScrollTopRef = useRef(0);

  // Simple nav items
  const navItems = [
    { name: t('nav.solutions'), href: '#solutions' }, 
    { name: t('nav.analytics'), href: '#analytics' },
    { name: t('nav.advantages'), href: '#advantages' },
    { name: t('nav.testimonials'), href: '#testimonials' },
    { name: t('nav.contactUs'), href: '#footer' },
  ];

  // Handle demo button click
  const handleDemoClick = () => {
    window.open(t('urls.demo'), '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    console.log('ScrollNavbar mounted, navbarRef:', navbarRef.current);
    
    // Scroll handler inspired by user's script
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const lastScrollTop = lastScrollTopRef.current;
      
      console.log('Scroll detected:', { scrollTop, lastScrollTop, isVisible });
      
      // Show navbar when scrolling up (scrollTop < lastScrollTop)
      // Only show if we've scrolled down at least 100px first
      if (scrollTop < lastScrollTop && scrollTop > 100) {
        console.log('Setting navbar visible - scrolling up');
        setIsVisible(true);
      } else {
        console.log('Setting navbar hidden - scrolling down or at top');
        setIsVisible(false);
      }
      
      lastScrollTopRef.current = scrollTop;
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array to prevent re-renders

  console.log('ScrollNavbar rendering, isVisible:', isVisible);

  // TEMPORARY: Always show for testing positioning
  const shouldShow = true; // isVisible;

  return (
    <>
      {/* Test element - should be very visible */}
      <div 
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: 'red',
          color: 'white',
          padding: '10px',
          zIndex: 9999999,
          fontSize: '16px',
          fontWeight: 'bold'
        }}
      >
        SCROLL NAVBAR TEST - {isVisible ? 'VISIBLE' : 'HIDDEN'}
      </div>
      
      <div 
        ref={navbarRef}
        id="scroll-navbar"
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 999999,
          backgroundColor: 'rgba(17, 24, 39, 0.9)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(55, 65, 81, 0.5)',
          borderRadius: '9999px',
          padding: '12px 24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          minWidth: '400px',
          maxWidth: '600px',
          display: shouldShow ? 'block' : 'none',
          opacity: shouldShow ? 1 : 0,
          visibility: shouldShow ? 'visible' : 'hidden',
          color: 'white',
          pointerEvents: shouldShow ? 'auto' : 'none',
          transition: 'opacity 0.3s ease, visibility 0.3s ease',
          // Force it to be above everything
          isolation: 'isolate'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <img
              src={lunqoLogo}
              alt="Lunqo Logo"
              style={{ width: '32px', height: '32px', transform: 'translateZ(0)' }}
            />
          </div>

          {/* Navigation Links - Center - Always visible */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '0 16px' }}>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                style={{ 
                  color: '#d1d5db', 
                  textDecoration: 'none',
                  fontSize: '12px',
                  fontWeight: '500',
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => e.target.style.color = 'white'}
                onMouseLeave={(e) => e.target.style.color = '#d1d5db'}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <button
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              fontWeight: '500',
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
            onClick={handleDemoClick}
          >
            {t('nav.bookDemo')}
          </button>
        </div>
      </div>
    </>
  );
};

export default ScrollNavbar; 