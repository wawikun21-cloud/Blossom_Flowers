import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * BookingItem — single upcoming booking row.
 */
function BookingItem({ booking }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border/50 last:border-0">
      {/* Date badge */}
      <div className="flex flex-col items-center justify-center w-10 shrink-0">
        <span className="text-[9px] font-semibold text-muted-foreground tracking-widest uppercase leading-none">
          {booking.month}
        </span>
        <span className="text-xl font-bold leading-tight text-foreground">
          {booking.day}
        </span>
      </div>

      {/* Divider */}
      <div className="w-px self-stretch bg-border/60 mx-0.5" />

      {/* Event details */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {booking.event}
        </p>
        <p className="text-xs text-muted-foreground truncate">{booking.client}</p>
      </div>

      {/* Time */}
      <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
        <Clock className="w-3 h-3" />
        {booking.time}
      </div>
    </div>
  );
}

/**
 * UpcomingBookings
 * Lists upcoming floral event bookings in chronological order.
 *
 * @param {Object}   props
 * @param {Array}    props.bookings   - UPCOMING_BOOKINGS array
 * @param {Function} [props.onViewAll]
 */
export function UpcomingBookings({ bookings, onViewAll }) {
  return (
    <Card className="shadow-none border border-border/60">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">
          Upcoming Bookings
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs h-7 px-2 text-muted-foreground hover:text-foreground"
          onClick={onViewAll}
        >
          View All
        </Button>
      </CardHeader>

      <CardContent className="pt-0">
        {bookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </CardContent>
    </Card>
  );
}
