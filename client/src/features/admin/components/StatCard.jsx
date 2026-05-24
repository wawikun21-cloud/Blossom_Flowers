import { TrendingUp, TrendingDown } from "lucide-react";

export function StatCard({ label, value, change, period, icon }) {
  const up = change >= 0;
  return (
    <div className="stat-card">
      <div className="stat-card__top">
        <p className="stat-card__label">{label}</p>
        <span className="stat-card__icon">{icon}</span>
      </div>
      <p className="stat-card__value">{value}</p>
      <div className="stat-card__foot">
        <span className={`stat-card__badge ${up ? "stat-card__badge--up" : "stat-card__badge--down"}`}>
          {up
            ? <TrendingUp  style={{ width: 11, height: 11 }} />
            : <TrendingDown style={{ width: 11, height: 11 }} />}
          {up ? "+" : ""}{change}%
        </span>
        <span className="stat-card__period">{period}</span>
      </div>
    </div>
  );
}