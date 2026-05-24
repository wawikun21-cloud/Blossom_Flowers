import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { formatPeso } from "../../../utils/dashboardUtils";

/**
 * RecentOrders
 * Displays a compact table of the most recent orders.
 *
 * @param {Object}   props
 * @param {Array}    props.orders       - RECENT_ORDERS array
 * @param {Function} [props.onViewAll]
 */
export function RecentOrders({ orders, onViewAll }) {
  return (
    <Card className="shadow-none border border-border/60">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">Recent Orders</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs h-7 px-2 text-muted-foreground hover:text-foreground"
          onClick={onViewAll}
        >
          View All
        </Button>
      </CardHeader>

      <CardContent className="pt-0 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-xs font-medium text-muted-foreground w-28">
                Order ID
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">
                Customer
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground text-right">
                Amount
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground text-right">
                Date
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                className="hover:bg-muted/30 cursor-pointer transition-colors"
              >
                <TableCell className="text-xs font-mono text-muted-foreground py-3">
                  {order.id}
                </TableCell>
                <TableCell className="text-sm font-medium py-3">
                  {order.customer}
                </TableCell>
                <TableCell className="text-sm text-right font-semibold py-3">
                  {formatPeso(order.amount)}
                </TableCell>
                <TableCell className="py-3">
                  <OrderStatusBadge status={order.status} />
                </TableCell>
                <TableCell className="text-xs text-muted-foreground text-right py-3">
                  {order.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="pt-3 border-t border-border/50">
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs h-8"
            onClick={onViewAll}
          >
            View All Orders
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
