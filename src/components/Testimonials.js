import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const logos = [
    'Yellow Cab', 'Uber', 'Lyft', 'TaxiCo', 'CityRide', 'MetroTaxi'
  ];

  const testimonials = [
    {
      quote: "Lunqo transformed our fleet revenue. We're seeing 3x more income per vehicle with zero additional overhead.",
      author: "Sarah Chen",
      role: "CEO",
      company: "MetroTaxi Fleet",
      avatar: "MC"
    },
    {
      quote: "The real-time analytics and instant campaign updates have revolutionized how we manage our advertising strategy.",
      author: "Michael Rodriguez",
      role: "Marketing Director",
      company: "CityRide Services",
      avatar: "MR"
    },
    {
      quote: "Setup was incredibly fast and the platform is so intuitive. Our drivers love the new system.",
      author: "Jennifer Park",
      role: "Operations Manager",
      company: "Yellow Cab Co.",
      avatar: "JP"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section-padding bg-dark-900/50">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Trusted by Industry
            <span className="gradient-text"> Leaders</span>
          </h2>
          <p className="text-lg text-dark-300 max-w-3xl mx-auto">
            Join hundreds of fleet owners and advertisers who have transformed their business with Lunqo.
          </p>
        </motion.div>

        {/* Logo Strip */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {logos.map((logo, index) => (
              <motion.div
                key={logo}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                className="flex items-center justify-center"
              >
                <div className="text-center group cursor-pointer">
                  <div className="w-20 h-20 bg-dark-800/50 border border-dark-700 rounded-xl flex items-center justify-center group-hover:border-primary-blue/30 group-hover:bg-primary-blue/5 transition-all duration-300">
                    <span className="text-lg font-semibold text-dark-300 group-hover:text-primary-blue transition-colors duration-300">
                      {logo.split(' ').map(word => word[0]).join('')}
                    </span>
                  </div>
                  <p className="text-sm text-dark-400 mt-2 group-hover:text-dark-300 transition-colors duration-300">
                    {logo}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="card p-8 lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                {/* Quote Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-12 bg-primary-blue/10 border border-primary-blue/20 rounded-full flex items-center justify-center">
                    <Quote className="w-6 h-6 text-primary-blue" />
                  </div>
                </div>

                {/* Quote Text */}
                <blockquote className="text-xl lg:text-2xl text-white leading-relaxed mb-8 font-medium">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-blue to-primary-lime rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {testimonials[currentTestimonial].avatar}
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-white">
                      {testimonials[currentTestimonial].author}
                    </div>
                    <div className="text-sm text-dark-300">
                      {testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-primary-blue' 
                      : 'bg-dark-600 hover:bg-dark-500'
                  }`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-dark-800/50 border border-dark-700 rounded-full flex items-center justify-center text-dark-300 hover:text-white hover:border-primary-blue/30 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-dark-800/50 border border-dark-700 rounded-full flex items-center justify-center text-dark-300 hover:text-white hover:border-primary-blue/30 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Our Success Stories
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials; 