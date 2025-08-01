import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, TrendingUp, Users, Eye, MousePointer } from 'lucide-react';

const AnalyticsDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const metrics = [
    { label: 'Total Impressions', value: '2.5M', change: '+12%', icon: Eye },
    { label: 'Active Riders', value: '45K', change: '+8%', icon: Users },
    { label: 'QR Scans', value: '18K', change: '+15%', icon: MousePointer },
    { label: 'Revenue', value: '$125K', change: '+23%', icon: TrendingUp }
  ];

  const chartData = [
    { day: 'Mon', impressions: 350, scans: 120 },
    { day: 'Tue', impressions: 420, scans: 150 },
    { day: 'Wed', impressions: 380, scans: 135 },
    { day: 'Thu', impressions: 450, scans: 180 },
    { day: 'Fri', impressions: 520, scans: 220 },
    { day: 'Sat', impressions: 480, scans: 200 },
    { day: 'Sun', impressions: 390, scans: 160 }
  ];

  return (
    <section id="analytics" className="section-padding bg-dark-800/8">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Real-Time
            <span className="gradient-text"> Analytics</span>
          </h2>
          <p className="text-lg text-dark-300 max-w-3xl mx-auto">
            Monitor your campaigns with live data, track performance metrics, and optimize for maximum engagement.
          </p>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="relative"
        >
          <div className="card p-8 cursor-pointer group" onClick={() => setIsModalOpen(true)}>
            {/* Dashboard Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Campaign Overview</h3>
                <p className="text-dark-300">Last 7 days performance</p>
              </div>
              <div className="flex items-center space-x-2 text-primary-lime">
                <div className="w-2 h-2 bg-primary-lime rounded-full animate-pulse" />
                <span className="text-sm font-medium">Live</span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ delay: 0.2 + index * 0.05, duration: 0.5 }}
                  className="bg-dark-800/50 rounded-xl p-4 border border-dark-700"
                >
                  <div className="flex items-center justify-between mb-2">
                    <metric.icon className="w-5 h-5 text-primary-blue" />
                    <span className="text-xs text-primary-lime font-medium">{metric.change}</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-sm text-dark-400">{metric.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Chart Preview */}
            <div className="bg-dark-800/30 rounded-xl p-6 border border-dark-700">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">Engagement Trends</h4>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary-blue rounded-full" />
                    <span className="text-dark-300">Impressions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary-lime rounded-full" />
                    <span className="text-dark-300">QR Scans</span>
                  </div>
                </div>
              </div>
              
              {/* Simple Chart Bars */}
              <div className="flex items-end justify-between h-32 space-x-2">
                {chartData.map((data, index) => (
                  <div key={data.day} className="flex flex-col items-center space-y-2">
                    <div className="flex items-end space-x-1">
                      <div 
                        className="w-4 bg-primary-blue rounded-t"
                        style={{ height: `${(data.impressions / 520) * 80}px` }}
                      />
                      <div 
                        className="w-4 bg-primary-lime rounded-t"
                        style={{ height: `${(data.scans / 220) * 80}px` }}
                      />
                    </div>
                    <span className="text-xs text-dark-400">{data.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Click to Expand Hint */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-primary-blue/20 text-primary-blue text-xs px-2 py-1 rounded-full">
                Click to expand
              </div>
            </div>
          </div>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-dark-800 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Full Analytics Dashboard</h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-dark-400 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Enhanced Metrics */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {metrics.map((metric) => (
                      <div key={metric.label} className="bg-dark-900/50 rounded-xl p-4 border border-dark-700">
                        <div className="flex items-center justify-between mb-2">
                          <metric.icon className="w-5 h-5 text-primary-blue" />
                          <span className="text-xs text-primary-lime font-medium">{metric.change}</span>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                        <div className="text-sm text-dark-400">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Enhanced Chart */}
                  <div className="bg-dark-900/30 rounded-xl p-6 border border-dark-700">
                    <h4 className="text-lg font-semibold text-white mb-4">Detailed Performance Analytics</h4>
                    <div className="h-64 flex items-end justify-between space-x-2">
                      {chartData.map((data) => (
                        <div key={data.day} className="flex flex-col items-center space-y-2 flex-1">
                          <div className="flex items-end space-x-1 w-full">
                            <div 
                              className="bg-primary-blue rounded-t flex-1"
                              style={{ height: `${(data.impressions / 520) * 200}px` }}
                            />
                            <div 
                              className="bg-primary-lime rounded-t flex-1"
                              style={{ height: `${(data.scans / 220) * 200}px` }}
                            />
                          </div>
                          <span className="text-xs text-dark-400">{data.day}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-dark-300 mb-4">
                      This is a preview of our analytics dashboard. Get full access with real-time data when you sign up.
                    </p>
                    <motion.button
                      className="btn-primary"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get Full Access
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AnalyticsDemo; 