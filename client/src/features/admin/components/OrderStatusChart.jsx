import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Custom centre label rendered as SVG text inside the donut hole.
 */
function CentreLabel({ cx, cy, totalOrders }) {
  return (
    <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
      <tspan
        x={cx}
        dy="-6"
        fontSize="20"
        fontWeight="600"
        fill="currentColor"
        className="fill-foreground"
      >
        {totalOrders}
      </tspan>
      <tspan
        x={cx}
        dy="20"
        fontSize="11"
        fill="currentColor"
        className="fill-muted-foreground"
      >
        Total Orders
      </tspan>
    </text>
  );
}

/**
 * OrderStatusChart
 * Donut chart that breaks down orders by fulfilment status.
 *
 * @param {Object} props
 * @param {Array}  props.data         - ORDER_STATUS_DATA array
 * @param {number} props.totalOrders  - Pre-computed total
 */
export function OrderStatusChart({ data, totalOrders }) {
  return (
    <Card className="shadow-none border border-border/60">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Order Status</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {/* Donut */}
        <div className="relative">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={88}
                paddingAngle={2}
                dataKey="count"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry) => (
                  <Cell key={entry.label} fill={entry.color} strokeWidth={0} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value} orders`, name]}
                contentStyle={{
                  fontSize: 12,
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                  background: "hsl(var(--popover))",
                  color: "hsl(var(--popover-foreground))",
                  boxShadow: "none",
                }}
              />
              {/* Centre text — rendered as a custom label */}
              <text
                x="50%"
                y="46%"
                textAnchor="middle"
                fontSize="22"
                fontWeight="600"
                className="fill-foreground"
              >
                {totalOrders}
              </text>
              <text
                x="50%"
                y="57%"
                textAnchor="middle"
                fontSize="11"
                className="fill-muted-foreground"
              >
                Total Orders
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2">
          {data.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-muted-foreground">
                  {item.label}
                </span>
              </div>
              <span className="text-xs font-medium text-foreground">
                {item.count}{" "}
                <span className="text-muted-foreground font-normal">
                  ({item.percentage}%)
                </span>
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
