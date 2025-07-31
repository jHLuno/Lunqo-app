import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Analytics', href: '#analytics' },
      { name: 'API Docs', href: '#api' },
      { name: 'Pricing', href: '#pricing' }
    ],
    company: [
      { name: 'About', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Blog', href: '#blog' },
      { name: 'Press', href: '#press' }
    ],
    support: [
      { name: 'Help Center', href: '#help' },
      { name: 'Contact', href: '#contact' },
      { name: 'Status', href: '#status' },
      { name: 'Documentation', href: '#docs' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
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
    <footer className="bg-near-black border-t border-dark-800">
      {/* Neon Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary-blue to-transparent opacity-50" />
      
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
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="/images/Lunqo.svg" 
                  alt="Lunqo Logo" 
                  className="w-8 h-8"
                />
                <span className="text-xl font-bold text-white">Lunqo</span>
              </div>
              
              <p className="text-dark-300 mb-6 leading-relaxed">
                Unified control, real-time insights, effortless scaling for in-taxi media. 
                Transforming how fleet owners and advertisers connect with captive audiences.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-dark-300">
                  <Mail className="w-4 h-4 text-primary-blue" />
                  <span>hello@lunqo.app</span>
                </div>
                <div className="flex items-center space-x-3 text-dark-300">
                  <Phone className="w-4 h-4 text-primary-blue" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-dark-300">
                  <MapPin className="w-4 h-4 text-primary-blue" />
                  <span>San Francisco, CA</span>
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
          className="mt-12 pt-8 border-t border-dark-800"
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
          className="mt-8 pt-8 border-t border-dark-800"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-dark-400 text-sm">
              © {currentYear} Lunqo. All rights reserved.
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