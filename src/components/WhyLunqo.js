import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Zap, Shield, TrendingUp, Clock, Users } from 'lucide-react';

const WhyLunqo = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '100px',
  });

  const benefits = [
    {
      icon: Zap,
      title: 'Lightning Fast Setup',
      description: 'Get your fleet online in under 24 hours with our plug-and-play installation process.',
      roi: 'Reduce setup time by 80%'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and compliance with industry standards for data protection.',
      roi: 'Zero security incidents'
    },
    {
      icon: TrendingUp,
      title: 'Proven ROI',
      description: 'Average 3x revenue increase for fleet owners and 40% higher engagement for advertisers.',
      roi: '3x revenue increase'
    },
    {
      icon: Clock,
      title: '24/7 Uptime',
      description: '99.9% uptime guarantee with automatic failover and real-time monitoring.',
      roi: '99.9% uptime SLA'
    },
    {
      icon: Users,
      title: 'Captive Audience',
      description: 'Reach riders during their journey with no ad blockers or distractions.',
      roi: '40% higher engagement'
    },
    {
      icon: Zap,
      title: 'Real-Time Control',
      description: 'Update campaigns instantly across all screens with our unified dashboard.',
      roi: 'Instant campaign updates'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="advantages" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Why Choose
            <span className="gradient-text"> Lunqo</span>
          </h2>
          <p className="text-lg text-dark-300 max-w-3xl mx-auto">
            Built for the modern digital advertising landscape with proven results and enterprise-grade reliability.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              variants={itemVariants}
              className="card group relative overflow-hidden"
              whileHover={{ 
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              {/* Neon Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-blue via-primary-lime to-primary-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Icon */}
              <motion.div
                className="w-16 h-16 rounded-2xl bg-primary-blue/10 border border-primary-blue/20 flex items-center justify-center mb-6 group-hover:bg-primary-blue/20 group-hover:border-primary-blue/40 transition-all duration-300"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5
                }}
              >
                <benefit.icon className="w-8 h-8 text-primary-blue" />
              </motion.div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-dark-300 leading-relaxed mb-4 group-hover:text-dark-200 transition-colors duration-300">
                  {benefit.description}
                </p>
                
                {/* ROI Badge */}
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 rounded-full bg-primary-lime/20 border border-primary-lime/30 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-lime" />
                  </div>
                  <span className="text-sm font-medium text-primary-lime">
                    {benefit.roi}
                  </span>
                </div>
              </div>

              {/* Hover Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 via-primary-lime/5 to-primary-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { label: 'Fleets Trust Us', value: '500+' },
            { label: 'Cities Covered', value: '25+' },
            { label: 'Daily Impressions', value: '2.5M+' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="text-3xl lg:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-dark-300 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            See Results for Yourself
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyLunqo; 