# Multilingual Setup for Lunqo App

This document explains how the multilingual system works in the Lunqo application.

## Overview

The application now supports two language versions:
- **English** (`/en`) - Default for worldwide users
- **Russian** (`/ru`) - For CIS (Commonwealth of Independent States) countries

## How It Works

### 1. Automatic Language Detection

The system automatically detects the user's preferred language based on:
1. **URL Path** - If user visits `/ru` or `/en` directly
2. **Browser Language** - Checks `navigator.language`
3. **Geographic Location** - Uses IP geolocation to detect CIS countries
4. **Default Fallback** - English if no other preference is detected

### 2. CIS Countries Supported

The following countries are automatically redirected to the Russian version:
- Russia (RU)
- Kazakhstan (KZ)
- Belarus (BY)
- Kyrgyzstan (KG)
- Tajikistan (TJ)
- Uzbekistan (UZ)
- Azerbaijan (AZ)
- Armenia (AM)
- Georgia (GE)
- Moldova (MD)
- Turkmenistan (TM)

### 3. URL Structure

- `/` - Redirects to `/en` (English default)
- `/en` - English version
- `/ru` - Russian version
- `/en/*` - Any sub-pages in English
- `/ru/*` - Any sub-pages in Russian

## Implementation Details

### Localization System

The localization is handled by `src/utils/localization.js`:

```javascript
import { t } from '../utils/localization';

// Usage in components
const title = t('hero.title.part1'); // Returns localized text
```

### Translation Structure

Translations are organized in a nested object structure:

```javascript
{
  en: {
    hero: {
      title: { part1: "Lunqo: ", part2: "Light-Up Ads", part3: "on the Go" },
      subtitle: "Unified control, real-time insights...",
      // ...
    }
  },
  ru: {
    hero: {
      title: { part1: "Lunqo: ", part2: "Светящаяся Реклама", part3: "в Движении" },
      subtitle: "Единое управление, аналитика в реальном времени...",
      // ...
    }
  }
}
```

### Geo-Detection

Location detection is handled by `src/utils/geoDetection.js` using the free `ipapi.co` service.

## Adding New Translations

### 1. Add to Localization File

Add new translation keys to `src/utils/localization.js`:

```javascript
// In the translations object
en: {
  newSection: {
    title: "English Title",
    description: "English description"
  }
},
ru: {
  newSection: {
    title: "Русский Заголовок",
    description: "Русское описание"
  }
}
```

### 2. Use in Components

```javascript
import { t } from '../utils/localization';

// In your component
<h1>{t('newSection.title')}</h1>
<p>{t('newSection.description')}</p>
```

## Server Configuration

The server (`server.js`) is configured to handle client-side routing:

```javascript
// Handle client-side routing for React app
app.get(['/en', '/ru', '/en/*', '/ru/*'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
```

## Development

### Running the Application

1. **Development mode:**
   ```bash
   npm run dev          # Backend server
   npm run dev:client   # Frontend development server
   ```

2. **Production build:**
   ```bash
   npm run build
   npm start
   ```

### Testing Different Languages

- Visit `http://localhost:3000/en` for English version
- Visit `http://localhost:3000/ru` for Russian version
- Visit `http://localhost:3000/` to test automatic redirection

## SEO Considerations

- Each language version has its own URL structure
- Search engines can properly index both versions
- No language switcher needed - automatic detection handles user preferences

## Future Enhancements

Potential improvements:
- Add more languages (Chinese, Spanish, etc.)
- Implement language preference cookies
- Add language-specific meta tags for SEO
- Create language-specific sitemaps 