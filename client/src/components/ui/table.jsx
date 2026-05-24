function Table({ className = "", ...props }) {
  return <table className={className} {...props} />;
}

function TableHeader({ className = "", ...props }) {
  return <thead className={className} {...props} />;
}

function TableBody({ className = "", ...props }) {
  return <tbody className={className} {...props} />;
}

function TableRow({ className = "", ...props }) {
  return <tr className={className} {...props} />;
}

function TableHead({ className = "", ...props }) {
  return <th className={className} {...props} />;
}

function TableCell({ className = "", ...props }) {
  return <td className={className} {...props} />;
}

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
};

