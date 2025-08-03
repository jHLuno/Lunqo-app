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
  }
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

export default {
  throttle,
  debounce,
  requestAnimationFrame,
  cancelAnimationFrame,
  createOptimizedScrollHandler,
  intersectionObserverOptions,
}; 