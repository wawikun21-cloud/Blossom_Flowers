import { useState } from "react";
import { FileText, Package, Warehouse, Users } from "lucide-react";
import {
  SalesReports,
  ProductReports,
  InventoryReports,
  CustomerReports,
  ExportMenu,
} from "../components";

const REPORT_TABS = [
  { id: "sales", label: "Sales", icon: FileText },
  { id: "products", label: "Products", icon: Package },
  { id: "inventory", label: "Inventory", icon: Warehouse },
  { id: "customers", label: "Customers", icon: Users },
];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("sales");

  const renderReport = () => {
    switch (activeTab) {
      case "sales":
        return <SalesReports />;
      case "products":
        return <ProductReports />;
      case "inventory":
        return <InventoryReports />;
      case "customers":
        return <CustomerReports />;
      default:
        return <SalesReports />;
    }
  };

  return (
    <div className="db-page">
      <div className="rp-header">
        <div>
          <h1 className="rp-header__title">Reports</h1>
          <p className="rp-header__sub">Analytics and insights for your business</p>
        </div>
        <ExportMenu />
      </div>

      <div className="rp-tabs">
        {REPORT_TABS.map((tab) => (
          <button
            key={tab.id}
            className={`rp-tab ${activeTab === tab.id ? "rp-tab--active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="rp-content">{renderReport()}</div>
    </div>
  );
}