import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * StatCard
 * Displays a single KPI metric with trend indicator.
 *
 * @param {Object}  props
 * @param {string}  props.label    - Metric label, e.g. "Total Revenue"
 * @param {string}  props.value    - Formatted display value, e.g. "₱24,500"
 * @param {number}  props.change   - Signed percentage change, e.g. 12.5 or -3.1
 * @param {string}  props.period   - Comparison label, e.g. "vs last 7 days"
 * @param {React.ReactNode} props.icon - Icon element to display
 */
export function StatCard({ label, value, change, period, icon }) {
  const isPositive = change >= 0;

  return (
    <Card className="shadow-none border border-border/60">
      <CardContent className="p-4 flex flex-col gap-3">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground font-medium">{label}</p>
          <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
            {icon}
          </div>
        </div>

        {/* Value */}
        <p className="text-2xl font-semibold tracking-tight">{value}</p>

        {/* Trend badge */}
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded-md",
              isPositive
                ? "text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950"
                : "text-red-700 bg-red-50 dark:text-red-400 dark:bg-red-950"
            )}
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {isPositive ? "+" : ""}
            {change}%
          </span>
          <span className="text-xs text-muted-foreground">{period}</span>
        </div>
      </CardContent>
    </Card>
  );
}
