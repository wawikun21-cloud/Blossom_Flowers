# Blossom Flowers - Architecture Guide

**Version:** 1.0  
**Last Updated:** May 2026

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Component Architecture](#component-architecture)
3. [Custom Logic Patterns](#custom-logic-patterns)
4. [Directory Organization](#directory-organization)
5. [Dependency Management](#dependency-management)
6. [State Management](#state-management)
7. [Routing Structure](#routing-structure)

---

## Project Structure

```
Blossom_Flowers/
├── client/                    # Frontend application
│   ├── src/
│   │   ├── api/              # API service layers
│   │   ├── assets/           # Static assets (images, fonts)
│   │   ├── components/       # Shared UI components
│   │   ├── context/          # React contexts
│   │   ├── features/         # Feature-based modules
│   │   ├── hooks/            # Custom React hooks
│   │   ├── layouts/          # Layout components
│   │   ├── lib/              # Library utilities
│   │   ├── pages/            # Route pages
│   │   ├── styles/           # CSS stylesheets
│   │   └── utils/            # Utility functions
├── server/                    # Backend application
│   ├── src/
│   │   ├── config/           # Configuration files
│   │   ├── controllers/      # Route controllers
│   │   ├── middleware/       # Express middleware
│   │   ├── models/           # Database models
│   │   ├── routes/           # API routes
│   │   └── services/         # Business logic
├── shared/                    # Shared code between client/server
├── package.json
└── docs/                      # Documentation
```

---

## Component Architecture

### Component Types

#### 1. Presentational Components (Dumb)
```jsx
// Location: src/components/ui/Button.jsx
export function Button({ variant = 'default', onClick, children, ...props }) {
  return (
    <button 
      className={`btn btn--${variant}`} 
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
```

#### 2. Container Components (Smart)
```jsx
// Location: src/features/admin/components/StatCard.jsx
export function StatCard({ label, value, change, icon }) {
  return (
    <div className="stat-card">
      {/* Presentation logic only */}
    </div>
  );
}
```

#### 3. Layout Components
```jsx
// Location: src/layouts/admin/AdminLayout.jsx
export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
```

### Component Template

```jsx
// ComponentName.jsx
import { useState, useEffect } from 'react';
import './ComponentName.css'; // Optional: component-specific styles

export default function ComponentName({ 
  prop1, 
  prop2 = 'default',
  onAction 
}) {
  // State hooks
  const [state, setState] = useState(initialValue);

  // Side effects
  useEffect(() => {
    // Effect logic
  }, []);

  // Event handlers
  const handleClick = () => {
    onAction?.(data);
  };

  // Render
  return (
    <div className="component-name">
      {/* JSX */}
    </div>
  );
}
```

---

## Custom Logic Patterns

### 1. Custom Hooks

```javascript
// src/hooks/useApi.js
import { useState, useEffect } from 'react';

export function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [url]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch: fetchData };
}
```

### 2. Services Layer

```javascript
// src/services/authService.js
import api from './api';

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh'),
};
```

### 3. Utility Functions

```javascript
// src/utils/formatters.js
export const formatCurrency = (amount) => 
  new Intl.NumberFormat('en-PH', { 
    style: 'currency', 
    currency: 'PHP' 
  }).format(amount);

export const formatDate = (date) => 
  new Intl.DateTimeFormat('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date));
```

---

## Directory Organization

### Feature-Based Structure

```
src/features/
└── admin/
    ├── components/
    │   ├── DashboardHeader.jsx
    │   ├── StatCard.jsx
    │   ├── SalesOverviewChart.jsx
    │   └── index.js          # Barrel export
    ├── hooks/
    │   └── useDashboard.js
    ├── pages/
    │   ├── DashboardPage.jsx
    │   └── index.js
    └── services/
        └── dashboardService.js
```

### Barrel Exports (index.js)

```javascript
// src/features/admin/components/index.js
export { default as DashboardHeader } from './DashboardHeader';
export { default as StatCard } from './StatCard';
export { default as SalesOverviewChart } from './SalesOverviewChart';
```

### Import Pattern

```javascript
// Recommended
import { StatCard, SalesOverviewChart } from '../components';

// Avoid - deep imports
import StatCard from '../components/StatCard';
```

---

## Dependency Management

### Package.json Structure

```json
{
  "name": "blossom-flowers",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .js,.jsx",
    "test": "vitest",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-router-dom": "^6.20.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "eslint": "^8.53.0"
  }
}
```

### Adding Dependencies

```bash
# Production dependency
npm install package-name

# Development dependency
npm install -D package-name

# Check for outdated packages
npm outdated
```

---

## State Management

### Context Pattern

```javascript
// src/context/ThemeContext.jsx
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

### Local State Pattern

```javascript
function useLocalState(initialValue) {
  const [value, setValue] = useState(initialValue);
  
  const updateValue = useCallback((newValue) => {
    setValue(prev => typeof newValue === 'function' 
      ? newValue(prev) 
      : newValue
    );
  }, []);

  return [value, updateValue];
}
```

---

## Routing Structure

### Route Definition

```javascript
// src/App.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> }
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'orders', element: <OrdersPage /> }
    ]
  }
]);
```

### Protected Route Template

```jsx
// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
```

---

## Quick Reference

### File Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Components | `PascalCase.jsx` | `DashboardCard.jsx` |
| Hooks | `useCamelCase.js` | `useApi.js` |
| Services | `camelCaseService.js` | `authService.js` |
| Utilities | `camelCase.js` | `formatDate.js` |

### Import Order

```javascript
// 1. External libraries
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Internal absolute imports
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui';

// 3. Relative imports
import './Component.css';
```

---

*End of Architecture Guide*