// client/src/features/admin/components/BookingForm.jsx
import { useState } from "react";
import { Button } from "@/components/ui";

export function BookingForm({ 
  initialData = {}, 
  onSubmit, 
  onCancel 
}) {
  const [formData, setFormData] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    event_type: "wedding",
    event_date: "",
    event_time: "",
    event_location: "",
    theme: "",
    budget: "",
    quotation_id: "",
    notes: "",
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="block text-sm font-medium mb-1">Client Name *</label>
          <input
            type="text"
            name="client_name"
            value={formData.client_name || ""}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Client Email *</label>
          <input
            type="email"
            name="client_email"
            value={formData.client_email || ""}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Client Phone</label>
          <input
            type="tel"
            name="client_phone"
            value={formData.client_phone || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Event Type *</label>
          <select
            name="event_type"
            value={formData.event_type}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select Event Type</option>
            <option value="wedding">Wedding</option>
            <option value="birthday">Birthday</option>
            <option value="anniversary">Anniversary</option>
            <option value="corporate">Corporate</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Event Date *</label>
          <input
            type="date"
            name="event_date"
            value={formData.event_date || ""}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Event Time *</label>
          <input
            type="time"
            name="event_time"
            value={formData.event_time || ""}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Event Location *</label>
          <input
            type="text"
            name="event_location"
            value={formData.event_location || ""}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Theme</label>
          <input
            type="text"
            name="theme"
            value={formData.theme || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Budget (PHP)</label>
          <input
            type="number"
            name="budget"
            value={formData.budget || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus-ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Quotation ID</label>
          <input
            type="text"
            name="quotation_id"
            value={formData.quotation_id || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="col-span-3">
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea
            name="notes"
            value={formData.notes || ""}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          variant="ghost"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          variant="default"
          type="submit"
        >
          {initialData.id ? "Update Booking" : "Create Booking"}
        </Button>
      </div>
    </form>
  );
}
