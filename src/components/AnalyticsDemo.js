import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TrendingUp, Users, Eye, MousePointer } from "lucide-react";

const AnalyticsDemo = () => {
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

        {/* Static Dashboard */}
        <motion.div variants={fadeUp} initial="initial" animate={inView ? "animate" : "initial"} className="relative">
          <div className="card p-8">
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

            {/* Additional Analytics Content */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Detailed Performance */}
              <div className="bg-dark-800/30 rounded-xl p-6 border border-dark-700">
                <h4 className="text-lg font-semibold text-white mb-4">Detailed Performance Analytics</h4>
                <div className="h-48 flex items-end justify-between space-x-2">
                  {chartData.map((d) => (
                    <div key={d.day} className="flex flex-col items-center space-y-2 flex-1">
                      <div className="flex items-end space-x-1 w-full">
                        <span className="bg-primary-blue rounded-t flex-1" style={{ height: `${(d.impressions / maxImpressions) * 120}px` }} />
                        <span className="bg-primary-lime rounded-t flex-1" style={{ height: `${(d.scans / maxScans) * 120}px` }} />
                      </div>
                      <span className="text-xs text-dark-400">{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Insights */}
              <div className="bg-dark-800/30 rounded-xl p-6 border border-dark-700">
                <h4 className="text-lg font-semibold text-white mb-4">Key Insights</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-lime rounded-full" />
                    <span className="text-dark-300">Peak engagement on Fridays</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-blue rounded-full" />
                    <span className="text-dark-300">23% revenue increase this week</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-lime rounded-full" />
                    <span className="text-dark-300">QR scans up 15% from last week</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-blue rounded-full" />
                    <span className="text-dark-300">2.5M total impressions reached</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-8 text-center">
              <p className="text-dark-300 mb-4">
                Get full access to real-time analytics and advanced campaign insights.
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
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AnalyticsDemo; 