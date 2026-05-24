import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { AlertTriangle, RefreshCw, Trash2 } from "lucide-react";

const LOW_STOCK = [
  { name: "Rose Red", stock: 12, minLevel: 25, status: "critical" },
  { name: "Tulip Yellow", stock: 18, minLevel: 30, status: "low" },
  { name: "Orchid White", stock: 8, minLevel: 20, status: "critical" },
  { name: "Sunflower Large", stock: 22, minLevel: 25, status: "low" },
  { name: "Lily Pink", stock: 15, minLevel: 30, status: "low" },
  { name: "Carnation Red", stock: 5, minLevel: 20, status: "critical" },
];

const INVENTORY_USAGE = [
  { month: "Jan", received: 1200, used: 1150, remaining: 450 },
  { month: "Feb", received: 980, used: 920, remaining: 410 },
  { month: "Mar", received: 1450, used: 1380, remaining: 480 },
  { month: "Apr", received: 1120, used: 1050, remaining: 520 },
  { month: "May", received: 1680, used: 1620, remaining: 580 },
];

const WASTAGE_DATA = [
  { category: "Cut Flowers", wasted: 45, cost: 2250 },
  { category: "Foliage", wasted: 32, cost: 480 },
  { category: "Fillers", wasted: 28, cost: 560 },
  { category: "Roses", wasted: 56, cost: 3360 },
  { category: "Seasonal", wasted: 18, cost: 900 },
];

export function InventoryReports() {
  const criticalCount = LOW_STOCK.filter((p) => p.status === "critical").length;
  const totalWastedValue = WASTAGE_DATA.reduce((sum, w) => sum + w.cost, 0);

  return (
    <div className="rp-card">
      <div className="rp-card__head">
        <div>
          <h3 className="rp-card__title">Inventory Reports</h3>
          <p className="rp-card__sub">Stock levels and usage analytics</p>
        </div>
      </div>

      <div className="rp-stats">
        <div className="rp-stat">
          <span className="rp-stat__label">Critical Stock</span>
          <span className="rp-stat__value rp-stat__value--warn">{criticalCount} items</span>
        </div>
        <div className="rp-stat">
          <span className="rp-stat__label">Wastage Cost</span>
          <span className="rp-stat__value">₱{totalWastedValue.toLocaleString()}</span>
        </div>
      </div>

      <div className="rp-section">
        <h4 className="rp-section__title">
          <AlertTriangle size={16} /> Low Stock Products
        </h4>
        <div className="rp-table-wrap">
          <table className="rp-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Current</th>
                <th>Min Level</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {LOW_STOCK.map((item) => (
                <tr key={item.name}>
                  <td className="rp-td--name">{item.name}</td>
                  <td className="rp-td--r">{item.stock}</td>
                  <td className="rp-td--r">{item.minLevel}</td>
                  <td>
                    <span className={`rp-badge ${item.status === "critical" ? "rp-badge--critical" : "rp-badge--warn"}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rp-section">
        <h4 className="rp-section__title">
          <RefreshCw size={16} /> Inventory Usage Trend
        </h4>
        <div className="rp-chart">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={INVENTORY_USAGE}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid color-mix(in srgb, var(--border) 40%, transparent)",
                  borderRadius: "var(--radius)",
                }}
              />
              <Bar dataKey="received" fill="var(--primary)" radius={2} />
              <Bar dataKey="used" fill="var(--success)" radius={2} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rp-section">
        <h4 className="rp-section__title">
          <Trash2 size={16} /> Product Wastage
        </h4>
        <div className="rp-table-wrap">
          <table className="rp-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Units Wasted</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {WASTAGE_DATA.map((item) => (
                <tr key={item.category}>
                  <td className="rp-td--name">{item.category}</td>
                  <td className="rp-td--r">{item.wasted}</td>
                  <td className="rp-td--r">₱{item.cost.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}