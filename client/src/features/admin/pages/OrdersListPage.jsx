import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { OrderStatusBadge } from "../components/OrderStatusBadge";
import { formatPeso } from "../../../utils/dashboardUtils";

const STATUS_TABS = ["All", "Pending", "Confirmed", "Preparing", "Completed", "Cancelled"];

const MOCK_ORDERS = [
  { id: "ORD-001", customer: "Maria Santos", email: "maria@example.com", phone: "+63 917 123 4567", amount: 2450, status: "Pending", date: "2026-05-23", items: 3 },
  { id: "ORD-002", customer: "Juan Dela Cruz", email: "juan@example.com", phone: "+63 918 234 5678", amount: 1800, status: "Confirmed", date: "2026-05-22", items: 2 },
  { id: "ORD-003", customer: "Ana Reyes", email: "ana@example.com", phone: "+63 919 345 6789", amount: 3200, status: "Preparing", date: "2026-05-22", items: 5 },
  { id: "ORD-004", customer: "Carlos Lopez", email: "carlos@example.com", phone: "+63 920 456 7890", amount: 1500, status: "Completed", date: "2026-05-21", items: 1 },
  { id: "ORD-005", customer: "Elena Ramos", email: "elena@example.com", phone: "+63 921 567 8901", amount: 2100, status: "Cancelled", date: "2026-05-20", items: 2 },
  { id: "ORD-006", customer: "Rico Torres", email: "rico@example.com", phone: "+63 922 678 9012", amount: 950, status: "Pending", date: "2026-05-23", items: 1 },
  { id: "ORD-007", customer: "Liza Chan", email: "liza@example.com", phone: "+63 923 789 0123", amount: 4200, status: "Confirmed", date: "2026-05-21", items: 4 },
  { id: "ORD-008", customer: "Mark Tan", email: "mark@example.com", phone: "+63 924 890 1234", amount: 1750, status: "Preparing", date: "2026-05-22", items: 3 },
];

export default function OrdersListPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = MOCK_ORDERS.filter(order => {
    const matchesStatus = activeTab === "All" || order.status === activeTab;
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="db-page">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="db-header__title">Orders</h1>
          <p className="db-header__sub">Manage and track customer orders</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg bg-card hover:bg-muted transition-colors">
            <Filter size={14} />
            Filter
          </button>
        </div>

        <div className="flex gap-1 p-1 bg-muted rounded-lg w-fit">
          {STATUS_TABS.map((status) => (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeTab === status
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="ro-card">
          <div className="ro-table-wrap">
            <table className="ro-table">
              <thead>
                <tr>
                  <th className="ro-th">Order ID</th>
                  <th className="ro-th">Customer</th>
                  <th className="ro-th ro-th--r">Amount</th>
                  <th className="ro-th">Items</th>
                  <th className="ro-th">Status</th>
                  <th className="ro-th ro-th--r">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="ro-tr" onClick={() => navigate(`/admin/orders/${order.id}`)} style={{ cursor: "pointer" }}>
                    <td className="ro-td ro-td--mono">{order.id}</td>
                    <td className="ro-td ro-td--name">{order.customer}</td>
                    <td className="ro-td ro-td--r ro-td--bold">{formatPeso(order.amount)}</td>
                    <td className="ro-td">{order.items} item{order.items > 1 ? "s" : ""}</td>
                    <td className="ro-td"><OrderStatusBadge status={order.status} /></td>
                    <td className="ro-td ro-td--r ro-td--muted">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}