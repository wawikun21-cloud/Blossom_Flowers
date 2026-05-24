function Select({ children }) {
  return <div>{children}</div>;
}

function SelectTrigger({ className = "", ...props }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm ${className}`}
      {...props}
    />
  );
}

function SelectValue({ placeholder }) {
  return <span>{placeholder}</span>;
}

function SelectContent({ children }) {
  return <div className="mt-2">{children}</div>;
}

function SelectItem({ children, value, ...props }) {
  return (
    <button
      type="button"
      className="block w-full text-left px-3 py-2 text-sm hover:bg-muted/30 rounded"
      value={value}
      {...props}
    >
      {children}
    </button>
  );
}

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
};

