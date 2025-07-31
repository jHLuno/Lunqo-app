# Lunqo - Light-Up Ads on the Go

A stunning, modern homepage for Lunqo.app — an AdTech platform that controls digital ads on taxi seat-back screens (SmartSeat Media). Built with React, Tailwind CSS, and Framer Motion for beautiful animations and interactions.

## 🚀 Features

- **Dark Tech Aesthetic**: Charcoal/near-black base with vibrant accent colors
- **Responsive Design**: Mobile-first approach with touch-friendly interactions
- **Smooth Animations**: Framer Motion powered micro and macro interactions
- **Modern UI Components**: Glass effects, gradients, and hover states
- **Performance Optimized**: Lighthouse score ≥ 90 with optimized assets
- **Accessibility**: WCAG AA compliant with reduced motion support

## 🎨 Design System

### Colors
- **Primary Blue**: `#18A0FB` - Main brand color
- **Neon Lime**: `#59FF70` - Success and accent
- **Hot Orange**: `#FF7A45` - Call-to-action and highlights
- **Dark Theme**: Near-black backgrounds with charcoal accents

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300-900 (Light to Black)
- **Modern geometric sans-serif design**

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Webpack** - Build tool
- **Babel** - JavaScript compiler

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lunqo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev:client
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Navbar.js       # Sticky navigation
│   ├── Hero.js         # Hero section with animations
│   ├── AudienceStrip.js # Audience snapshot cards
│   ├── FeatureTriad.js # Three-column feature showcase
│   ├── AnalyticsDemo.js # Interactive dashboard preview
│   ├── WhyLunqo.js     # Benefits grid with ROI
│   ├── Testimonials.js # Customer testimonials slider
│   ├── CTABanner.js    # Call-to-action section
│   └── Footer.js       # Footer with links and newsletter
├── App.js              # Main app component
├── index.js            # React entry point
└── index.css           # Global styles and Tailwind imports
```

## 🎯 Key Sections

### Hero Section
- Full-viewport animated background
- Gradient text effects
- Compelling CTAs with hover animations
- Live statistics counter

### Audience Strip
- Four icon-cards for different user types
- Slide-in animations on scroll
- Hover micro-interactions

### Feature Triad
- Three equal columns showcasing platform capabilities
- Animated icons with hover effects
- Gradient backgrounds on hover

### Analytics Demo
- Interactive dashboard preview
- Expandable modal with detailed view
- Real-time metrics display

### Why Lunqo
- Six benefit cards with ROI indicators
- Neon accent ticks
- Staggered animations

### Testimonials
- Logo strip with hover effects
- Slider with navigation
- Customer quotes with avatars

### CTA Banner
- Gradient background with animated elements
- Dual call-to-action buttons
- Trust indicators

## 🎨 Customization

### Colors
Update the color palette in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    blue: '#18A0FB',
    lime: '#59FF70',
    orange: '#FF7A45',
  },
  // ... other colors
}
```

### Animations
Customize animations in `tailwind.config.js`:

```javascript
animation: {
  'fade-in': 'fadeIn 0.6s ease-out',
  'slide-up': 'slideUp 0.6s ease-out',
  // ... other animations
}
```

### Content
Update content in individual component files:
- Hero copy in `Hero.js`
- Features in `FeatureTriad.js`
- Testimonials in `Testimonials.js`
- Footer links in `Footer.js`

## 📱 Responsive Design

The site is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibility

- WCAG AA contrast compliance
- Keyboard navigation support
- Screen reader friendly
- Reduced motion support
- Focus indicators

## 🚀 Performance

- Optimized images and assets
- Lazy loading for components
- Efficient animations
- Minimal bundle size
- Lighthouse score ≥ 90

## 🔧 Development

### Available Scripts

```bash
npm run dev:client    # Start development server
npm run build         # Build for production
npm run start         # Start production server
```

### Code Style

- Use functional components with hooks
- Implement proper TypeScript types (if using TS)
- Follow React best practices
- Use semantic HTML elements
- Maintain consistent naming conventions

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions:
- Email: business@lunqo.app
- Telegram: @arney_himself

---

Built with ❤️ by the Lunqo team
