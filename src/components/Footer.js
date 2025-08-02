import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Twitter, Linkedin, Github } from 'lucide-react';
import lunqoLogo from '../Lunqo-white.png';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/localization';

const Footer = () => {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: translations[language]?.solutions || 'Features', href: '#features' },
      { name: translations[language]?.analytics || 'Analytics', href: '#analytics' },
      { name: 'API Docs', href: '#api' },
      { name: 'Pricing', href: '#pricing' }
    ],
    company: [
      { name: translations[language]?.about || 'About', href: '#about' },
      { name: translations[language]?.careers || 'Careers', href: '#careers' },
      { name: 'Blog', href: '#blog' },
      { name: 'Press', href: '#press' }
    ],
    support: [
      { name: translations[language]?.helpCenter || 'Help Center', href: '#help' },
      { name: translations[language]?.contact || 'Contact', href: '#contact' },
      { name: 'Status', href: '#status' },
      { name: translations[language]?.documentation || 'Documentation', href: '#docs' }
    ],
    legal: [
      { name: translations[language]?.privacy || 'Privacy Policy', href: '#privacy' },
      { name: translations[language]?.terms || 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'GDPR', href: '#gdpr' }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' }
  ];

  return (
    <footer id="footer" className="bg-black/90 border-t border-dark-700/50 relative">
      {/* Smooth transition from testimonials */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-black/10 to-black/90 pointer-events-none" />
      
      <div className="container-custom py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                                    <img
                      src={lunqoLogo}
                      alt="Lunqo Logo"
                      className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20"
                      onError={(e) => console.error('Footer logo failed to load:', e.target.src)}
                      onLoad={() => console.log('Footer logo loaded successfully')}
                    />
              </div>
              
              <p className="text-dark-300 mb-6 leading-relaxed">
                {translations[language]?.footerDescription || 'Unified control, real-time insights, effortless scaling for in-taxi media. Transforming how fleet owners and advertisers connect with captive audiences.'}
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-dark-300">
                  <Mail className="w-4 h-4 text-primary-blue" />
                  <span>business@lunqo.app</span>
                </div>
                <div className="flex items-center space-x-3 text-dark-300">
                  <Phone className="w-4 h-4 text-primary-blue" />
                  <span>+7 (707) 212-4410</span>
                </div>
                <div className="flex items-center space-x-3 text-dark-300">
                  <MapPin className="w-4 h-4 text-primary-blue" />
                  <span>Almaty, Kazakhstan</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(footerLinks).map(([category, links]) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-white font-semibold mb-4 capitalize">
                    {category}
                  </h3>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-dark-300 hover:text-primary-blue transition-colors duration-200 text-sm"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-dark-700/50"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-semibold mb-2">Stay Updated</h3>
              <p className="text-dark-300 text-sm">
                Get the latest updates on new features and industry insights.
              </p>
            </div>
            
            <div className="flex w-full lg:w-auto">
              <div className="flex-1 lg:flex-none">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-dark-800 border border-dark-700 text-white placeholder-dark-400 px-4 py-3 rounded-l-xl focus:outline-none focus:border-primary-blue transition-colors duration-200"
                  />
                  <button className="bg-primary-blue hover:bg-blue-600 text-white px-6 py-3 rounded-r-xl transition-colors duration-200 font-medium">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-dark-700/50"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-dark-400 text-sm">
              © {currentYear} Lunqo. {translations[language]?.allRightsReserved || 'All rights reserved.'}
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-dark-800 border border-dark-700 rounded-lg flex items-center justify-center text-dark-300 hover:text-primary-blue hover:border-primary-blue/30 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 