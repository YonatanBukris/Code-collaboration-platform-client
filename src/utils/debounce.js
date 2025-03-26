/**
 * פונקציית עזר להשהיית קריאות תכופות
 * @param {Function} func הפונקציה שתוקרא לאחר ההשהיה
 * @param {number} wait זמן ההשהיה במילישניות
 * @returns {Function} פונקציה מושהית
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