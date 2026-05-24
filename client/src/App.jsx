// src/App.jsx
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import AdminLayout from "@/layouts/admin/AdminLayout";
import PublicLayout from "@/layouts/public/PublicLayout";

const DashboardPage = lazy(() => import("@/features/admin/pages/DashboardPage"));
const CustomersPage = lazy(() => import("@/features/admin/pages/CustomersPage"));
const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={
              <Suspense fallback={null}>
                <LoginPage />
              </Suspense>
            } />
          </Route>
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
            <Route path="orders" element={null} />
            <Route path="bookings" element={null} />
            <Route path="customers" element={
              <Suspense fallback={null}>
                <CustomersPage />
              </Suspense>
            } />
            <Route path="reports" element={null} />
            <Route path="settings" element={null} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

