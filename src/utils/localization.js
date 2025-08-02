// CIS countries list for Russian language detection
const CIS_COUNTRIES = [
  'RU', // Russia
  'BY', // Belarus
  'KZ', // Kazakhstan
  'KG', // Kyrgyzstan
  'TJ', // Tajikistan
  'UZ', // Uzbekistan
  'AZ', // Azerbaijan
  'AM', // Armenia
  'GE', // Georgia
  'MD', // Moldova
  'TM', // Turkmenistan
];

// Language detection based on location
export const detectLanguage = () => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return 'en'; // Default to English for SSR
  }

  // Check for stored language preference
  const storedLang = localStorage.getItem('lunqo-language');
  if (storedLang) {
    return storedLang;
  }

  // Try to detect language from browser
  const browserLang = navigator.language || navigator.userLanguage;
  if (browserLang && browserLang.startsWith('ru')) {
    return 'ru';
  }

  // Check for CIS country codes in browser language
  const countryCode = browserLang?.split('-')[1]?.toUpperCase();
  if (countryCode && CIS_COUNTRIES.includes(countryCode)) {
    return 'ru';
  }

  // Default to English
  return 'en';
};

// Store language preference
export const setLanguage = (language) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('lunqo-language', language);
  }
};

// Translation data
export const translations = {
  en: {
    // Navbar
    solutions: 'Solutions',
    analytics: 'Analytics',
    advantages: 'Advantages',
    testimonials: 'Testimonials',
    contactUs: 'Contact us',
    bookDemo: 'Book a Demo',

    // Hero Section
    smartSeatMedia: 'SmartSeat Media Platform',
    heroTitle: 'Lunqo: Light-Up Ads on the Go',
    heroSubtitle: 'Unified control, real-time insights, effortless scaling for in-taxi media.',
    scheduleDemo: 'Schedule a Live Demo',
    watchOverview: 'Watch Overview',
    
    // Stats
    fleetsServed: 'Fleets Served',
    dailyImpressions: 'Daily Impressions',
    citiesCovered: 'Cities Covered',
    uptime: 'Uptime',

    // Audience Strip
    audienceTitle: 'Who We Serve',
    taxiCompanies: 'Taxi Companies',
    rideSharing: 'Ride-Sharing',
    fleetOperators: 'Fleet Operators',
    transportServices: 'Transport Services',

    // Feature Triad
    featuresTitle: 'Why Choose Lunqo',
    unifiedControl: 'Unified Control',
    unifiedControlDesc: 'Manage all your taxi screens from one dashboard',
    realTimeInsights: 'Real-Time Insights',
    realTimeInsightsDesc: 'Track performance and engagement instantly',
    effortlessScaling: 'Effortless Scaling',
    effortlessScalingDesc: 'Expand your network without complexity',

    // Analytics Demo
    analyticsTitle: 'Powerful Analytics',
    analyticsSubtitle: 'See your performance in real-time',
    impressions: 'Impressions',
    engagement: 'Engagement',
    revenue: 'Revenue',
    efficiency: 'Efficiency',

    // Why Lunqo
    whyLunqoTitle: 'Why Choose Lunqo',
    whyLunqoSubtitle: 'The smart choice for taxi advertising',
    innovation: 'Innovation',
    innovationDesc: 'Cutting-edge technology for modern advertising',
    reliability: 'Reliability',
    reliabilityDesc: '99.9% uptime guaranteed',
    support: 'Support',
    supportDesc: '24/7 expert support team',

    // Testimonials
    testimonialsTitle: 'What Our Clients Say',
    testimonialsSubtitle: 'Trusted by leading transport companies',

    // CTA Banner
    ctaTitle: 'Ready to Transform Your Fleet?',
    ctaSubtitle: 'Join hundreds of companies already using Lunqo',
    getStarted: 'Get Started Today',
    learnMore: 'Learn More',

    // Footer
    footerDescription: 'Unified control, real-time insights, effortless scaling for in-taxi media.',
    company: 'Company',
    about: 'About',
    careers: 'Careers',
    contact: 'Contact',
    solutions: 'Solutions',
    taxiAdvertising: 'Taxi Advertising',
    fleetManagement: 'Fleet Management',
    analytics: 'Analytics',
    support: 'Support',
    helpCenter: 'Help Center',
    documentation: 'Documentation',
    legal: 'Legal',
    privacy: 'Privacy',
    terms: 'Terms',
    allRightsReserved: 'All rights reserved.',
  },
  ru: {
    // Navbar
    solutions: 'Решения',
    analytics: 'Аналитика',
    advantages: 'Преимущества',
    testimonials: 'Отзывы',
    contactUs: 'Связаться с нами',
    bookDemo: 'Заказать демо',

    // Hero Section
    smartSeatMedia: 'Платформа SmartSeat Media',
    heroTitle: 'Lunqo: Светящаяся реклама в движении',
    heroSubtitle: 'Единое управление, аналитика в реальном времени, простое масштабирование для медиа в такси.',
    scheduleDemo: 'Запланировать демо',
    watchOverview: 'Смотреть обзор',
    
    // Stats
    fleetsServed: 'Обслуживаемых парков',
    dailyImpressions: 'Показов в день',
    citiesCovered: 'Городов',
    uptime: 'Время работы',

    // Audience Strip
    audienceTitle: 'Кому мы служим',
    taxiCompanies: 'Таксомоторные компании',
    rideSharing: 'Сервисы каршеринга',
    fleetOperators: 'Операторы автопарков',
    transportServices: 'Транспортные услуги',

    // Feature Triad
    featuresTitle: 'Почему выбирают Lunqo',
    unifiedControl: 'Единое управление',
    unifiedControlDesc: 'Управляйте всеми экранами такси из одной панели',
    realTimeInsights: 'Аналитика в реальном времени',
    realTimeInsightsDesc: 'Отслеживайте производительность и вовлеченность мгновенно',
    effortlessScaling: 'Простое масштабирование',
    effortlessScalingDesc: 'Расширяйте сеть без сложностей',

    // Analytics Demo
    analyticsTitle: 'Мощная аналитика',
    analyticsSubtitle: 'Смотрите вашу производительность в реальном времени',
    impressions: 'Показы',
    engagement: 'Вовлеченность',
    revenue: 'Доход',
    efficiency: 'Эффективность',

    // Why Lunqo
    whyLunqoTitle: 'Почему выбирают Lunqo',
    whyLunqoSubtitle: 'Умный выбор для рекламы в такси',
    innovation: 'Инновации',
    innovationDesc: 'Современные технологии для современной рекламы',
    reliability: 'Надежность',
    reliabilityDesc: 'Гарантированное время работы 99.9%',
    support: 'Поддержка',
    supportDesc: 'Экспертная поддержка 24/7',

    // Testimonials
    testimonialsTitle: 'Что говорят наши клиенты',
    testimonialsSubtitle: 'Доверяют ведущие транспортные компании',

    // CTA Banner
    ctaTitle: 'Готовы трансформировать ваш автопарк?',
    ctaSubtitle: 'Присоединяйтесь к сотням компаний, уже использующих Lunqo',
    getStarted: 'Начать сегодня',
    learnMore: 'Узнать больше',

    // Footer
    footerDescription: 'Единое управление, аналитика в реальном времени, простое масштабирование для медиа в такси.',
    company: 'Компания',
    about: 'О нас',
    careers: 'Карьера',
    contact: 'Контакты',
    solutions: 'Решения',
    taxiAdvertising: 'Реклама в такси',
    fleetManagement: 'Управление автопарком',
    analytics: 'Аналитика',
    support: 'Поддержка',
    helpCenter: 'Центр помощи',
    documentation: 'Документация',
    legal: 'Правовая информация',
    privacy: 'Конфиденциальность',
    terms: 'Условия',
    allRightsReserved: 'Все права защищены.',
  }
};

import React from 'react';

// Translation hook
export const useTranslation = () => {
  const [language, setLanguageState] = React.useState(detectLanguage);

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    setLanguageState(newLanguage);
  };

  return { t, language, changeLanguage };
}; 