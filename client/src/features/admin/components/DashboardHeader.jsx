import { CalendarDays, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * DashboardHeader
 * Renders the page title, welcome subtitle, and a date-range pill button.
 *
 * @param {Object}   props
 * @param {string}   props.adminName   - Displayed in the welcome message
 * @param {string}   props.dateRange   - Formatted date range string
 * @param {Function} [props.onDateClick]
 */
export function DashboardHeader({ adminName = "Admin", dateRange, onDateClick }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Welcome back, {adminName}! Here's what's happening with your store.
        </p>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2 h-8 text-xs font-medium shrink-0 mt-2 sm:mt-0"
        onClick={onDateClick}
      >
        <CalendarDays className="w-3.5 h-3.5 text-muted-foreground" />
        {dateRange}
        <ChevronDown className="w-3 h-3 text-muted-foreground" />
      </Button>
    </div>
  );
}
