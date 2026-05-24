import { CalendarDays, ChevronDown } from "lucide-react";

export function DashboardHeader({ adminName = "Admin", dateRange, onDateClick }) {
  return (
    <header className="db-header">
      <div>
        <h1 className="db-header__title"><i>🌸Dashboard Analytics</i></h1>
        <p className="db-header__sub">
          Welcome back, <span className="db-header__name">{adminName}</span>! Here's what's happening with your store.
        </p>
      </div>

      <button className="db-header__btn" type="button" onClick={onDateClick}>
        <CalendarDays style={{ width: 13, height: 13 }} />
        {dateRange}
        <ChevronDown style={{ width: 11, height: 11 }} />
      </button>
    </header>
  );
}