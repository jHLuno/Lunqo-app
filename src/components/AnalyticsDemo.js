import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { X, TrendingUp, Users, Eye, MousePointer } from "lucide-react";

const AnalyticsDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* ----------------- Intersection ----------------- */
  const [sectionRef, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  /* ----------------- Demo data ----------------- */
  const metrics = useMemo(
    () => [
      { label: "Total Impressions", value: "2.5M", change: "+12%", icon: Eye },
      { label: "Active Riders", value: "45K", change: "+8%", icon: Users },
      { label: "QR Scans", value: "18K", change: "+15%", icon: MousePointer },
      { label: "Revenue", value: "$125K", change: "+23%", icon: TrendingUp },
    ],
    []
  );

  const chartData = useMemo(
    () => [
      { day: "Mon", impressions: 350, scans: 120 },
      { day: "Tue", impressions: 420, scans: 150 },
      { day: "Wed", impressions: 380, scans: 135 },
      { day: "Thu", impressions: 450, scans: 180 },
      { day: "Fri", impressions: 520, scans: 220 },
      { day: "Sat", impressions: 480, scans: 200 },
      { day: "Sun", impressions: 390, scans: 160 },
    ],
    []
  );

  const maxImpressions = Math.max(...chartData.map((d) => d.impressions));
  const maxScans = Math.max(...chartData.map((d) => d.scans));

  /* ----------------- Animations ----------------- */
  const fadeUp = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } };
  const metricAnim = { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 } };

  /* ----------------- Handlers ----------------- */
  const openModal = () => {
    console.log('Opening modal');
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    console.log('Closing modal');
    setIsModalOpen(false);
    document.body.style.overflow = '';
  };

  /* ----------------- Render ----------------- */
  return (
    <section id="analytics" className="section-padding bg-dark-800/8">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div ref={sectionRef} variants={fadeUp} initial="initial" animate={inView ? "animate" : "initial"} className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Real‑Time <span className="gradient-text">Analytics</span>
          </h2>
          <p className="text-lg text-dark-300 max-w-3xl mx-auto">
            Monitor your campaigns with live data, track performance metrics, and optimise for engagement.
          </p>
        </motion.div>

        {/* Dashboard preview card */}
        <motion.div variants={fadeUp} initial="initial" animate={inView ? "animate" : "initial"} className="relative">
          <div className="card p-8 cursor-pointer" onClick={openModal}>
            {/* Card Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Campaign Overview</h3>
                <p className="text-dark-300">Last 7 days performance</p>
              </div>
              <div className="flex items-center space-x-2 text-primary-lime">
                <span className="w-2 h-2 bg-primary-lime rounded-full animate-pulse" />
                <span className="text-sm font-medium">Live</span>
              </div>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {metrics.map((m, idx) => (
                <motion.div
                  key={m.label}
                  variants={metricAnim}
                  initial="initial"
                  animate={inView ? "animate" : "initial"}
                  transition={{ delay: 0.25 + idx * 0.05, duration: 0.5, ease: "easeOut" }}
                  className="bg-dark-800/50 rounded-xl p-4 border border-dark-700"
                >
                  <div className="flex items-center justify-between mb-2">
                    <m.icon className="w-5 h-5 text-primary-blue" />
                    <span className="text-xs text-primary-lime font-medium">{m.change}</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{m.value}</div>
                  <span className="text-sm text-dark-400">{m.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Mini chart */}
            <div className="bg-dark-800/30 rounded-xl p-6 border border-dark-700">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">Engagement Trends</h4>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 bg-primary-blue rounded-full" />
                    <span className="text-dark-300">Impressions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 bg-primary-lime rounded-full" />
                    <span className="text-dark-300">QR Scans</span>
                  </div>
                </div>
              </div>
              <div className="flex items-end justify-between h-32 space-x-2">
                {chartData.map((d) => (
                  <div key={d.day} className="flex flex-col items-center space-y-2">
                    <div className="flex items-end space-x-1">
                      <span className="w-4 bg-primary-blue rounded-t" style={{ height: `${(d.impressions / maxImpressions) * 80}px` }} />
                      <span className="w-4 bg-primary-lime rounded-t" style={{ height: `${(d.scans / maxScans) * 80}px` }} />
                    </div>
                    <span className="text-xs text-dark-400">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Simple Modal */}
      {isModalOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
          onClick={closeModal}
        >
          <div 
            style={{
              backgroundColor: 'rgb(31, 41, 55)',
              padding: '32px',
              borderRadius: '16px',
              maxWidth: '800px',
              width: '90%',
              maxHeight: '80vh',
              overflow: 'auto',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                fontSize: '20px'
              }}
            >
              ✕
            </button>

            <h2 style={{ color: 'white', fontSize: '24px', marginBottom: '20px' }}>
              Full Analytics Dashboard
            </h2>

            {/* Metrics grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {metrics.map((m) => (
                <div key={m.label} style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <m.icon style={{ color: '#3B82F6', width: '20px', height: '20px' }} />
                    <span style={{ color: '#10B981', fontSize: '12px', fontWeight: 'bold' }}>{m.change}</span>
                  </div>
                  <div style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>{m.value}</div>
                  <span style={{ color: '#9CA3AF', fontSize: '14px' }}>{m.label}</span>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
              <h3 style={{ color: 'white', fontSize: '18px', marginBottom: '16px' }}>Detailed Performance Analytics</h3>
              <div style={{ height: '200px', display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '8px' }}>
                {chartData.map((d) => (
                  <div key={d.day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'end', gap: '4px', width: '100%' }}>
                      <div 
                        style={{ 
                          backgroundColor: '#3B82F6', 
                          flex: 1, 
                          height: `${(d.impressions / maxImpressions) * 160}px`,
                          borderRadius: '4px 4px 0 0'
                        }} 
                      />
                      <div 
                        style={{ 
                          backgroundColor: '#10B981', 
                          flex: 1, 
                          height: `${(d.scans / maxScans) * 160}px`,
                          borderRadius: '4px 4px 0 0'
                        }} 
                      />
                    </div>
                    <span style={{ color: '#9CA3AF', fontSize: '12px', marginTop: '8px' }}>{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#9CA3AF', marginBottom: '16px' }}>
                This is a preview of our analytics dashboard. Get full access with real-time data when you sign up.
              </p>
              <button
                style={{
                  backgroundColor: '#3B82F6',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Get Full Access
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AnalyticsDemo; 