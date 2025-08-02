import React, { useState, useMemo, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { X, TrendingUp, Users, Eye, MousePointer } from "lucide-react";

/**************** 1. Надёжно фиксируем BODY ****************/
const useFreezeBody = (freeze) => {
  useEffect(() => {
    const body = document.body;
    const scrollY = window.scrollY;
    if (freeze) {
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.left = "0";
      body.style.right = "0";
    } else {
      const y = Math.abs(parseInt(body.style.top || "0", 10));
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      window.scrollTo({ top: y });
    }
  }, [freeze]);
};

/**************** 2. Портал ****************/
const Portal = ({ children }) => {
  if (typeof window === "undefined") return null;
  return createPortal(children, document.body);
};

const AnalyticsDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Полное замораживание скролла
  useFreezeBody(isModalOpen);

  // Закрытие ESC
  useEffect(() => {
    const escListener = (e) => e.key === "Escape" && setIsModalOpen(false);
    if (isModalOpen) window.addEventListener("keydown", escListener);
    return () => window.removeEventListener("keydown", escListener);
  }, [isModalOpen]);

  /* ---------------- Данные ---------------- */
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1, rootMargin: "50px" });

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

  /* ---------------- Анимации ---------------- */
  const fadeUp = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } };
  const metricAnim = { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 } };
  const overlayAnim = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
  const cardAnim = { initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.9, opacity: 0 } };

  /* ---------------- Хэндлеры ---------------- */
  const open = () => setIsModalOpen(true);
  const close = () => setIsModalOpen(false);
  const backdropClick = (e) => e.target === e.currentTarget && close();

  const maxImpr = Math.max(...chartData.map((d) => d.impressions));
  const maxScan = Math.max(...chartData.map((d) => d.scans));

  return (
    <section id="analytics" className="section-padding bg-dark-800/8">
      <div className="container-custom">
        {/* Header */}
        <motion.div ref={ref} variants={fadeUp} initial="initial" animate={inView ? "animate" : "initial"} className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">Real‑Time <span className="gradient-text">Analytics</span></h2>
          <p className="text-lg text-dark-300 max-w-3xl mx-auto">Monitor your campaigns with live data, track performance metrics, and optimise for engagement.</p>
        </motion.div>

        {/* Dashboard preview */}
        <motion.div variants={fadeUp} initial="initial" animate={inView ? "animate" : "initial"} className="relative">
          <div className="card p-8 cursor-pointer" onClick={open}>
            {/* Dashboard header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Campaign Overview</h3>
                <p className="text-dark-300">Last 7 days performance</p>
              </div>
              <div className="flex items-center space-x-2 text-primary-lime"><div className="w-2 h-2 bg-primary-lime rounded-full animate-pulse" /><span className="text-sm font-medium">Live</span></div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {metrics.map((m, i) => (
                <motion.div key={m.label} variants={metricAnim} initial="initial" animate={inView ? "animate" : "initial"} transition={{ delay: 0.3 + i * 0.05 }} className="bg-dark-800/50 rounded-xl p-4 border border-dark-700">
                  <div className="flex items-center justify-between mb-2"><m.icon className="w-5 h-5 text-primary-blue" /><span className="text-xs text-primary-lime font-medium">{m.change}</span></div>
                  <div className="text-2xl font-bold text-white mb-1">{m.value}</div>
                  <div className="text-sm text-dark-400">{m.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Mini chart */}
            <div className="bg-dark-800/30 rounded-xl p-6 border border-dark-700">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">Engagement Trends</h4>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-primary-blue rounded-full" /><span className="text-dark-300">Impressions</span></div>
                  <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-primary-lime rounded-full" /><span className="text-dark-300">QR Scans</span></div>
                </div>
              </div>
              <div className="flex items-end justify-between h-32 space-x-2">
                {chartData.map((d) => (
                  <div key={d.day} className="flex flex-col items-center space-y-2">
                    <div className="flex items-end space-x-1">
                      <div className="w-4 bg-primary-blue rounded-t" style={{ height: `${(d.impressions / maxImpr) * 80}px` }} />
                      <div className="w-4 bg-primary-lime rounded-t" style={{ height: `${(d.scans / maxScan) * 80}px` }} />
                    </div>
                    <span className="text-xs text-dark-400">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal via Portal */}
      <Portal>
        <AnimatePresence>
          {isModalOpen && (
            <motion.div variants={overlayAnim} initial="initial" animate="animate" exit="exit" onClick={backdropClick} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
              <motion.div variants={cardAnim} initial="initial" animate="animate" exit="exit" className="bg-dark-800 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6"><h3 className="text-2xl font-bold text-white">Full Analytics Dashboard</h3><button onClick={close} aria-label="Close modal" className="text-dark-400 hover:text-white"><X size={24} /></button></div>

                {/* Metrics grid inside modal */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {metrics.map((m) => (
                    <div key={m.label} className="bg-dark-900/50 rounded-xl p-4 border border-dark-700">
                      <div className="flex items-center justify-between mb-2">
                        <m.icon className="w-5 h-5 text-primary-blue" />
                        <span className="text-xs text-primary-lime font-medium">{m.change}</span>
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">{m.value}</div>
                      <div className="text-sm text-dark-400">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Detailed chart */}
                <div className="bg-dark-900/30 rounded-xl p-6 border border-dark-700 mb-8">
                  <h4 className="text-lg font-semibold text-white mb-4">Detailed Performance Analytics</h4>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {chartData.map((d) => (
                      <div key={d.day} className="flex flex-col items-center space-y-2 flex-1">
                        <div className="flex items-end space-x-1 w-full">
                          <div className="bg-primary-blue rounded-t flex-1" style={{ height: `${(d.impressions / maxImpr) * 200}px` }} />
                          <div className="bg-primary-lime rounded-t flex-1" style={{ height: `${(d.scans / maxScan) * 200}px` }} />
                        </div>
                        <span className="text-xs text-dark-400">{d.day}</span>
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
      </Portal>
    </section>
  );
};

export default React.memo(AnalyticsDemo); 