// client/src/features/admin/components/BookingStatusBadge.jsx
import { cn } from "@/lib/utils";

export function BookingStatusBadge({ status }) {
  const config = {
    pending:   { label: "Pending",      variant: "pending" },
    confirmed: { label: "Confirmed",    variant: "confirmed" },
    in_progress: { label: "In Progress", variant: "in_progress" },
    completed: { label: "Completed",    variant: "completed" },
    cancelled: { label: "Cancelled",    variant: "cancelled" },
  };

  const { label, variant } = config[status] || config.pending;

  return (
    <span className={cn("bs-badge", `bs-badge--${variant}`)}>
      {label}
    </span>
  );
}