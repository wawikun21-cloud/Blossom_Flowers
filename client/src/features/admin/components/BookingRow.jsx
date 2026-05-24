// client/src/features/admin/components/BookingRow.jsx
import { CalendarDays, Trash2, Edit, Clock } from "lucide-react";
import { Button } from "@/components/ui";

export function BookingRow({ booking, onEdit, onDelete }) {
  const statusClass = booking.status.toLowerCase().replace(" ", "_");

  return (
    <tr className="bt-tr">
      <td className="bt-td--center">
        <span className={`bs-badge bs-badge--${statusClass}`}>
          {booking.status}
        </span>
      </td>
      <td className="bt-td--name">{booking.event_type}</td>
      <td className="bt-td--name">{booking.client_name}</td>
      <td className="bt-td--center">
        <CalendarDays className="bt-td--mono" style={{ width: 12, height: 12 }} />
        {new Date(booking.event_date).toLocaleDateString("en-PH", {
          month: "short",
          day: "numeric",
        })}
      </td>
      <td className="bt-td--center">
        <Clock className="bt-td--mono" style={{ width: 12, height: 12 }} />
        {booking.event_time}
      </td>
      <td className="bt-td">₱{Number(booking.budget || 0).toLocaleString("en-PH")}</td>
      <td className="bt-td--center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(booking)}
          className="mr-2"
        >
          <Edit className="mr-1 h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(booking.id)}
        >
          <Trash2 className="mr-1 h-4 w-4" />
        </Button>
      </td>
    </tr>
  );
}
