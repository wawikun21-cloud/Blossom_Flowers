// ─── Stat Cards ────────────────────────────────────────────────────────────────
export const STAT_CARDS = [
  {
    id: "revenue",
    label: "Total Revenue",
    value: "₱24,500",
    change: 12.5,
    icon: "currency-peso",
    period: "vs last 7 days",
  },
  {
    id: "orders",
    label: "Total Orders",
    value: "76",
    change: 8.2,
    icon: "shopping-bag",
    period: "vs last 7 days",
  },
  {
    id: "pending",
    label: "Pending Orders",
    value: "12",
    change: -3.1,
    icon: "clock",
    period: "vs last 7 days",
  },
  {
    id: "bookings",
    label: "Total Bookings",
    value: "9",
    change: 5.6,
    icon: "calendar-event",
    period: "vs last 7 days",
  },
];

// ─── Sales Overview Chart ───────────────────────────────────────────────────────
export const SALES_DATA = {
  daily: [
    { date: "May 20", sales: 4200 },
    { date: "May 21", sales: 5800 },
    { date: "May 22", sales: 4900 },
    { date: "May 23", sales: 7600 },
    { date: "May 24", sales: 5200 },
    { date: "May 25", sales: 6100 },
    { date: "May 26", sales: 5500 },
    { date: "May 27", sales: 7200 },
  ],
  weekly: [
    { date: "Week 1", sales: 28000 },
    { date: "Week 2", sales: 34000 },
    { date: "Week 3", sales: 29500 },
    { date: "Week 4", sales: 41000 },
  ],
  monthly: [
    { date: "Jan", sales: 85000 },
    { date: "Feb", sales: 72000 },
    { date: "Mar", sales: 98000 },
    { date: "Apr", sales: 110000 },
    { date: "May", sales: 94000 },
  ],
};

// ─── Order Status Donut ────────────────────────────────────────────────────────
export const ORDER_STATUS_DATA = [
  { label: "Pending",         count: 12, percentage: 15.8, color: "#94a3b8" },
  { label: "Preparing",       count: 18, percentage: 23.7, color: "#f97316" },
  { label: "Out for Delivery",count: 14, percentage: 18.4, color: "#3b82f6" },
  { label: "Completed",       count: 30, percentage: 39.5, color: "#22c55e" },
  { label: "Cancelled",       count: 2,  percentage: 2.6,  color: "#ef4444" },
];

// ─── Top Selling Bouquets ──────────────────────────────────────────────────────
export const TOP_BOUQUETS = [
  { id: 1, name: "Red Rose Bouquet",      price: 3250, sold: 52, color: "#fecdd3" },
  { id: 2, name: "Tulip Elegance",        price: 2850, sold: 31, color: "#fbcfe8" },
  { id: 3, name: "Sunflower Bliss",       price: 2450, sold: 29, color: "#fef08a" },
  { id: 4, name: "Pink Dream Bouquet",    price: 2950, sold: 22, color: "#f9a8d4" },
  { id: 5, name: "White Lily Arrangement",price: 2750, sold: 18, color: "#e0f2fe" },
];

// ─── Recent Orders ─────────────────────────────────────────────────────────────
export const RECENT_ORDERS = [
  {
    id: "#ORD-10076",
    customer: "Maria Santos",
    amount: 2850,
    status: "Preparing",
    date: "May 27",
  },
  {
    id: "#ORD-10075",
    customer: "Juan dela Cruz",
    amount: 3850,
    status: "Pending",
    date: "May 27",
  },
  {
    id: "#ORD-10074",
    customer: "Ana Reyes",
    amount: 1950,
    status: "Completed",
    date: "May 26",
  },
  {
    id: "#ORD-10073",
    customer: "Mark Villanueva",
    amount: 2450,
    status: "Completed",
    date: "May 26",
  },
  {
    id: "#ORD-10072",
    customer: "Liza Garcia",
    amount: 3100,
    status: "Out for Delivery",
    date: "May 26",
  },
];

// ─── Upcoming Bookings ─────────────────────────────────────────────────────────
export const UPCOMING_BOOKINGS = [
  {
    id: 1,
    month: "MAY",
    day: 28,
    event: "Wedding Event",
    client: "Maria & John",
    time: "10:00 AM",
  },
  {
    id: 2,
    month: "MAY",
    day: 29,
    event: "Birthday Celebration",
    client: "Ate Grace",
    time: "02:00 PM",
  },
  {
    id: 3,
    month: "MAY",
    day: 30,
    event: "Corporate Event",
    client: "ABC Company",
    time: "09:00 AM",
  },
  {
    id: 4,
    month: "JUN",
    day: 1,
    event: "Anniversary Setup",
    client: "Robert & Jenny",
    time: "11:00 AM",
  },
  {
    id: 5,
    month: "JUN",
    day: 2,
    event: "Debut Celebration",
    client: "Trisha Mae",
    time: "04:00 PM",
  },
];

// ─── Date Range ────────────────────────────────────────────────────────────────
export const DATE_RANGE = "May 20 - May 27, 2025";
