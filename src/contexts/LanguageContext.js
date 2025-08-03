import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { en } from '../translations/en';
import { ru } from '../translations/ru';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');

  const translations = {
    en,
    ru
  };

  const t = (key) => {
    if (!key || typeof key !== 'string') {
      console.warn('Invalid translation key provided:', key);
      return key || '';
    }
    
    try {
      const keys = key.split('.');
      let value = translations[language];
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`Translation key not found: ${key} for language: ${language}`);
          }
          return key;
        }
      }
      
      return value || key;
    } catch (error) {
      console.error('Translation error:', error);
      return key;
    }
  };

  const changeLanguage = (newLanguage) => {
    try {
      if (!translations[newLanguage]) {
        console.error('Invalid language:', newLanguage);
        return;
      }
      
      setLanguage(newLanguage);
      localStorage.setItem('lunqo-language', newLanguage);
      
      // Update URL to match the new language
      const currentPath = location.pathname;
      const newPath = currentPath.replace(/^\/(en|ru)/, `/${newLanguage}`);
      navigate(newPath);
    } catch (error) {
      console.error('Language change error:', error);
    }
  };

  useEffect(() => {
    try {
      // Extract language from URL path
      const pathLanguage = location.pathname.split('/')[1];
      if (pathLanguage === 'en' || pathLanguage === 'ru') {
        setLanguage(pathLanguage);
        localStorage.setItem('lunqo-language', pathLanguage);
      } else {
        // Check for saved language preference if no language in URL
        const savedLanguage = localStorage.getItem('lunqo-language');
        if (savedLanguage && translations[savedLanguage]) {
          setLanguage(savedLanguage);
          // Only redirect if we're not already on a language path
          if (!location.pathname.startsWith('/en') && !location.pathname.startsWith('/ru')) {
            navigate(`/${savedLanguage}${location.pathname}`);
          }
        } else {
          // Default to English
          setLanguage('en');
          // Only redirect if we're not already on a language path
          if (!location.pathname.startsWith('/en') && !location.pathname.startsWith('/ru')) {
            navigate(`/en${location.pathname}`);
          }
        }
      }
    } catch (error) {
      console.error('Language initialization error:', error);
      // Fallback to English
      setLanguage('en');
    }
  }, [location.pathname, navigate, translations]);

  const value = {
    language,
    changeLanguage,
    t,
    translations
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}; 