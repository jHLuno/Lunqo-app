import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap, BarChart3, Rocket } from 'lucide-react';

const FeatureTriad = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: Zap,
      title: 'Unified Digital Control',
      description: 'Instant ad swap, geo/time targeting, and real-time campaign management across all your fleet screens.',
      color: 'primary-blue',
      gradient: 'from-primary-blue to-blue-600'
    },
    {
      icon: BarChart3,
      title: 'Real-Time Analytics',
      description: 'Live KPI tracking with impressions, riders, QR scans, and engagement metrics that update in real-time.',
      color: 'primary-lime',
      gradient: 'from-primary-lime to-green-500'
    },
    {
      icon: Rocket,
      title: 'Fast Scaling & API Integration',
      description: 'Plug-and-play setup with cloud uptime, seamless API integration, and rapid fleet expansion capabilities.',
      color: 'primary-orange',
      gradient: 'from-primary-orange to-orange-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="solutions" className="section-padding bg-near-black">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            The Ultimate Toolkit for
            <span className="gradient-text"> In-Taxi Media</span>
          </h2>
          <p className="text-lg text-dark-300 max-w-3xl mx-auto">
            Everything you need to control, analyze, and scale your digital advertising across taxi fleets.
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
              className="card group relative overflow-hidden"
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              {/* Icon */}
              <motion.div
                className={`w-20 h-20 rounded-3xl bg-${feature.color}/10 border border-${feature.color}/20 flex items-center justify-center mb-6 group-hover:bg-${feature.color}/20 group-hover:border-${feature.color}/40 transition-all duration-300`}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5
                }}
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
              <div className={`absolute inset-0 rounded-2xl border border-transparent group-hover:border-${feature.color}/30 transition-all duration-300`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All Features
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureTriad; 