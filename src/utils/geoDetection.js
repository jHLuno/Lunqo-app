// Geo-location detection utility for automatic language routing

// CIS countries list
const CIS_COUNTRIES = [
  'RU', // Russia
  'KZ', // Kazakhstan
  'BY', // Belarus
  'KG', // Kyrgyzstan
  'TJ', // Tajikistan
  'UZ', // Uzbekistan
  'AZ', // Azerbaijan
  'AM', // Armenia
  'GE', // Georgia
  'MD', // Moldova
  'TM', // Turkmenistan
];

// Detect if user is from CIS region
export const isCISCountry = (countryCode) => {
  return CIS_COUNTRIES.includes(countryCode?.toUpperCase());
};

// Get user's country from IP (using a free service)
export const getUserCountry = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }
    
    const data = await response.json();
    return data.country_code;
  } catch (error) {
    console.warn('Could not detect user location:', error);
    return null;
  }
};

// Determine preferred language based on location and browser settings
export const getPreferredLanguage = async () => {
  // First check if user has already been redirected (check URL)
  const path = window.location.pathname;
  if (path.startsWith('/ru')) return 'ru';
  if (path.startsWith('/en')) return 'en';
  
  // Check browser language
  const browserLang = navigator.language || navigator.userLanguage;
  if (browserLang.startsWith('ru')) return 'ru';
  
  // Check user's country
  try {
    const countryCode = await getUserCountry();
    if (isCISCountry(countryCode)) {
      return 'ru';
    }
  } catch (error) {
    console.warn('Could not determine country, using default language');
  }
  
  // Default to English
  return 'en';
};

// Auto-redirect to appropriate language version
export const autoRedirectToLanguage = async () => {
  const preferredLang = await getPreferredLanguage();
  const currentPath = window.location.pathname;
  
  // Only redirect if we're on the root path
  if (currentPath === '/' || currentPath === '') {
    window.location.href = `/${preferredLang}`;
  }
};

export default {
  isCISCountry,
  getUserCountry,
  getPreferredLanguage,
  autoRedirectToLanguage,
}; 