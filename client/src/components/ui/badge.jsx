function Badge({ className = "", variant = "default", ...props }) {
  const variantClass =
    variant === "outline" ? "border" : "bg-primary text-primary-foreground";

  return (
    <span
      className={`inline-flex items-center rounded-md border-border px-2 py-0.5 text-xs font-medium ${variantClass} ${className}`}
      {...props}
    />
  );
}

export { Badge };

