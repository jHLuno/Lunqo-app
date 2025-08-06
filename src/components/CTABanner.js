import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Play } from 'lucide-react';

const CTABanner = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '100px',
  });

  return (
    <section id="cta-banner" className="relative overflow-hidden">
      {/* Gradient Background - Subtle Blue to Lime to Orange to Black */}
      <div className="absolute inset-x-0 top-0 h-[100px] pointer-events-none bg-[linear-gradient(135deg, #050505 0%, #0a0a0a 25%, #0d1117 50%, #161b22 75%, #1a1a2e 100%)]"></div>
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(0deg, #050505 0%, #0a0a0a 25%, #0d1117 50%, #161b22 75%, #1a1a2e 100%)]"></div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0d1117]/20 via-primary-lime/20 to-primary-orange/25"></div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent from-90% to-black"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-32 left-10 w-32 h-32 bg-primary-blue/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-32 right-10 w-40 h-40 bg-primary-orange/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding">
        <div className="container-custom">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
            >
              <div className="w-2 h-2 bg-primary-lime rounded-full animate-pulse" />
              <span className="text-sm text-white font-medium">Ready to Transform Your Fleet?</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Ready to
              <span className="gradient-text"> Light Up</span>
              <br />
              Your Fleet?
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Join hundreds of fleet owners who have already transformed their revenue with Lunqo's smart advertising platform.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <motion.button
                className="bg-white text-near-black hover:bg-gray-100 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get Started Today</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-5 h-5" />
                <span>Watch 60-sec Overview</span>
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-white/60 text-sm"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-lime rounded-full" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-lime rounded-full" />
                <span>24/7 support</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-lime rounded-full" />
                <span>30-day guarantee</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>


    </section>
  );
};

export default CTABanner; 