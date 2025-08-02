// Localization utility for Lunqo app
const translations = {
  en: {
    // Hero section
    hero: {
      badge: "SmartSeat Media Platform",
      title: {
        part1: "Lunqo: ",
        part2: "Light-Up Ads",
        part3: "on the Go"
      },
      subtitle: "Unified control, real-time insights, effortless scaling for in-taxi media.",
      cta: {
        demo: "Schedule a Live Demo",
        watch: "Watch Overview"
      },
      stats: {
        fleets: "Fleets Served",
        impressions: "Daily Impressions", 
        cities: "Cities Covered",
        uptime: "Uptime"
      }
    },
    // Navbar
    navbar: {
      logo: "Lunqo",
      features: "Features",
      about: "About",
      contact: "Contact",
      login: "Login"
    },
    // Features
    features: {
      title: "Why Choose Lunqo?",
      subtitle: "Powerful features designed for modern fleet advertising",
      unified: {
        title: "Unified Digital Control",
        description: "Instant ad swap, geo/time targeting, and real-time campaign management across all your fleet screens."
      },
      analytics: {
        title: "Real-Time Analytics",
        description: "Live KPI tracking with impressions, riders, QR scans, and engagement metrics that update in real-time."
      },
      scaling: {
        title: "Fast Scaling & API Integration",
        description: "Plug-and-play setup with cloud uptime, seamless API integration, and rapid fleet expansion capabilities."
      },
      explore: "Explore Features"
    },
    // CTA Banner
    cta: {
      badge: "Ready to Transform Your Fleet?",
      title: {
        part1: "Ready to",
        part2: "Light Up",
        part3: "Your Fleet?"
      },
      subtitle: "Join hundreds of fleet owners who have already transformed their revenue with Lunqo's smart advertising platform.",
      buttons: {
        demo: "Schedule a Demo",
        contact: "Contact Sales"
      }
    },
    // Footer
    footer: {
      description: "Unified control, real-time insights, effortless scaling for in-taxi media.",
      links: {
        features: "Features",
        about: "About",
        contact: "Contact",
        privacy: "Privacy Policy",
        terms: "Terms of Service"
      },
      copyright: "© 2024 Lunqo. All rights reserved."
    }
  },
  ru: {
    // Hero section
    hero: {
      badge: "Платформа SmartSeat Media",
      title: {
        part1: "Lunqo: ",
        part2: "Светящаяся Реклама",
        part3: "в Движении"
      },
      subtitle: "Единое управление, аналитика в реальном времени, простое масштабирование для рекламы в такси.",
      cta: {
        demo: "Заказать Демо",
        watch: "Смотреть Обзор"
      },
      stats: {
        fleets: "Автопарков",
        impressions: "Показов в День",
        cities: "Городов",
        uptime: "Время Работы"
      }
    },
    // Navbar
    navbar: {
      logo: "Lunqo",
      features: "Возможности",
      about: "О Нас",
      contact: "Контакты",
      login: "Вход"
    },
    // Features
    features: {
      title: "Почему Lunqo?",
      subtitle: "Мощные возможности для современной рекламы в автопарках",
      unified: {
        title: "Единое Цифровое Управление",
        description: "Мгновенная смена рекламы, гео/временное таргетирование и управление кампаниями в реальном времени на всех экранах автопарка."
      },
      analytics: {
        title: "Аналитика в Реальном Времени",
        description: "Отслеживание KPI в реальном времени: показы, пассажиры, сканирования QR-кодов и метрики вовлеченности."
      },
      scaling: {
        title: "Быстрое Масштабирование и API",
        description: "Простая настройка с облачным временем работы, бесшовная интеграция API и возможности быстрого расширения автопарка."
      },
      explore: "Изучить Возможности"
    },
    // CTA Banner
    cta: {
      badge: "Готовы Преобразовать Ваш Автопарк?",
      title: {
        part1: "Готовы",
        part2: "Осветить",
        part3: "Ваш Автопарк?"
      },
      subtitle: "Присоединяйтесь к сотням владельцев автопарков, которые уже увеличили свой доход с помощью умной рекламной платформы Lunqo.",
      buttons: {
        demo: "Заказать Демо",
        contact: "Связаться с Продажами"
      }
    },
    // Footer
    footer: {
      description: "Единое управление, аналитика в реальном времени, простое масштабирование для рекламы в такси.",
      links: {
        features: "Возможности",
        about: "О Нас",
        contact: "Контакты",
        privacy: "Политика Конфиденциальности",
        terms: "Условия Использования"
      },
      copyright: "© 2024 Lunqo. Все права защищены."
    }
  }
};

// Language detection utility
export const detectLanguage = () => {
  // Check URL path first
  const path = window.location.pathname;
  if (path.startsWith('/ru')) return 'ru';
  if (path.startsWith('/en')) return 'en';
  
  // Check browser language
  const browserLang = navigator.language || navigator.userLanguage;
  if (browserLang.startsWith('ru')) return 'ru';
  
  // Default to English
  return 'en';
};

// Get translation function
export const t = (key, lang = null) => {
  const language = lang || detectLanguage();
  const keys = key.split('.');
  let value = translations[language];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to English if translation not found
      value = translations.en;
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = value[fallbackKey];
        } else {
          return key; // Return key if translation not found
        }
      }
    }
  }
  
  return value || key;
};

// Redirect to appropriate language version
export const redirectToLanguage = (language) => {
  const currentPath = window.location.pathname;
  const newPath = currentPath.replace(/^\/(en|ru)/, '') || '/';
  window.location.href = `/${language}${newPath}`;
};

export default translations; 