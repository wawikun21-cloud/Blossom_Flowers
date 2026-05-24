import {
  DollarSign,
  ShoppingBag,
  Clock,
  CalendarDays,
} from "lucide-react";

import { useDashboard } from "../../../hooks/useDashboard";
import {
  STAT_CARDS,
  TOP_BOUQUETS,
  RECENT_ORDERS,
  UPCOMING_BOOKINGS,
  DATE_RANGE,
} from "../../../constants/dashboardData";

import {
  DashboardHeader,
  StatCard,
  SalesOverviewChart,
  OrderStatusChart,
  TopBouquets,
  RecentOrders,
  UpcomingBookings,
} from "../components";

// Map icon ID strings (from constants) to Lucide elements.
// Kept here — not in constants — so the constants file stays framework-agnostic.
const STAT_ICONS = {
  "currency-peso": <DollarSign className="w-4 h-4" />,
  "shopping-bag":  <ShoppingBag className="w-4 h-4" />,
  "clock":         <Clock className="w-4 h-4" />,
  "calendar-event":<CalendarDays className="w-4 h-4" />,
};

/**
 * DashboardPage
 * ─────────────
 * Responsibility: layout + data wiring.
 * It does NOT contain business logic (that lives in useDashboard)
 * or presentational markup (that lives in the /components/dashboard/ files).
 */
export default function DashboardPage() {
  const {
    salesPeriod,
    setSalesPeriod,
    activeSalesData,
    totalOrders,
    orderStatusData,
  } = useDashboard();

  return (
    <div className="flex flex-col gap-6 p-6 max-w-screen-xl mx-auto">

      {/* ── Header ───────────────────────────────────────────────────── */}
      <DashboardHeader adminName="Admin" dateRange={DATE_RANGE} />

      {/* ── KPI Stat Cards ───────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STAT_CARDS.map((card) => (
          <StatCard
            key={card.id}
            label={card.label}
            value={card.value}
            change={card.change}
            period={card.period}
            icon={STAT_ICONS[card.icon]}
          />
        ))}
      </div>

      {/* ── Charts Row ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SalesOverviewChart
            data={activeSalesData}
            period={salesPeriod}
            onPeriodChange={setSalesPeriod}
          />
        </div>
        <div className="lg:col-span-1">
          <OrderStatusChart
            data={orderStatusData}
            totalOrders={totalOrders}
          />
        </div>
      </div>

      {/* ── Bottom Section ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

        {/* Top Selling Bouquets */}
        <TopBouquets bouquets={TOP_BOUQUETS} />

        {/* Recent Orders spans 2 cols on large screens */}
        <div className="lg:col-span-2 grid grid-cols-1 gap-4 xl:grid-cols-5">
          <div className="xl:col-span-3">
            <RecentOrders orders={RECENT_ORDERS} />
          </div>
          <div className="xl:col-span-2">
            <UpcomingBookings bookings={UPCOMING_BOOKINGS} />
          </div>
        </div>

      </div>
    </div>
  );
}
