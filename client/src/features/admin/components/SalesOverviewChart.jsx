import {
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const PERIODS = [
  { value: "daily",   label: "Daily" },
  { value: "weekly",  label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="sc-tip">
      <p className="sc-tip__label">{label}</p>
      <p className="sc-tip__val">₱{payload[0].value.toLocaleString("en-PH")}</p>
    </div>
  );
}

export function SalesOverviewChart({ data, period, onPeriodChange }) {
  return (
    <div className="sc-card">
      <div className="sc-card__head">
        <div>
          <p className="sc-card__title">Sales Overview</p>
          <p className="sc-card__sub">Revenue in Philippine Peso (₱)</p>
        </div>
        <div className="sc-tabs" role="group" aria-label="Period">
          {PERIODS.map((p) => (
            <button
              key={p.value}
              type="button"
              className={`sc-tab${period === p.value ? " sc-tab--on" : ""}`}
              onClick={() => onPeriodChange(p.value)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={215}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -4, bottom: 0 }}>
          <defs>
            <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="var(--primary)" stopOpacity={0.20} />
              <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
            axisLine={false} tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
            tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
            axisLine={false} tickLine={false} width={30}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: "var(--border)", strokeWidth: 1 }} />
          <Area
            type="monotone" dataKey="sales"
            stroke="var(--primary)" strokeWidth={2}
            fill="url(#sg)"
            dot={{ r: 3, fill: "var(--primary)", strokeWidth: 0 }}
            activeDot={{ r: 5, fill: "var(--primary)", stroke: "var(--card)", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}