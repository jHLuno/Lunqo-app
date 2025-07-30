# Release Notes - v0.0.1

## 🚀 What's New

### Fixed CORS Configuration
- **Enhanced CORS settings** for better development and production compatibility
- **Added support for multiple localhost ports** (3000, 4000) and IP addresses
- **Improved error logging** for blocked CORS origins during development
- **Maintained production security** with strict CORS policies

### Fixed API Connection Issues
- **Resolved connection refused errors** when accessing admin panel
- **Updated all frontend API calls** to use production server URL
- **Eliminated hardcoded localhost URLs** from frontend files
- **Improved cross-origin request handling**

## 🔧 Technical Changes

### Backend (server.js)
```javascript
// Enhanced CORS configuration
const allowedOrigins = [
  'http://localhost:4000', 
  'http://localhost:3000',
  'http://127.0.0.1:4000',
  'http://127.0.0.1:3000',
  'https://lunqo.app'
];

// Added debugging for blocked origins
console.log('CORS blocked origin:', origin);
```

### Frontend Files Updated
- **admin.html**: Updated API base URL to use production server
- **brand.html**: Fixed brand API endpoints
- **screen.html**: Updated screen and stats API calls

### API URL Changes
```javascript
// Before: Hardcoded localhost
const API = 'http://localhost:4000/api/admin';

// After: Production server
const API = 'https://lunqo.app/api/admin';
```

## 🐛 Bug Fixes

### Fixed Issues
- ✅ **ERR_CONNECTION_REFUSED errors** when accessing admin panel
- ✅ **CORS policy violations** blocking legitimate requests
- ✅ **API calls failing** due to incorrect URLs
- ✅ **Cross-origin issues** between frontend and backend

### Resolved Error Messages
- `Failed to load resource: net::ERR_CONNECTION_REFUSED`
- `Error: Not allowed by CORS`
- `TypeError: Failed to fetch`

## 🚨 Breaking Changes

### Important Notes
- **Admin panel must be accessed from production URL**: `https://lunqo.app/admin.html`
- **Localhost access requires local server** running on port 4000
- **Environment variables** for `ALLOWED_ORIGINS` still supported for production customization

## 🔄 Migration Guide

### For Developers
1. **Clear browser cache** after updating files
2. **Use production URL** for admin panel access
3. **Set environment variables** for custom CORS origins in production

### For Production Deployment
1. **No changes required** - existing environment variables still work
2. **CORS is now more permissive** for development but maintains security
3. **API endpoints remain unchanged**

## 📋 Files Modified

### Backend
- `server.js` - Enhanced CORS configuration

### Frontend
- `public/admin.html` - Updated API URLs
- `public/brand.html` - Fixed brand endpoints
- `public/screen.html` - Updated screen and stats endpoints

## 🎯 Impact

### User Experience
- **Admin panel now works correctly** from production URL
- **Brand creation and management** functions properly
- **No more connection errors** when using the application

### Developer Experience
- **Better error messages** for debugging CORS issues
- **Simplified API configuration** with production-first approach
- **Maintained flexibility** for local development

## 🔮 Future Considerations

### Planned Improvements
- [ ] Add environment-based API URL configuration
- [ ] Implement proper error handling for network issues
- [ ] Add retry logic for failed API calls
- [ ] Consider implementing API health checks

### Security Notes
- CORS configuration maintains security for production
- Environment variables still recommended for sensitive configurations
- No sensitive data exposed in frontend code

---

**Release Date**: December 2024  
**Version**: 1.1.0  
**Compatibility**: All existing deployments  
**Breaking Changes**: None (backward compatible) 