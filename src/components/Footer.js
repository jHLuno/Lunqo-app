import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Twitter, Linkedin, Github } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import lunqoLogo from '../Lunqo-white.png';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: t('footer.links.product.features'), href: t('urls.website') + '/features' },
      { name: t('footer.links.product.analytics'), href: t('urls.website') + '/analytics' },
      { name: t('footer.links.product.apiDocs'), href: t('urls.apiDocs') },
      { name: t('footer.links.product.pricing'), href: t('urls.pricing') }
    ],
    company: [
      { name: t('footer.links.company.about'), href: t('urls.about') },
      { name: t('footer.links.company.careers'), href: t('urls.careers') },
      { name: t('footer.links.company.blog'), href: t('urls.blog') },
      { name: t('footer.links.company.press'), href: t('urls.website') + '/press' }
    ],
    support: [
      { name: t('footer.links.support.helpCenter'), href: t('urls.helpCenter') },
      { name: t('footer.links.support.contact'), href: t('urls.contact') },
      { name: t('footer.links.support.status'), href: t('urls.status') },
      { name: t('footer.links.support.documentation'), href: t('urls.documentation') }
    ],
    legal: [
      { name: t('footer.links.legal.privacyPolicy'), href: t('urls.privacy') },
      { name: t('footer.links.legal.termsOfService'), href: t('urls.terms') },
      { name: t('footer.links.legal.cookiePolicy'), href: t('urls.cookies') },
      { name: t('footer.links.legal.gdpr'), href: t('urls.gdpr') }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/lunqoapp', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/lunqo', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/lunqo', label: 'GitHub' }
  ];

  return (
    <footer id="footer" className="relative">
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
                />
              </div>
              
              <p className="text-dark-300 mb-6 leading-relaxed">
                {t('footer.description')}
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-dark-300">
                  <Mail className="w-4 h-4 text-primary-blue" />
                  <a href={`mailto:${t('footer.contact.email')}`} className="hover:text-primary-blue transition-colors duration-200">
                    {t('footer.contact.email')}
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-dark-300">
                  <Phone className="w-4 h-4 text-primary-blue" />
                  <a href={`tel:${t('footer.contact.phone')}`} className="hover:text-primary-blue transition-colors duration-200">
                    {t('footer.contact.phone')}
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-dark-300">
                  <MapPin className="w-4 h-4 text-primary-blue" />
                  <span>{t('footer.contact.location')}</span>
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
                    {t(`footer.links.${category}.title`)}
                  </h3>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-dark-300 hover:text-primary-blue transition-colors duration-200 text-sm"
                          target="_blank"
                          rel="noopener noreferrer"
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
          className="mt-12 pt-8"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-semibold mb-2">{t('footer.newsletter.title')}</h3>
              <p className="text-dark-300 text-sm">
                {t('footer.newsletter.subtitle')}
              </p>
            </div>
            
            <div className="flex w-full lg:w-auto">
              <div className="flex-1 lg:flex-none">
                <div className="flex">
                  <input
                    type="email"
                    placeholder={t('footer.newsletter.placeholder')}
                    className="flex-1 bg-dark-800 border border-dark-700 text-white placeholder-dark-400 px-4 py-3 rounded-l-xl focus:outline-none focus:border-primary-blue transition-colors duration-200"
                  />
                  <button className="bg-primary-blue hover:bg-blue-600 text-white px-6 py-3 rounded-r-xl transition-colors duration-200 font-medium">
                    {t('footer.newsletter.subscribe')}
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
          className="mt-8 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-dark-400 text-sm">
              {t('footer.copyright').replace('{year}', currentYear)}
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-dark-800 border border-dark-700 rounded-lg flex items-center justify-center text-dark-300 hover:text-primary-blue hover:border-primary-blue/30 transition-all duration-200"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
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