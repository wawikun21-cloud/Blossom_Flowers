// client/src/features/admin/pages/BookingsPage.jsx
import { useState } from "react";
import { useBookings } from "@/hooks/useBookings";
import { BookingForm } from "../components/BookingForm";
import { BookingRow } from "../components/BookingRow";
import { BookingStatusBadge } from "../components/BookingStatusBadge";

export default function BookingsPage() {
  const {
    bookings,
    loading,
    error,
    filters,
    setFilters,
    createBooking,
    updateBooking,
    updateBookingStatus,
    deleteBooking,
    refetch,
  } = useBookings();

  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleCreate = async (data) => {
    try {
      await createBooking(data);
      setShowForm(false);
      await refetch();
    } catch (err) {
      alert(`Failed to create booking: ${err.message}`);
    }
  };

  const handleUpdate = async (data) => {
    if (!editingId) return;
    try {
      await updateBooking(editingId, data);
      setEditingId(null);
      await refetch();
    } catch (err) {
      alert(`Failed to update booking: ${err.message}`);
    }
  };

  const handleEdit = (booking) => {
    setEditingId(booking.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await deleteBooking(id);
      await refetch();
    } catch (err) {
      alert(`Failed to delete booking: ${err.message}`);
    }
  };

  const handleStatusChange = async (booking, newStatus) => {
    try {
      await updateBookingStatus(booking.id, newStatus);
      await refetch();
    } catch (err) {
      alert(`Failed to update status: ${err.message}`);
    }
  };

  if (loading) return <div className="text-center py-8">Loading bookings...</div>;
  if (error) return <div className="text-center text-destructive py-8">Error: {error}</div>;

  return (
    <div className="db-page">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Bookings Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="btn btn-default"
        >
          New Booking
        </button>
      </header>

      {/* Filters */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={filters.status || ""}
            onChange={(e) => setFilters({ status: e.target.value })}
            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Event Type</label>
          <select
            value={filters.eventType || ""}
            onChange={(e) => setFilters({ eventType: e.target.value })}
            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Types</option>
            <option value="wedding">Wedding</option>
            <option value="birthday">Birthday</option>
            <option value="anniversary">Anniversary</option>
            <option value="corporate">Corporate</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">From Date</label>
          <input
            type="date"
            value={filters.fromDate || ""}
            onChange={(e) => setFilters({ fromDate: e.target.value })}
            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">To Date</label>
          <input
            type="date"
            value={filters.toDate || ""}
            onChange={(e) => setFilters({ toDate: e.target.value })}
            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Booking Form */}
      {showForm && (
        <div className="bg-card rounded-xl border p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingId ? "Edit Booking" : "New Booking"}
          </h2>
          <BookingForm
            initialData={editingId ? bookings.find(b => b.id === editingId) || {} : {}}
            onSubmit={editingId ? handleUpdate : handleCreate}
            onCancel={() => {
              setEditingId(null);
              setShowForm(false);
            }}
          />
        </div>
      )}

      {/* Bookings Table */}
      <div className="overflow-x-auto">
        <table className="bt-table w-full">
          <thead>
            <tr className="bt-tr">
              <th className="bt-th bt-th--center">Status</th>
              <th className="bt-th">Event Type</th>
              <th className="bt-th">Client Name</th>
              <th className="bt-th bt-th--center">Date</th>
              <th className="bt-th bt-th--center">Time</th>
              <th className="bt-th">Budget (PHP)</th>
              <th className="bt-th bt-th--center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <BookingRow
                  key={booking.id}
                  booking={booking}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <tr>
                <td colspan="7" className="bt-td text-center py-4">
                  No bookings found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
