import { useState } from "react";
import { Search, Phone, Eye, X, Mail, MapPin, Calendar, ShoppingBag, Gift } from "lucide-react";
import { formatPeso } from "../../../utils/dashboardUtils";

const CUSTOMERS = [
  {
    id: "CUST-001",
    name: "Maria Santos",
    email: "maria.santos@email.com",
    phone: "+63 912 345 6789",
    address: "123 Makati Ave, Makati City",
    totalOrders: 12,
    totalSpent: 34500,
    lastOrder: "May 27, 2025",
    joinDate: "Jan 15, 2025",
    birthday: "Dec 15",
    anniversary: null,
    favoriteProducts: ["Red Rose Bouquet", "Tulip Elegance"],
    status: "active",
  },
  {
    id: "CUST-002",
    name: "Juan dela Cruz",
    email: "juan.delacruz@email.com",
    phone: "+63 917 234 5678",
    address: "456 Quezon Blvd, Quezon City",
    totalOrders: 8,
    totalSpent: 21800,
    lastOrder: "May 27, 2025",
    joinDate: "Feb 20, 2025",
    birthday: "Aug 22",
    anniversary: "Jun 10",
    favoriteProducts: ["Sunflower Bliss", "Pink Dream Bouquet"],
    status: "active",
  },
  {
    id: "CUST-003",
    name: "Ana Reyes",
    email: "ana.reyes@email.com",
    phone: "+63 918 345 6789",
    address: "789 Ortigas Ave, Pasig City",
    totalOrders: 5,
    totalSpent: 12500,
    lastOrder: "May 26, 2025",
    joinDate: "Mar 10, 2025",
    birthday: "Nov 5",
    anniversary: null,
    favoriteProducts: ["White Lily Arrangement"],
    status: "active",
  },
  {
    id: "CUST-004",
    name: "Mark Villanueva",
    email: "mark.villanueva@email.com",
    phone: "+63 919 456 7890",
    address: "321 Bonifacio St, Taguig City",
    totalOrders: 15,
    totalSpent: 48200,
    lastOrder: "May 26, 2025",
    joinDate: "Dec 5, 2024",
    birthday: "Jul 18",
    anniversary: "Apr 25",
    favoriteProducts: ["Red Rose Bouquet", "Pink Dream Bouquet", "Tulip Elegance"],
    status: "vip",
  },
  {
    id: "CUST-005",
    name: "Liza Garcia",
    email: "liza.garcia@email.com",
    phone: "+63 920 567 8901",
    address: "654 EDSA, Mandaluyong City",
    totalOrders: 3,
    totalSpent: 8900,
    lastOrder: "May 26, 2025",
    joinDate: "Apr 14, 2025",
    birthday: "Oct 30",
    anniversary: null,
    favoriteProducts: ["Sunflower Bliss"],
    status: "active",
  },
];

function CustomerRow({ customer, onViewCustomer }) {
  const statusColors = {
    active: "bg-success/20 text-success",
    vip: "bg-primary/20 text-primary",
    inactive: "bg-muted-foreground/20 text-muted-foreground",
  };

  return (
    <tr className="cm-tr">
      <td className="cm-td cm-td--mono">{customer.id}</td>
      <td className="cm-td cm-td--name">
        <div>
          <p className="font-medium">{customer.name}</p>
          <p className="text-xs text-muted-foreground">{customer.email}</p>
        </div>
      </td>
      <td className="cm-td">
        <div className="flex items-center gap-1">
          <Phone size={12} />
          {customer.phone}
        </div>
      </td>
      <td className="cm-td cm-td--r">{customer.totalOrders}</td>
      <td className="cm-td cm-td--r cm-td--bold">{formatPeso(customer.totalSpent)}</td>
      <td className="cm-td cm-td--r">{customer.lastOrder}</td>
      <td className="cm-td">
        <span className={`cm-badge ${statusColors[customer.status]}`}>
          {customer.status.toUpperCase()}
        </span>
      </td>
      <td className="cm-td">
        <button
          className="db-ghost-btn flex items-center gap-1"
          type="button"
          onClick={() => onViewCustomer?.(customer)}
        >
          <Eye size={12} />
          View
        </button>
      </td>
    </tr>
  );
}

