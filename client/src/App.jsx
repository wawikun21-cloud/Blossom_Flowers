// src/App.jsx
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import AdminLayout from "@/layouts/admin/AdminLayout";

const DashboardPage = lazy(() => import("@/features/admin/pages/DashboardPage"));
const OrdersListPage = lazy(() => import("@/features/admin/pages/OrdersListPage"));
const OrderDetailsPage = lazy(() => import("@/features/admin/pages/OrderDetailsPage"));
const ReportsPage = lazy(() => import("@/features/admin/pages/ReportsPage"));

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            <Route
              index
              element={
                <Suspense fallback={null}>
                  <DashboardPage />
                </Suspense>
              }
            />
            <Route path="products" element={null} />
            <Route path="orders" element={
              <Suspense fallback={null}>
                <OrdersListPage />
              </Suspense>
            } />
            <Route path="orders/:orderId" element={
              <Suspense fallback={null}>
                <OrderDetailsPage />
              </Suspense>
            } />
            <Route path="bookings" element={null} />
            <Route path="customers" element={null} />
            <Route path="reports" element={
                <Suspense fallback={null}>
                  <ReportsPage />
                </Suspense>
            } />
            <Route path="settings" element={null} />
          </Route>
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

