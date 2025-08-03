import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import lunqoLogo from '../Lunqo-white.png';

const ScrollNavbar = () => {
  const { t } = useLanguage();
  const navbarRef = useRef(null);

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
    
    // Force the navbar to be visible for testing
    if (navbarRef.current) {
      navbarRef.current.style.display = 'block';
      navbarRef.current.style.opacity = '1';
      navbarRef.current.style.visibility = 'visible';
      console.log('Forced navbar to be visible');
    }
  }, []);

  console.log('ScrollNavbar rendering - ALWAYS VISIBLE');

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
        SCROLL NAVBAR TEST
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
          display: 'block',
          opacity: 1,
          visibility: 'visible',
          color: 'white'
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

          {/* Navigation Links - Center */}
          <div style={{ display: 'none', alignItems: 'center', gap: '24px', margin: '0 16px' }} className="md:flex">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                style={{ 
                  color: '#d1d5db', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'color 0.2s'
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
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
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