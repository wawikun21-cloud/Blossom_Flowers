// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import AdminLayout from "@/layouts/admin/AdminLayout";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={null} />
            <Route path="products"  element={null} />
            <Route path="orders"    element={null} />

            <Route path="bookings"  element={null} />
            <Route path="customers" element={null} />
            <Route path="reports"   element={null} />
            <Route path="settings"  element={null} />
          </Route>
          {/* Redirect root to admin */}
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;