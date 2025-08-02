import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { X, TrendingUp, Users, Eye, MousePointer } from "lucide-react";

/*************************************************************************************************
 *  HOOK: useBodyLock
 *  — Блокирует фоновые скроллы и визуальные сдвиги (учитываем ширину скроллбара).
 *  — Сохраняет позицию, чтобы при закрытии вернуться ровно туда же.
 *************************************************************************************************/
const useBodyLock = (locked) => {
  useEffect(() => {
    if (!locked) return;

    const html = document.documentElement;
    const body = document.body;

    // Store current scroll position
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    // Get scrollbar width
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    // Apply styles to prevent scrolling
    body.style.cssText = `
      position: fixed !important;
      top: -${scrollY}px !important;
      left: -${scrollX}px !important;
      width: 100% !important;
      height: 100% !important;
      overflow: hidden !important;
      padding-right: ${scrollbarWidth}px !important;
    `;

    html.style.cssText = `
      overflow: hidden !important;
      overscroll-behavior: none !important;
    `;

    // Cleanup function
    return () => {
      body.style.cssText = '';
      html.style.cssText = '';
      window.scrollTo(scrollX, scrollY);
    };
  }, [locked]);
};

/*************************************************************************************************
 *  COMPONENT: Portal — безопасный перенос в <body>
 *************************************************************************************************/
const Portal = ({ children }) => {
  if (typeof window === "undefined") return null; // SSR
  return createPortal(children, document.body);
};

/*************************************************************************************************
 *  MAIN COMPONENT: AnalyticsDemo
 *************************************************************************************************/
const AnalyticsDemo = () => {
  const [open, setOpen] = useState(false);

  /** Freeze background when modal is open */
  useBodyLock(open);

  /** Close on ESC and prevent all scrolling */
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    
    const preventScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    const preventTouch = (e) => {
      if (e.touches.length > 1) return;
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    if (open) {
      window.addEventListener("keydown", onEsc);
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventTouch, { passive: false });
      window.addEventListener("scroll", preventScroll, { passive: false });
      document.addEventListener("wheel", preventScroll, { passive: false });
      document.addEventListener("touchmove", preventTouch, { passive: false });
      document.addEventListener("scroll", preventScroll, { passive: false });
    }

    return () => {
      window.removeEventListener("keydown", onEsc);
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventTouch);
      window.removeEventListener("scroll", preventScroll);
      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("touchmove", preventTouch);
      document.removeEventListener("scroll", preventScroll);
    };
  }, [open]);

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
  const overlayAnim = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
  const modalAnim = { initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.9, opacity: 0 } };

  /* ----------------- Handlers ----------------- */
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const onBackdropClick = (e) => e.target === e.currentTarget && closeModal();

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

      {/* ---------------- Modal ---------------- */}
      <Portal>
        <AnimatePresence>
          {open && (
            <motion.div
              variants={overlayAnim}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm overscroll-none overflow-hidden p-4"
              role="dialog"
              aria-modal="true"
              onClick={onBackdropClick}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999
              }}
            >
              <motion.div
                variants={modalAnim}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-dark-800 rounded-3xl p-8 max-w-4xl w-full max-h-screen overflow-hidden"
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'relative',
                  maxWidth: '64rem',
                  width: '100%',
                  maxHeight: '100vh',
                  overflow: 'hidden',
                  margin: 'auto'
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Full Analytics Dashboard</h3>
                  <button
                    onClick={closeModal}
                    aria-label="Close modal"
                    className="text-dark-400 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Modal Metrics grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {metrics.map((m) => (
                    <div key={m.label} className="bg-dark-900/50 rounded-xl p-4 border border-dark-700">
                      <div className="flex items-center justify-between mb-2">
                        <m.icon className="w-5 h-5 text-primary-blue" />
                        <span className="text-xs text-primary-lime font-medium">{m.change}</span>
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">{m.value}</div>
                      <span className="text-sm text-dark-400">{m.label}</span>
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
                          <span className="bg-primary-blue rounded-t flex-1" style={{ height: `${(d.impressions / maxImpressions) * 200}px` }} />
                          <span className="bg-primary-lime rounded-t flex-1" style={{ height: `${(d.scans / maxScans) * 200}px` }} />
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

export default AnalyticsDemo; 