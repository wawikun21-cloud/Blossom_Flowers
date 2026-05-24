import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Package, MapPin, CreditCard, User, Phone, Mail } from "lucide-react";
import { OrderStatusBadge } from "../components/OrderStatusBadge";
import { formatPeso } from "../../../utils/dashboardUtils";

const STATUS_FLOW = ["Pending", "Confirmed", "Preparing", "Completed", "Cancelled"];

const MOCK_ORDER_DETAILS = {
  "ORD-001": {
    id: "ORD-001",
    customer: "Maria Santos",
    email: "maria@example.com",
    phone: "+63 917 123 4567",
    address: "123 Flower Street, Makati City",
    date: "2026-05-23",
    status: "Pending",
    payment: "GCash",
    items: [
      { name: "Rose Bouquet", qty: 1, price: 1200 },
      { name: "Tulip Arrangement", qty: 2, price: 625 },
    ],
    subtotal: 2450,
    deliveryFee: 150,
    total: 2600,
  },
  "ORD-002": {
    id: "ORD-002",
    customer: "Juan Dela Cruz",
    email: "juan@example.com",
    phone: "+63 918 234 5678",
    address: "456 Garden Ave, Quezon City",
    date: "2026-05-22",
    status: "Confirmed",
    payment: "Credit Card",
    items: [
      { name: "Sunflower Mix", qty: 1, price: 800 },
      { name: "Orchid Plant", qty: 1, price: 1000 },
    ],
    subtotal: 1800,
    deliveryFee: 150,
    total: 1950,
  },
  "ORD-003": {
    id: "ORD-003",
    customer: "Ana Reyes",
    email: "ana@example.com",
    phone: "+63 919 345 6789",
    address: "789 Blossom Lane, Taguig City",
    date: "2026-05-22",
    status: "Preparing",
    payment: "Cash on Delivery",
    items: [
      { name: "Wedding Bouquet", qty: 2, price: 1200 },
      { name: "Boutonniere Set", qty: 1, price: 500 },
      { name: "Corsage", qty: 2, price: 100 },
    ],
    subtotal: 3200,
    deliveryFee: 0,
    total: 3200,
  },
};

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const order = MOCK_ORDER_DETAILS[orderId];

  if (!order) {
    return (
      <div className="db-page">
        <p>Order not found</p>
      </div>
    );
  }

  return (
    <div className="db-page">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin/orders")}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Back to orders"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="db-header__title">{order.id}</h1>
            <p className="db-header__sub">Order details and management</p>
          </div>
          <div className="ml-auto">
            <OrderStatusBadge status={order.status} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="ro-card">
              <p className="ro-card__title" style={{ marginBottom: "0.75rem" }}>Order Items</p>
              <div className="ro-table-wrap">
                <table className="ro-table">
                  <thead>
                    <tr>
                      <th className="ro-th">Product</th>
                      <th className="ro-th ro-th--r">Qty</th>
                      <th className="ro-th ro-th--r">Price</th>
                      <th className="ro-th ro-th--r">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, i) => (
                      <tr key={i} className="ro-tr">
                        <td className="ro-td ro-td--name">{item.name}</td>
                        <td className="ro-td ro-td--r">{item.qty}</td>
                        <td className="ro-td ro-td--r">{formatPeso(item.price)}</td>
                        <td className="ro-td ro-td--r ro-td--bold">{formatPeso(item.qty * item.price)}</td>
                      </tr>
                    ))}
                    <tr className="ro-tr">
                      <td colSpan="3" className="ro-td ro-td--r ro-td--bold">Subtotal</td>
                      <td className="ro-td ro-td--r ro-td--bold">{formatPeso(order.subtotal)}</td>
                    </tr>
                    {order.deliveryFee > 0 && (
                      <tr className="ro-tr">
                        <td colSpan="3" className="ro-td ro-td--r">Delivery Fee</td>
                        <td className="ro-td ro-td--r">{formatPeso(order.deliveryFee)}</td>
                      </tr>
                    )}
                    <tr className="ro-tr">
                      <td colSpan="3" className="ro-td ro-td--r ro-td--bold">Total</td>
                      <td className="ro-td ro-td--r ro-td--bold">{formatPeso(order.total)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="ro-card">
              <p className="ro-card__title" style={{ marginBottom: "0.75rem" }}>Order Status Workflow</p>
              <div className="flex items-center justify-between">
                {STATUS_FLOW.map((status, index) => {
                  const isActive = STATUS_FLOW.indexOf(order.status) >= index && status !== "Cancelled";
                  const isCurrent = order.status === status;
                  const isCancelled = order.status === "Cancelled";
                  const showLine = index < STATUS_FLOW.length - 1;
                  const nextActive = STATUS_FLOW.indexOf(order.status) > index;

                  return (
                    <div key={status} className="flex-1 flex items-center">
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                            isCancelled && status === "Cancelled"
                              ? "bg-destructive text-destructive-foreground"
                              : isActive
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <span className={`text-xs font-medium ${isActive || (isCurrent && !isCancelled) ? "text-foreground" : "text-muted-foreground"}`}>
                          {status}
                        </span>
                      </div>
                      {showLine && (
                        <div className={`flex-1 h-0.5 mx-2 ${nextActive ? "bg-primary" : "bg-border"}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="ro-card">
              <p className="ro-card__title" style={{ marginBottom: "0.75rem" }}>Customer Information</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <User size={16} className="text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">{order.customer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-muted-foreground" />
                  <p className="text-sm">{order.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-muted-foreground" />
                  <p className="text-sm">{order.phone}</p>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-muted-foreground mt-0.5" />
                  <p className="text-sm">{order.address}</p>
                </div>
              </div>
            </div>

            <div className="ro-card">
              <p className="ro-card__title" style={{ marginBottom: "0.75rem" }}>Payment Details</p>
              <div className="flex items-center gap-3">
                <CreditCard size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Payment Method</p>
                  <p className="text-sm text-muted-foreground">{order.payment}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}