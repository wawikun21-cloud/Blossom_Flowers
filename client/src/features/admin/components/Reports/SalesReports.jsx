import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Calendar, BarChart3 } from "lucide-react";

const DAILY_SALES = [
  { name: "Mon", sales: 12500, orders: 45 },
  { name: "Tue", sales: 18200, orders: 63 },
  { name: "Wed", sales: 15400, orders: 55 },
  { name: "Thu", sales: 21800, orders: 78 },
  { name: "Fri", sales: 28900, orders: 102 },
  { name: "Sat", sales: 34200, orders: 124 },
  { name: "Sun", sales: 26700, orders: 96 },
];

const WEEKLY_SALES = [
  { name: "W1", sales: 125000, orders: 450 },
  { name: "W2", sales: 148000, orders: 520 },
  { name: "W3", sales: 162000, orders: 580 },
  { name: "W4", sales: 189000, orders: 680 },
];

const MONTHLY_SALES = [
  { name: "Jan", sales: 450000, orders: 1650 },
  { name: "Feb", sales: 380000, orders: 1400 },
  { name: "Mar", sales: 520000, orders: 1900 },
  { name: "Apr", sales: 490000, orders: 1790 },
  { name: "May", sales: 580000, orders: 2100 },
  { name: "Jun", sales: 650000, orders: 2400 },
];

const ANNUAL_SALES = [
  { name: "2020", sales: 4800000, orders: 17800 },
  { name: "2021", sales: 5600000, orders: 20800 },
  { name: "2022", sales: 6800000, orders: 25200 },
  { name: "2023", sales: 8200000, orders: 30400 },
  { name: "2024", sales: 9500000, orders: 35600 },
];

const PERIOD_TABS = [
  { id: "daily", label: "Daily", icon: Calendar },
  { id: "weekly", label: "Weekly", icon: BarChart3 },
  { id: "monthly", label: "Monthly", icon: BarChart3 },
  { id: "annual", label: "Annual", icon: BarChart3 },
];

export function SalesReports() {
  const [activePeriod, setActivePeriod] = useState("daily");

  const dataMap = {
    daily: DAILY_SALES,
    weekly: WEEKLY_SALES,
    monthly: MONTHLY_SALES,
    annual: ANNUAL_SALES,
  };

  const currentData = dataMap[activePeriod];
  const totalSales = currentData.reduce((sum, d) => sum + d.sales, 0);
  const totalOrders = currentData.reduce((sum, d) => sum + d.orders, 0);
  const avgOrderValue = Math.round(totalSales / totalOrders);

  return (
    <div className="rp-card">
      <div className="rp-card__head">
        <div>
          <h3 className="rp-card__title">Sales Reports</h3>
          <p className="rp-card__sub">Revenue analysis across time periods</p>
        </div>
        <div className="sc-tabs">
          {PERIOD_TABS.map((tab) => (
            <button
              key={tab.id}
              className={`sc-tab ${activePeriod === tab.id ? "sc-tab--on" : ""}`}
              onClick={() => setActivePeriod(tab.id)}
            >
              <tab.icon size={12} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rp-stats">
        <div className="rp-stat">
          <span className="rp-stat__label">Total Revenue</span>
          <span className="rp-stat__value">₱{totalSales.toLocaleString()}</span>
        </div>
        <div className="rp-stat">
          <span className="rp-stat__label">Total Orders</span>
          <span className="rp-stat__value">{totalOrders.toLocaleString()}</span>
        </div>
        <div className="rp-stat">
          <span className="rp-stat__label">Avg Order Value</span>
          <span className="rp-stat__value">₱{avgOrderValue.toLocaleString()}</span>
        </div>
      </div>

      <div className="rp-chart">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={currentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            />
            <Tooltip
              contentStyle={{
                background: "var(--popover)",
                border: "1px solid color-mix(in srgb, var(--border) 40%, transparent)",
                borderRadius: "var(--radius)",
              }}
            />
            <Bar dataKey="sales" fill="var(--primary)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}