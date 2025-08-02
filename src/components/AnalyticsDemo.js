import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, Users, Eye, MousePointer } from "lucide-react";

// Alternative body scroll management using class-based approach
const useBodyScrollLock = (isLocked) => {
  useEffect(() => {
    if (isLocked) {
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '17px'; // compensate for scrollbar
    } else {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isLocked]);
};

// Custom intersection observer hook with different implementation
const useViewportEntry = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // trigger only once
        }
      },
      { threshold, rootMargin: '50px' }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  return [elementRef, isVisible];
};

// Note: Modal is now implemented directly without portal for simplicity

const AnalyticsDemo = () => {
  // State management with different approach
  const [modalState, setModalState] = useState({ isOpen: false, animating: false });
  const [metricsData, setMetricsData] = useState(null);
  const [chartInfo, setChartInfo] = useState(null);

  // Custom body scroll lock
  useBodyScrollLock(modalState.isOpen);

  // Viewport visibility detection
  const [containerRef, isInViewport] = useViewportEntry(0.1);

  // Initialize data on component mount
  useEffect(() => {
    const initializeMetrics = () => {
      setMetricsData([
        { id: 'impressions', label: "Total Impressions", value: "2.5M", change: "+12%", icon: Eye },
        { id: 'riders', label: "Active Riders", value: "45K", change: "+8%", icon: Users },
        { id: 'scans', label: "QR Scans", value: "18K", change: "+15%", icon: MousePointer },
        { id: 'revenue', label: "Revenue", value: "$125K", change: "+23%", icon: TrendingUp },
      ]);
    };

    const initializeChart = () => {
      const weekData = [
        { day: "Mon", impressions: 350, scans: 120 },
        { day: "Tue", impressions: 420, scans: 150 },
        { day: "Wed", impressions: 380, scans: 135 },
        { day: "Thu", impressions: 450, scans: 180 },
        { day: "Fri", impressions: 520, scans: 220 },
        { day: "Sat", impressions: 480, scans: 200 },
        { day: "Sun", impressions: 390, scans: 160 },
      ];
      setChartInfo(weekData);
    };

    initializeMetrics();
    initializeChart();
  }, []);

  // Modal control handlers with different logic
  const handleModalOpen = useCallback(() => {
    setModalState(prev => ({ ...prev, animating: true }));
    setTimeout(() => {
      setModalState({ isOpen: true, animating: false });
    }, 50);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalState(prev => ({ ...prev, animating: true }));
    setTimeout(() => {
      setModalState({ isOpen: false, animating: false });
    }, 200);
  }, []);

  // Keyboard event handling with different approach
  useEffect(() => {
    const handleKeyboardEvent = (event) => {
      if (event.code === 'Escape' && modalState.isOpen) {
        handleModalClose();
      }
    };

    if (modalState.isOpen) {
      document.addEventListener('keydown', handleKeyboardEvent);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyboardEvent);
    };
  }, [modalState.isOpen, handleModalClose]);

  // Calculate chart dimensions differently
  const chartMetrics = chartInfo ? {
    maxImpressions: Math.max(...chartInfo.map(item => item.impressions)),
    maxScans: Math.max(...chartInfo.map(item => item.scans))
  } : { maxImpressions: 1, maxScans: 1 };

  // Animation variants with different timing
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const metricCardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: 0.2 + index * 0.1, duration: 0.4 }
    })
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  if (!metricsData || !chartInfo) {
    return <div className="section-padding bg-dark-800/8">Loading...</div>;
  }

  return (
    <section id="analytics" className="section-padding bg-dark-800/8">
      <div className="container-custom">
        {/* Header Section */}
        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInViewport ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            Real‑Time <span className="gradient-text">Analytics</span>
          </h2>
          <p className="text-lg text-dark-300 max-w-3xl mx-auto">
            Monitor your campaigns with live data, track performance metrics, and optimise for engagement.
          </p>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInViewport ? "visible" : "hidden"}
          className="relative"
        >
          <div className="card p-8 cursor-pointer" onClick={handleModalOpen}>
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
              {metricsData.map((metric, index) => (
                <motion.div
                  key={metric.id}
                  custom={index}
                  variants={metricCardVariants}
                  initial="hidden"
                  animate={isInViewport ? "visible" : "hidden"}
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

            {/* Mini Chart */}
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
              <div className="flex items-end justify-between h-32 space-x-2">
                {chartInfo.map((dataPoint) => (
                  <div key={dataPoint.day} className="flex flex-col items-center space-y-2">
                    <div className="flex items-end space-x-1">
                      <div 
                        className="w-4 bg-primary-blue rounded-t" 
                        style={{ height: `${(dataPoint.impressions / chartMetrics.maxImpressions) * 80}px` }}
                      />
                      <div 
                        className="w-4 bg-primary-lime rounded-t" 
                        style={{ height: `${(dataPoint.scans / chartMetrics.maxScans) * 80}px` }}
                      />
                    </div>
                    <span className="text-xs text-dark-400">{dataPoint.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal Implementation */}
      <AnimatePresence>
        {modalState.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && handleModalClose()}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-dark-800 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Full Analytics Dashboard</h3>
                <button
                  onClick={handleModalClose}
                  aria-label="Close modal"
                  className="text-dark-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Metrics Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {metricsData.map((metric) => (
                  <div key={metric.id} className="bg-dark-900/50 rounded-xl p-4 border border-dark-700">
                    <div className="flex items-center justify-between mb-2">
                      <metric.icon className="w-5 h-5 text-primary-blue" />
                      <span className="text-xs text-primary-lime font-medium">{metric.change}</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                    <div className="text-sm text-dark-400">{metric.label}</div>
                  </div>
                ))}
              </div>

              {/* Detailed Chart */}
              <div className="bg-dark-900/30 rounded-xl p-6 border border-dark-700 mb-8">
                <h4 className="text-lg font-semibold text-white mb-4">Detailed Performance Analytics</h4>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {chartInfo.map((dataPoint) => (
                    <div key={dataPoint.day} className="flex flex-col items-center space-y-2 flex-1">
                      <div className="flex items-end space-x-1 w-full">
                        <div 
                          className="bg-primary-blue rounded-t flex-1" 
                          style={{ height: `${(dataPoint.impressions / chartMetrics.maxImpressions) * 200}px` }}
                        />
                        <div 
                          className="bg-primary-lime rounded-t flex-1" 
                          style={{ height: `${(dataPoint.scans / chartMetrics.maxScans) * 200}px` }}
                        />
                      </div>
                      <span className="text-xs text-dark-400">{dataPoint.day}</span>
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
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeInOut" }}
                >
                  Get Full Access
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AnalyticsDemo; 