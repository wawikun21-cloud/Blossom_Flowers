import { Clock } from "lucide-react";

function BookingItem({ booking }) {
  return (
    <div className="ub-row">
      <div className="ub-date">
        <span className="ub-month">{booking.month}</span>
        <span className="ub-day">{booking.day}</span>
      </div>
      <div className="ub-divider" />
      <div className="ub-info">
        <p className="ub-event">{booking.event}</p>
        <p className="ub-client">{booking.client}</p>
      </div>
      <div className="ub-time">
        <Clock style={{ width: 11, height: 11 }} />
        {booking.time}
      </div>
    </div>
  );
}

export function UpcomingBookings({ bookings, onViewAll }) {
  return (
    <div className="ub-card">
      <div className="ub-card__head">
        <p className="ub-card__title">Upcoming Bookings</p>
        <button className="db-ghost-btn" type="button" onClick={onViewAll}>View All</button>
      </div>
      <div className="ub-list">
        {bookings.map((b) => <BookingItem key={b.id} booking={b} />)}
      </div>
    </div>
  );
}