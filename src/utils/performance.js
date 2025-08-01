// Performance optimization utilities

/**
 * Throttle function for performance optimization
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Request Animation Frame wrapper for smooth animations
 * @param {Function} callback - Function to execute
 * @returns {number} Request ID
 */
export const requestAnimationFrame = (callback) => {
  if (typeof window !== 'undefined') {
    return window.requestAnimationFrame(callback);
  }
  return setTimeout(callback, 16); // Fallback to 60fps
};

/**
 * Cancel Animation Frame wrapper
 * @param {number} id - Request ID to cancel
 */
export const cancelAnimationFrame = (id) => {
  if (typeof window !== 'undefined') {
    return window.cancelAnimationFrame(id);
  }
  clearTimeout(id);
};

/**
 * Optimized scroll handler with RAF
 * @param {Function} callback - Scroll callback function
 * @returns {Function} Optimized scroll handler
 */
export const createOptimizedScrollHandler = (callback) => {
  let ticking = false;
  
  return function(event) {
    if (!ticking) {
      requestAnimationFrame(() => {
        callback(event);
        ticking = false;
      });
      ticking = true;
    }
  };
};

/**
 * Intersection Observer options for performance
 */
export const intersectionObserverOptions = {
  root: null,
  rootMargin: '50px',
  threshold: 0.1,
};

/**
 * Check if device supports high refresh rate
 * @returns {boolean} True if high refresh rate is supported
 */
export const supportsHighRefreshRate = () => {
  if (typeof window === 'undefined') return false;
  
  // Check for 120fps support
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  
  if (!gl) return false;
  
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  if (debugInfo) {
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    return renderer.includes('120') || renderer.includes('144');
  }
  
  return false;
};

/**
 * Performance monitoring utility
 */
export class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.observers = [];
  }

  /**
   * Start measuring performance
   * @param {string} name - Metric name
   */
  startMeasure(name) {
    if (typeof performance !== 'undefined') {
      performance.mark(`${name}-start`);
    }
  }

  /**
   * End measuring performance
   * @param {string} name - Metric name
   */
  endMeasure(name) {
    if (typeof performance !== 'undefined') {
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
      
      const measure = performance.getEntriesByName(name)[0];
      this.metrics.set(name, measure.duration);
      
      // Clean up marks
      performance.clearMarks(`${name}-start`);
      performance.clearMarks(`${name}-end`);
      performance.clearMeasures(name);
    }
  }

  /**
   * Get performance metrics
   * @returns {Map} Performance metrics
   */
  getMetrics() {
    return this.metrics;
  }

  /**
   * Monitor frame rate
   * @param {Function} callback - Callback with FPS data
   */
  monitorFrameRate(callback) {
    let frameCount = 0;
    let lastTime = performance.now();
    
    const countFrames = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        callback(fps);
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(countFrames);
    };
    
    requestAnimationFrame(countFrames);
  }
}

/**
 * Memory usage monitoring
 * @returns {Object|null} Memory usage info or null if not supported
 */
export const getMemoryUsage = () => {
  if (typeof performance !== 'undefined' && performance.memory) {
    return {
      used: performance.memory.usedJSHeapSize,
      total: performance.memory.totalJSHeapSize,
      limit: performance.memory.jsHeapSizeLimit,
    };
  }
  return null;
};

/**
 * Optimize images for performance
 * @param {HTMLImageElement} img - Image element
 */
export const optimizeImage = (img) => {
  if (!img) return;
  
  // Set loading attribute for lazy loading
  img.loading = 'lazy';
  
  // Set decoding attribute for async decoding
  img.decoding = 'async';
  
  // Enable GPU acceleration
  img.style.transform = 'translateZ(0)';
  img.style.willChange = 'transform';
};

/**
 * Preload critical resources
 * @param {string[]} urls - Array of URLs to preload
 */
export const preloadResources = (urls) => {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = url.endsWith('.css') ? 'style' : 'script';
    document.head.appendChild(link);
  });
};

export default {
  throttle,
  debounce,
  requestAnimationFrame,
  cancelAnimationFrame,
  createOptimizedScrollHandler,
  intersectionObserverOptions,
  supportsHighRefreshRate,
  PerformanceMonitor,
  getMemoryUsage,
  optimizeImage,
  preloadResources,
}; 