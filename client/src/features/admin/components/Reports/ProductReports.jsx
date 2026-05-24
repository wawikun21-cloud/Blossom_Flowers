import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Flower2 } from "lucide-react";

const BEST_SELLING = [
  { name: "Rose Bouquet", sales: 245, revenue: 122500 },
  { name: "Tulip Mix", sales: 189, revenue: 56700 },
  { name: "Orchid Elegance", sales: 167, revenue: 83500 },
  { name: "Sunflower Bright", sales: 143, revenue: 42900 },
  { name: "Lily Classic", sales: 128, revenue: 38400 },
  { name: "Carnation Sweet", sales: 98, revenue: 29400 },
];

const SLOW_MOVING = [
  { name: "Anthurium Rare", inventory: 45, sold: 5, turnover: 0.11 },
  { name: "Bird of Paradise", inventory: 32, sold: 8, turnover: 0.25 },
  { name: "Protea Premium", inventory: 28, sold: 12, turnover: 0.43 },
  { name: "Ginger Exotic", inventory: 55, sold: 15, turnover: 0.27 },
  { name: "Heliconia Tropical", inventory: 38, sold: 9, turnover: 0.24 },
];

const SEASONAL_DATA = [
  { month: "Jan", spring: 12000, summer: 8000, fall: 15000, winter: 18000 },
  { month: "Feb", spring: 15000, summer: 12000, fall: 18000, winter: 22000 },
  { month: "Mar", spring: 28000, summer: 25000, fall: 16000, winter: 12000 },
  { month: "Apr", spring: 32000, summer: 35000, fall: 18000, winter: 10000 },
  { month: "May", spring: 28000, summer: 45000, fall: 22000, winter: 15000 },
  { month: "Jun", spring: 15000, summer: 52000, fall: 28000, winter: 12000 },
];

export function ProductReports() {
  const topProduct = BEST_SELLING[0];
  const slowProductCount = SLOW_MOVING.filter((p) => p.turnover < 0.3).length;

  return (
    <div className="rp-card">
      <div className="rp-card__head">
        <div>
          <h3 className="rp-card__title">Product Reports</h3>
          <p className="rp-card__sub">Product performance and analytics</p>
        </div>
      </div>

      <div className="rp-stats">
        <div className="rp-stat">
          <span className="rp-stat__label">Top Product</span>
          <span className="rp-stat__value">{topProduct.name}</span>
        </div>
        <div className="rp-stat">
          <span className="rp-stat__label">Slow Moving Items</span>
          <span className="rp-stat__value">{slowProductCount} products</span>
        </div>
      </div>

      <div className="rp-section">
        <h4 className="rp-section__title">
          <TrendingUp size={16} /> Best Selling Products
        </h4>
        <div className="rp-table-wrap">
          <table className="rp-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Units Sold</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {BEST_SELLING.map((item, idx) => (
                <tr key={item.name}>
                  <td className="rp-td--name">
                    <span className="rp-rank">{idx + 1}</span>
                    {item.name}
                  </td>
                  <td className="rp-td--r">{item.sales}</td>
                  <td className="rp-td--r">₱{item.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rp-section">
        <h4 className="rp-section__title">
          <TrendingDown size={16} /> Slow Moving Products
        </h4>
        <div className="rp-table-wrap">
          <table className="rp-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Inventory</th>
                <th>Sold</th>
                <th>Turnover</th>
              </tr>
            </thead>
            <tbody>
              {SLOW_MOVING.map((item) => (
                <tr key={item.name}>
                  <td className="rp-td--name">{item.name}</td>
                  <td className="rp-td--r">{item.inventory}</td>
                  <td className="rp-td--r">{item.sold}</td>
                  <td>
                    <span className={`rp-badge ${item.turnover < 0.3 ? "rp-badge--warn" : ""}`}>
                      {Math.round(item.turnover * 100)}%
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
          <Flower2 size={16} /> Seasonal Performance
        </h4>
        <div className="rp-chart">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={SEASONAL_DATA}>
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
              <Bar dataKey="spring" fill="var(--primary)" radius={2} />
              <Bar dataKey="summer" fill="var(--success)" radius={2} />
              <Bar dataKey="fall" fill="var(--accent)" radius={2} />
              <Bar dataKey="winter" fill="var(--ring)" radius={2} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}