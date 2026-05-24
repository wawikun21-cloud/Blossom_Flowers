import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export function OrderStatusChart({ data, totalOrders }) {
  return (
    <div className="oc-card">
      <p className="oc-card__title">Order Status</p>

      <ResponsiveContainer width="100%" height={190}>
        <PieChart>
          <Pie
            data={data}
            cx="50%" cy="50%"
            innerRadius={58} outerRadius={84}
            paddingAngle={2} dataKey="count"
            startAngle={90} endAngle={-270}
          >
            {data.map((entry) => (
              <Cell key={entry.label} fill={entry.color} strokeWidth={0} />
            ))}
          </Pie>
          <Tooltip
            formatter={(v, n) => [`${v} orders`, n]}
            contentStyle={{
              fontSize: 12,
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              background: "var(--popover)",
              color: "var(--popover-foreground)",
              boxShadow: "none",
            }}
          />
          <text x="50%" y="44%" textAnchor="middle" fontSize="21" fontWeight="700" fill="var(--foreground)">
            {totalOrders}
          </text>
          <text x="50%" y="56%" textAnchor="middle" fontSize="10" fill="var(--muted-foreground)">
            Total Orders
          </text>
        </PieChart>
      </ResponsiveContainer>

      <div className="oc-legend">
        {data.map((item) => (
          <div key={item.label} className="oc-legend__row">
            <div className="oc-legend__left">
              <span className="oc-legend__dot" style={{ background: item.color }} />
              <span className="oc-legend__label">{item.label}</span>
            </div>
            <span className="oc-legend__count">
              {item.count} <span className="oc-legend__pct">({item.percentage}%)</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}