function CustomerModal({ customer, onClose }) {
  if (!customer) return null;

  return (
    <div className="cd-modal">
      <div className="cd-modal__overlay" onClick={onClose} />
      <div className="cd-modal__content">
        <div className="cd-modal__header">
          <h2 className="cd-modal__title">Customer Details</h2>
          <button className="cd-modal__close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="cd-modal__body scrollbar">
          <div className="cd-profile">
            <div className="cd-profile__avatar">
              <span>{customer.name.charAt(0)}</span>
            </div>
            <div className="cd-profile__info">
              <h3 className="cd-profile__name">{customer.name}</h3>
              <p className="cd-profile__email">{customer.email}</p>
            </div>
          </div>

          <div className="cd-section">
            <h4 className="cd-section__title">Contact Information</h4>
            <div className="cd-info-grid">
              <div className="cd-info-item">
                <Mail size={14} />
                <span>{customer.email}</span>
              </div>
              <div className="cd-info-item">
                <Phone size={14} />
                <span>{customer.phone}</span>
              </div>
              <div className="cd-info-item cd-info-item--full">
                <MapPin size={14} />
                <span>{customer.address}</span>
              </div>
            </div>
          </div>

          <div className="cd-section">
            <h4 className="cd-section__title">Order Summary</h4>
            <div className="cd-stats-grid">
              <div className="cd-stat">
                <ShoppingBag size={16} />
                <div>
                  <p className="cd-stat__value">{customer.totalOrders}</p>
                  <p className="cd-stat__label">Total Orders</p>
                </div>
              </div>
              <div className="cd-stat">
                <span className="cd-stat__currency">{formatPeso(customer.totalSpent)}</span>
                <p className="cd-stat__label">Total Spent</p>
              </div>
            </div>
            <p className="cd-last-order">Last Order: {customer.lastOrder}</p>
          </div>

          <div className="cd-section">
            <h4 className="cd-section__title">Occasions</h4>
            <div className="cd-occasions">
              <div className="cd-occasion">
                <Calendar size={14} />
                <span>Birthday: {customer.birthday}</span>
              </div>
              {customer.anniversary && (
                <div className="cd-occasion">
                  <Gift size={14} />
                  <span>Anniversary: {customer.anniversary}</span>
                </div>
              )}
            </div>
          </div>

          {customer.favoriteProducts.length > 0 && (
            <div className="cd-section">
              <h4 className="cd-section__title">Favorite Products</h4>
              <div className="cd-favorites">
                {customer.favoriteProducts.map((product, i) => (
                  <span key={i} className="cd-favorite-tag">{product}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="cd-modal__footer">
          <button className="db-outline-btn" type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function CustomersManagement({ customers = CUSTOMERS }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || c.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleCloseModal = () => {
    setSelectedCustomer(null);
  };

  return (
    <div className="cm-card">
      <div className="cm-card__head">
        <div>
          <p className="cm-card__title">Customer Management</p>
          <p className="cm-card__subtitle">{customers.length} total customers</p>
        </div>
        <div className="cm-card__actions">
          <div className="cm-search">
            <Search size={16} className="cm-search__icon" />
            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="cm-search__input"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="cm-filter"
          >
            <option value="all">All Customers</option>
            <option value="active">Active</option>
            <option value="vip">VIP</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="cm-table-wrap">
        <table className="cm-table">
          <thead>
            <tr>
              <th className="cm-th">Customer ID</th>
              <th className="cm-th">Name & Email</th>
              <th className="cm-th">Phone</th>
              <th className="cm-th cm-th--r">Orders</th>
              <th className="cm-th cm-th--r">Total Spent</th>
              <th className="cm-th cm-th--r">Last Order</th>
              <th className="cm-th">Status</th>
              <th className="cm-th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <CustomerRow key={customer.id} customer={customer} onViewCustomer={handleViewCustomer} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="cm-card__foot">
        <p className="cm-card__foot-text">
          Showing {filteredCustomers.length} of {customers.length} customers
        </p>
      </div>

      {selectedCustomer && (
        <CustomerModal customer={selectedCustomer} onClose={handleCloseModal} />
      )}
    </div>
  );
}