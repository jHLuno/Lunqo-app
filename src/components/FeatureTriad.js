import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap, BarChart3, Rocket } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const FeatureTriad = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '100px',
  });

  // Memoized features data
  const features = useMemo(() => [
    {
      icon: Zap,
      title: t('features.unifiedControl.title'),
      description: t('features.unifiedControl.description'),
      color: 'primary-blue',
      gradient: 'from-primary-blue to-blue-600'
    },
    {
      icon: BarChart3,
      title: t('features.realTimeAnalytics.title'),
      description: t('features.realTimeAnalytics.description'),
      color: 'primary-lime',
      gradient: 'from-primary-lime to-green-500'
    },
    {
      icon: Rocket,
      title: t('features.fastScaling.title'),
      description: t('features.fastScaling.description'),
      color: 'primary-orange',
      gradient: 'from-primary-orange to-orange-500'
    }
  ], [t]);

  // Memoized animation variants
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }), []);

  const sectionVariants = useMemo(() => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  }), []);

  const ctaVariants = useMemo(() => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.8, duration: 0.8, ease: "easeOut" }
  }), []);

  const iconVariants = useMemo(() => ({
    whileHover: { 
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  }), []);

  const cardVariants = useMemo(() => ({
    whileHover: { 
      y: -10,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  }), []);

  // Optimized event handlers
  const handleExploreClick = useCallback(() => {
    // Explore click handler
    if (process.env.NODE_ENV !== 'production') {
  console.log('Explore features clicked');
}
  }, []);

  return (
    <section id="solutions" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          variants={sectionVariants}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            {t('features.title')}
          </h2>
          <p className="text-lg text-dark-300 max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="card group relative overflow-hidden gpu-accelerated"
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3, ease: "easeInOut" }
              }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 gpu-accelerated`} />
              
              {/* Icon */}
              <motion.div
                className={`w-20 h-20 rounded-3xl bg-${feature.color}/10 border border-${feature.color}/20 flex items-center justify-center mb-6 group-hover:bg-${feature.color}/20 group-hover:border-${feature.color}/40 transition-all duration-300 gpu-accelerated`}
                variants={iconVariants}
                whileHover="whileHover"
              >
                <feature.icon 
                  className={`w-10 h-10 text-${feature.color}`} 
                />
              </motion.div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-white transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-dark-300 leading-relaxed group-hover:text-dark-200 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>

              {/* Hover Effect Border */}
              <div className={`absolute inset-0 rounded-2xl border border-transparent group-hover:border-${feature.color}/30 transition-all duration-300 gpu-accelerated`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={ctaVariants}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className="text-center mt-16"
        >
          <motion.button
            className="btn-primary gpu-accelerated"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            onClick={handleExploreClick}
          >
            {t('features.exploreAll')}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(FeatureTriad); 