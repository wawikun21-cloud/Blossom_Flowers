// client/src/hooks/useBookings.js
import { useState, useCallback } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export function useBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          params.append(key, value);
        }
      });
      const response = await axios.get(`${API_BASE}/bookings?${params}`);
      setBookings(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const createBooking = useCallback(async (data) => {
    const response = await axios.post(`${API_BASE}/bookings`, data);
    setBookings(prev => [...prev, response.data]);
    return response.data;
  }, []);

  const updateBooking = useCallback(async (id, data) => {
    const response = await axios.put(`${API_BASE}/bookings/${id}`, data);
    setBookings(prev => prev.map(b => b.id === id ? response.data : b));
    return response.data;
  }, []);

  const updateBookingStatus = useCallback(async (id, status) => {
    const response = await axios.patch(`${API_BASE}/bookings/${id}/status`, { status });
    setBookings(prev => prev.map(b => b.id === id ? response.data : b));
    return response.data;
  }, []);

  const deleteBooking = useCallback(async (id) => {
    await axios.delete(`${API_BASE}/bookings/${id}`);
    setBookings(prev => prev.filter(b => b.id !== id));
  }, []);

  return {
    bookings,
    loading,
    error,
    filters,
    setFilters,
    fetchBookings: fetchBookings,
    refetch: fetchBookings,
    createBooking,
    updateBooking,
    updateBookingStatus,
    deleteBooking,
  };
}