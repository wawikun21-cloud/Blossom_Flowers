import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Maps order status strings to Tailwind utility classes.
 * Extend this map when new statuses are introduced.
 */
const STATUS_STYLES = {
  Pending: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800",
  Preparing: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800",
  "Out for Delivery": "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-400 dark:border-purple-800",
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800",
  Cancelled: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800",
};

/**
 * OrderStatusBadge
 * Renders a consistent pill badge for any order status string.
 *
 * @param {Object} props
 * @param {string} props.status - One of the keys in STATUS_STYLES
 */
export function OrderStatusBadge({ status }) {
  const styles = STATUS_STYLES[status] ?? "bg-muted text-muted-foreground border-border";

  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium px-2 py-0.5 rounded-md", styles)}
    >
      {status}
    </Badge>
  );
}
