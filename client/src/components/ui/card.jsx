function Card({ className = "", ...props }) {
  return (
    <div
      className={`rounded-lg border border-border bg-background text-foreground ${className}`}
      {...props}
    />
  );
}

function CardHeader({ className = "", ...props }) {
  return <div className={`p-4 pb-0 ${className}`} {...props} />;
}

function CardTitle({ className = "", ...props }) {
  return (
    <h3 className={`text-lg font-semibold leading-none ${className}`} {...props} />
  );
}

function CardContent({ className = "", ...props }) {
  return <div className={`p-4 pt-0 ${className}`} {...props} />;
}

export { Card, CardHeader, CardTitle, CardContent };

