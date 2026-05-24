// Status colour tokens that map to CSS variables — no raw hex values.
// Each status gets a CSS class defined in dashboard.css.
export function OrderStatusBadge({ status }) {
  const slug = status?.toLowerCase().replace(/\s+/g, "-") ?? "unknown";
  return (
    <span className={`os-badge os-badge--${slug}`}>{status}</span>
  );
}