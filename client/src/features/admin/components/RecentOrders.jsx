import { OrderStatusBadge } from "./OrderStatusBadge";
import { formatPeso } from "../../../utils/dashboardUtils";

export function RecentOrders({ orders, onViewAll }) {
  return (
    <div className="ro-card">
      <div className="ro-card__head">
        <p className="ro-card__title">Recent Orders</p>
        <button className="db-ghost-btn" type="button" onClick={onViewAll}>View All</button>
      </div>

      <div className="ro-table-wrap">
        <table className="ro-table">
          <thead>
            <tr>
              <th className="ro-th">Order ID</th>
              <th className="ro-th">Customer</th>
              <th className="ro-th ro-th--r">Amount</th>
              <th className="ro-th">Status</th>
              <th className="ro-th ro-th--r">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="ro-tr">
                <td className="ro-td ro-td--mono">{order.id}</td>
                <td className="ro-td ro-td--name">{order.customer}</td>
                <td className="ro-td ro-td--r ro-td--bold">{formatPeso(order.amount)}</td>
                <td className="ro-td"><OrderStatusBadge status={order.status} /></td>
                <td className="ro-td ro-td--r ro-td--muted">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ro-card__foot">
        <button className="db-outline-btn" type="button" onClick={onViewAll}>
          View All Orders
        </button>
      </div>
    </div>
  );
}