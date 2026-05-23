// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import AdminLayout from "@/layouts/admin/AdminLayout";

// Placeholder pages — replace with your real page components
const Page = ({ title }) => (
  <div className="rounded-2xl border border-border bg-card p-8 text-card-foreground">
    <h2 className="text-2xl font-semibold mb-2">{title}</h2>
    <p className="text-muted-foreground text-sm">Welcome to {title}.</p>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Page title="Dashboard" />} />
            <Route path="products"  element={<Page title="Manage Products" />} />
            <Route path="orders"    element={<Page title="Manage Orders" />} />
            <Route path="bookings"  element={<Page title="Manage Bookings" />} />
            <Route path="customers" element={<Page title="Manage Customers" />} />
            <Route path="reports"   element={<Page title="Reports" />} />
            <Route path="settings"  element={<Page title="Settings" />} />
          </Route>
          {/* Redirect root to admin */}
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;