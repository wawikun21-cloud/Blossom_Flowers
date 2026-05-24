# Components Guide

**Version:** 1.0  
**Last Updated:** May 2026

---

## Table of Contents

1. [Component Categories](#component-categories)
2. [UI Components](#ui-components)
3. [Feature Components](#feature-components)
4. [Layout Components](#layout-components)
5. [Reusable Patterns](#reusable-patterns)

---

## Component Categories

### By Responsibility

| Category | Purpose | Location |
|----------|---------|----------|
| UI (`components/ui`) | Generic, reusable building blocks | `client/src/components/ui/` |
| Feature | Domain-specific functionality | `client/src/features/*/components/` |
| Layout | Page structure and navigation | `client/src/layouts/` |
| Page | Route-level components | `client/src/pages/` or `features/*/pages/` |

---

## UI Components

### Button Component

```jsx
// client/src/components/ui/Button.jsx
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

const buttonVariants = {
  variants: {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground',
    outline: 'border border-input bg-background hover:bg-accent',
    secondary: 'bg-secondary text-secondary-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline'
  },
  sizes: {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10'
  }
};

export function Button({ 
  className, 
  variant = 'default', 
  size = 'default', 
  asChild = false,
  ...props 
}) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants.variants[variant], buttonVariants.sizes[size], className)}
      {...props}
    />
  );
}
```

### Card Component

```jsx
// client/src/components/ui/Card.jsx
export function Card({ className, ...props }) {
  return (
    <div
      className={`rounded-xl border bg-card text-card-foreground shadow ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />;
}

export function CardTitle({ className, ...props }) {
  return <h3 className={`font-semibold leading-none tracking-tight ${className}`} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={`p-6 pt-0 ${className}`} {...props} />;
}
```

### Badge Component

```jsx
// client/src/components/ui/Badge.jsx
export function Badge({ className, variant = 'default', ...props }) {
  const variants = {
    default: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    destructive: 'bg-destructive text-destructive-foreground',
    outline: 'text-foreground'
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
```

---

## Feature Components

### Dashboard StatCard

```jsx
// client/src/features/admin/components/StatCard.jsx
import PropTypes from 'prop-types';

export default function StatCard({ label, value, change, period, icon }) {
  const isPositive = change > 0;

  return (
    <div className="stat-card">
      <div className="stat-card__top">
        <p className="stat-card__label">{label}</p>
        <div className="stat-card__icon">
          {icon}
        </div>
      </div>
      
      <p className="stat-card__value">{value}</p>
      
      <div className="stat-card__foot">
        <span className={`stat-card__badge stat-card__badge--${isPositive ? 'up' : 'down'}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(change)}%
        </span>
        <span className="stat-card__period">{period}</span>
      </div>
    </div>
  );
}

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  change: PropTypes.number.isRequired,
  period: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired
};
```

### OrderStatusBadge

```jsx
// client/src/features/admin/components/OrderStatusBadge.jsx
export function OrderStatusBadge({ status }) {
  const statusConfig = {
    pending: { label: 'Pending', className: 'os-badge--pending' },
    preparing: { label: 'Preparing', className: 'os-badge--preparing' },
    'out-for-delivery': { label: 'Out for Delivery', className: 'os-badge--out-for-delivery' },
    completed: { label: 'Completed', className: 'os-badge--completed' },
    cancelled: { label: 'Cancelled', className: 'os-badge--cancelled' }
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`os-badge ${config.className}`}>
      {config.label}
    </span>
  );
}
```

---

## Layout Components

### AdminSidebar

```jsx
// client/src/layouts/admin/AdminSidebar.jsx
import { NavLink } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/admin', end: true },
  { label: 'Products', icon: Package, href: '/admin/products' },
  { label: 'Orders', icon: ShoppingCart, href: '/admin/orders' },
  { label: 'Bookings', icon: CalendarDays, href: '/admin/bookings' }
];

export default function AdminSidebar() {
  const [expanded, setExpanded] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="admin-sidebar">
      {/* Sidebar content */}
    </aside>
  );
}
```

---

## Reusable Patterns

### Compound Component Pattern

```jsx
// Dropdown component with compound structure
export function Dropdown({ children, open, onOpenChange }) {
  return (
    <DropdownContext.Provider value={{ open, onOpenChange }}>
      <div className="dropdown">{children}</div>
    </DropdownContext.Provider>
  );
}

Dropdown.Trigger = function DropdownTrigger({ children }) {
  const { open, onOpenChange } = useContext(DropdownContext);
  return (
    <button onClick={() => onOpenChange(!open)}>
      {children}
    </button>
  );
};

Dropdown.Content = function DropdownContent({ children }) {
  const { open } = useContext(DropdownContext);
  if (!open) return null;
  return <div className="dropdown-content">{children}</div>;
};

// Usage
<Dropdown>
  <Dropdown.Trigger>Select</Dropdown.Trigger>
  <Dropdown.Content>
    <Dropdown.Item>Option 1</Dropdown.Item>
  </Dropdown.Content>
</Dropdown>
```

### Render Props Pattern

```jsx
// Data fetching with render props
export function DataFetcher({ url, children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [url]);

  return children({ data, loading, error, refetch });
}

// Usage
<DataFetcher url="/api/dashboard">
  {({ data, loading, error }) => {
    if (loading) return <Loading />;
    if (error) return <Error />;
    return <Dashboard data={data} />;
  }}
</DataFetcher>
```

---

## CSS Class Naming Convention

```
ComponentName
ComponentName__element
ComponentName--modifier

Examples:
.stat-card
.stat-card__label
.stat-card__value
.stat-card:hover
```

---

*End of Components Guide*