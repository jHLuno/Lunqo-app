import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Car, Building2, Users, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/localization';

const AudienceStrip = () => {
  const { language } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '50px',
  });

  // Memoized audiences data
  const audiences = useMemo(() => [
    {
      icon: Car,
      title: translations[language]?.taxiCompanies || 'Taxi Companies',
      benefit: 'Maximize revenue per vehicle',
      color: 'primary-blue'
    },
    {
      icon: Building2,
      title: translations[language]?.rideSharing || 'Ride-Sharing',
      benefit: 'Reach captive audiences',
      color: 'primary-lime'
    },
    {
      icon: Users,
      title: translations[language]?.fleetOperators || 'Fleet Operators',
      benefit: 'Scale campaigns effortlessly',
      color: 'primary-orange'
    },
    {
      icon: TrendingUp,
      title: translations[language]?.transportServices || 'Transport Services',
      benefit: 'High-growth adtech opportunity',
      color: 'primary-blue'
    }
  ], [language]);

  // Memoized animation variants
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }), []);

  const cardVariants = useMemo(() => ({
    whileHover: { 
      y: -8,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  }), []);

  const iconVariants = useMemo(() => ({
    whileHover: { 
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  }), []);

  return (
    <section className="section-padding bg-dark-800/20">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              variants={itemVariants}
              className="card group cursor-pointer gpu-accelerated"
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: "easeInOut" }
              }}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-${audience.color}/10 border border-${audience.color}/20 flex items-center justify-center group-hover:bg-${audience.color}/20 group-hover:border-${audience.color}/40 transition-all duration-300 gpu-accelerated`}
                  variants={iconVariants}
                  whileHover="whileHover"
                >
                  <audience.icon 
                    className={`w-8 h-8 text-${audience.color}`} 
                  />
                </motion.div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {audience.title}
                  </h3>
                  <p className="text-sm text-dark-300 leading-relaxed">
                    {audience.benefit}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(AudienceStrip); 