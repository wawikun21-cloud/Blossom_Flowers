/**
 * Format a number as Philippine Peso.
 * @param {number} value
 * @returns {string}  e.g. "₱3,250"
 */
export function formatPeso(value) {
  return `₱${value.toLocaleString("en-PH")}`;
}

/**
 * Return Tailwind-compatible badge variant key for an order status string.
 * Kept here so the mapping lives in one place and is easy to extend.
 */
export const ORDER_STATUS_VARIANT = {
  Pending: "warning",
  Preparing: "info",
  "Out for Delivery": "secondary",
  Completed: "success",
  Cancelled: "destructive",
};

/**
 * Derive a CSS colour string for status dot indicators.
 * Uses raw hex values so they can be passed to Chart.js or inline styles.
 */
export const ORDER_STATUS_COLOR = {
  Pending: "#94a3b8",
  Preparing: "#f97316",
  "Out for Delivery": "#3b82f6",
  Completed: "#22c55e",
  Cancelled: "#ef4444",
};
