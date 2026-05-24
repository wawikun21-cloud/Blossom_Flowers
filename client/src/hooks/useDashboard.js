import { useState, useMemo } from "react";
import { SALES_DATA, ORDER_STATUS_DATA } from "../constants/dashboardData";

/**
 * Encapsulates all dashboard state and derived data.
 * UI components stay dumb — they only receive props from here.
 */
export function useDashboard() {
  const [salesPeriod, setSalesPeriod] = useState("daily");

  const activeSalesData = useMemo(
    () => SALES_DATA[salesPeriod] ?? [],
    [salesPeriod]
  );

  const totalOrders = useMemo(
    () => ORDER_STATUS_DATA.reduce((sum, s) => sum + s.count, 0),
    []
  );

  return {
    salesPeriod,
    setSalesPeriod,
    activeSalesData,
    totalOrders,
    orderStatusData: ORDER_STATUS_DATA,
  };
}
