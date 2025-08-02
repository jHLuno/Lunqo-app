# Lunqo Localization System

This document explains how the localization system works in the Lunqo application.

## Overview

The Lunqo website now supports two languages:
- **English (EN)** - Default language for the whole world
- **Russian (RU)** - For CIS (Commonwealth of Independent States) countries

## How It Works

### 1. Language Detection

The system automatically detects the user's preferred language based on:

1. **Stored Preference**: If the user has previously selected a language, it's stored in localStorage
2. **Browser Language**: Checks if the browser language starts with 'ru'
3. **CIS Country Detection**: Checks if the browser's country code is in the CIS list:
   - RU (Russia), BY (Belarus), KZ (Kazakhstan), KG (Kyrgyzstan)
   - TJ (Tajikistan), UZ (Uzbekistan), AZ (Azerbaijan), AM (Armenia)
   - GE (Georgia), MD (Moldova), TM (Turkmenistan)
4. **Default**: Falls back to English if no other criteria match

### 2. Language Switching

Users can manually switch between languages using the language switcher in the navigation bar:
- **Desktop**: Located in the top-right corner of the navbar
- **Mobile**: Available in the mobile menu

### 3. Translation System

#### File Structure
```
src/
├── utils/
│   └── localization.js          # Translation data and utilities
├── contexts/
│   └── LanguageContext.js       # React context for language state
└── components/
    ├── LanguageSwitcher.js      # Language toggle component
    └── [other components]       # Updated to use translations
```

#### Translation Keys

All translatable text is organized by sections:

**Navigation**
- `solutions`, `analytics`, `advantages`, `testimonials`, `contactUs`, `bookDemo`

**Hero Section**
- `smartSeatMedia`, `heroTitle`, `heroSubtitle`, `scheduleDemo`, `watchOverview`

**Stats**
- `fleetsServed`, `dailyImpressions`, `citiesCovered`, `uptime`

**Audience Strip**
- `audienceTitle`, `taxiCompanies`, `rideSharing`, `fleetOperators`, `transportServices`

**Features**
- `featuresTitle`, `unifiedControl`, `unifiedControlDesc`, `realTimeInsights`, `realTimeInsightsDesc`, `effortlessScaling`, `effortlessScalingDesc`

**Analytics**
- `analyticsTitle`, `analyticsSubtitle`, `impressions`, `engagement`, `revenue`, `efficiency`

**Why Lunqo**
- `whyLunqoTitle`, `whyLunqoSubtitle`, `innovation`, `innovationDesc`, `reliability`, `reliabilityDesc`, `support`, `supportDesc`

**Testimonials**
- `testimonialsTitle`, `testimonialsSubtitle`

**CTA Banner**
- `ctaTitle`, `ctaSubtitle`, `getStarted`, `learnMore`

**Footer**
- `footerDescription`, `company`, `about`, `careers`, `contact`, `solutions`, `taxiAdvertising`, `fleetManagement`, `analytics`, `support`, `helpCenter`, `documentation`, `legal`, `privacy`, `terms`, `allRightsReserved`

## Usage

### In Components

```javascript
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/localization';

const MyComponent = () => {
  const { language } = useLanguage();
  
  return (
    <div>
      <h1>{translations[language]?.myTitle || 'Default Title'}</h1>
    </div>
  );
};
```

### Adding New Translations

1. Add the translation key to both language objects in `src/utils/localization.js`:

```javascript
export const translations = {
  en: {
    // ... existing translations
    newKey: 'English text',
  },
  ru: {
    // ... existing translations
    newKey: 'Русский текст',
  }
};
```

2. Use the key in your component:

```javascript
{translations[language]?.newKey || 'Fallback text'}
```

## Technical Implementation

### Language Context

The `LanguageContext` provides:
- `language`: Current language ('en' or 'ru')
- `changeLanguage(newLanguage)`: Function to change the language

### Localization Utilities

- `detectLanguage()`: Automatically detects the user's preferred language
- `setLanguage(language)`: Stores language preference in localStorage
- `translations`: Object containing all translation strings

### Performance Considerations

- Translations are memoized to prevent unnecessary re-renders
- Language detection happens only once on app initialization
- Language preference is cached in localStorage for faster subsequent loads

## Browser Support

The localization system works in all modern browsers that support:
- `localStorage` for preference storage
- `navigator.language` for language detection
- React Context API

## Future Enhancements

Potential improvements for the future:
1. Add more languages (e.g., Chinese, Spanish)
2. Implement server-side language detection
3. Add RTL (right-to-left) language support
4. Implement dynamic translation loading
5. Add translation management system for content updates 