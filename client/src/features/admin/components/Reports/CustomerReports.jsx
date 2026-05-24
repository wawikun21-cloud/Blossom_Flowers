import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, Repeat, Award } from "lucide-react";

const REPEAT_CUSTOMERS = [
  { name: "Maria Santos", orders: 24, totalSpent: 24500, lastOrder: "2 days ago" },
  { name: "Juan Dela Cruz", orders: 18, totalSpent: 18900, lastOrder: "5 days ago" },
  { name: "Ana Reyes", orders: 15, totalSpent: 15600, lastOrder: "1 week ago" },
  { name: "Carlos Mendez", orders: 12, totalSpent: 12400, lastOrder: "2 weeks ago" },
  { name: "Luz Tan", orders: 10, totalSpent: 10800, lastOrder: "3 weeks ago" },
];

const CUSTOMER_RETENTION = [
  { month: "Jan", new: 120, returning: 85, retention: 71 },
  { month: "Feb", new: 98, returning: 92, retention: 75 },
  { month: "Mar", new: 145, returning: 118, retention: 81 },
  { month: "Apr", new: 132, returning: 125, retention: 82 },
  { month: "May", new: 168, returning: 142, retention: 85 },
];

const SPENDING_ANALYSIS = [
  { segment: "VIP", customers: 45, avgSpend: 2800, revenue: 126000 },
  { segment: "Regular", customers: 234, avgSpend: 1200, revenue: 280800 },
  { segment: "Occasional", customers: 456, avgSpend: 650, revenue: 296400 },
  { segment: "New", customers: 123, avgSpend: 850, revenue: 104550 },
];

export function CustomerReports() {
  const totalRepeatCustomers = REPEAT_CUSTOMERS.length;
  const avgRetention = Math.round(
    CUSTOMER_RETENTION.reduce((sum, m) => sum + m.retention, 0) / CUSTOMER_RETENTION.length
  );
  const topSpender = REPEAT_CUSTOMERS[0];

  return (
    <div className="rp-card">
      <div className="rp-card__head">
        <div>
          <h3 className="rp-card__title">Customer Reports</h3>
          <p className="rp-card__sub">Customer insights and behavior</p>
        </div>
      </div>

      <div className="rp-stats">
        <div className="rp-stat">
          <span className="rp-stat__label">Repeat Customers</span>
          <span className="rp-stat__value">{totalRepeatCustomers}</span>
        </div>
        <div className="rp-stat">
          <span className="rp-stat__label">Avg Retention Rate</span>
          <span className="rp-stat__value">{avgRetention}%</span>
        </div>
        <div className="rp-stat">
          <span className="rp-stat__label">Top Spender</span>
          <span className="rp-stat__value">{topSpender.name}</span>
        </div>
      </div>

      <div className="rp-section">
        <h4 className="rp-section__title">
          <Repeat size={16} /> Top Repeat Customers
        </h4>
        <div className="rp-table-wrap">
          <table className="rp-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Last Order</th>
              </tr>
            </thead>
            <tbody>
              {REPEAT_CUSTOMERS.map((customer) => (
                <tr key={customer.name}>
                  <td className="rp-td--name">{customer.name}</td>
                  <td className="rp-td--r">{customer.orders}</td>
                  <td className="rp-td--r">₱{customer.totalSpent.toLocaleString()}</td>
                  <td className="rp-td--muted">{customer.lastOrder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rp-section">
        <h4 className="rp-section__title">
          <Users size={16} /> Customer Retention Trend
        </h4>
        <div className="rp-chart">
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={CUSTOMER_RETENTION}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid color-mix(in srgb, var(--border) 40%, transparent)",
                  borderRadius: "var(--radius)",
                }}
              />
              <Line yAxisId="left" type="monotone" dataKey="new" stroke="var(--primary)" strokeWidth={2} dot={{ r: 4 }} />
              <Line yAxisId="left" type="monotone" dataKey="returning" stroke="var(--success)" strokeWidth={2} dot={{ r: 4 }} />
              <Line yAxisId="right" type="monotone" dataKey="retention" stroke="var(--ring)" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rp-section">
        <h4 className="rp-section__title">
          <Award size={16} /> Customer Spending Segments
        </h4>
        <div className="rp-table-wrap">
          <table className="rp-table">
            <thead>
              <tr>
                <th>Segment</th>
                <th>Customers</th>
                <th>Avg Spend</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {SPENDING_ANALYSIS.map((segment) => (
                <tr key={segment.segment}>
                  <td className="rp-td--name">{segment.segment}</td>
                  <td className="rp-td--r">{segment.customers}</td>
                  <td className="rp-td--r">₱{segment.avgSpend.toLocaleString()}</td>
                  <td className="rp-td--r">₱{segment.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}