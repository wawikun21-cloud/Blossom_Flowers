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

const STAT_ICONS = {
  "currency-peso":  <DollarSign  style={{ width: 16, height: 16 }} />,
  "shopping-bag":   <ShoppingBag style={{ width: 16, height: 16 }} />,
  "clock":          <Clock       style={{ width: 16, height: 16 }} />,
  "calendar-event": <CalendarDays style={{ width: 16, height: 16 }} />,
};

export default function DashboardPage() {
  const { salesPeriod, setSalesPeriod, activeSalesData, totalOrders, orderStatusData } =
    useDashboard();

  return (
    <div className="db-page scrollbar">
      <DashboardHeader adminName="Admin" dateRange={DATE_RANGE} />

      {/* ── Bento Grid ─────────────────────────────────────────────── */}
      <div className="bento">

        {/* Row 1 — KPI stat cards */}
        {STAT_CARDS.map((card) => (
          <div key={card.id} className="bento__stat">
            <StatCard
              label={card.label}
              value={card.value}
              change={card.change}
              period={card.period}
              icon={STAT_ICONS[card.icon]}
            />
          </div>
        ))}

        {/* Row 2 — Sales chart + Order Status donut */}
        <div className="bento__sales">
          <SalesOverviewChart
            data={activeSalesData}
            period={salesPeriod}
            onPeriodChange={setSalesPeriod}
          />
        </div>
        <div className="bento__donut">
          <OrderStatusChart data={orderStatusData} totalOrders={totalOrders} />
        </div>

        {/* Row 3 — Top Bouquets | Recent Orders | Upcoming Bookings */}
        <div className="bento__bouquets">
          <TopBouquets bouquets={TOP_BOUQUETS} />
        </div>
        <div className="bento__orders">
          <RecentOrders orders={RECENT_ORDERS} />
        </div>
        <div className="bento__bookings">
          <UpcomingBookings bookings={UPCOMING_BOOKINGS} />
        </div>

      </div>
    </div>
  );
}