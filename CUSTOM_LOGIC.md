# Custom Logic Guide

**Version:** 1.0  
**Last Updated:** May 2026

---

## Table of Contents

1. [Custom Hooks](#custom-hooks)
2. [Services Layer](#services-layer)
3. [Utilities](#utilities)
4. [Validation Logic](#validation-logic)
5. [Data Transformation](#data-transformation)

---

## Custom Hooks

### useApi - Data Fetching Hook

```javascript
// src/hooks/useApi.js
import { useState, useEffect, useCallback } from 'react';

export function useApi(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        ...options
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
```

### useLocalStorage - Persistent State

```javascript
// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function 
        ? value(storedValue) 
        : value;
      
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
```

### useDebounce - Delay Updates

```javascript
// src/hooks/useDebounce.js
import { useState, useEffect } from 'react';

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

---

## Services Layer

### API Service Template

```javascript
// src/services/api.js
import { authService } from './authService';

class ApiService {
  constructor(baseURL = import.meta.env.VITE_API_URL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = authService.getToken();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers
      },
      ...options
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  get(endpoint) { return this.request(endpoint); }
  post(endpoint, data) { return this.request(endpoint, { method: 'POST', body: JSON.stringify(data) }); }
  put(endpoint, data) { return this.request(endpoint, { method: 'PUT', body: JSON.stringify(data) }); }
  delete(endpoint) { return this.request(endpoint, { method: 'DELETE' }); }
}

export default new ApiService();
```

### Auth Service

```javascript
// src/services/authService.js
class AuthService {
  constructor() {
    this.tokenKey = 'auth_token';
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token) {
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    this.setToken(response.token);
    return response;
  }

  async logout() {
    this.removeToken();
    await api.post('/auth/logout');
  }

  async refreshToken() {
    const response = await api.post('/auth/refresh');
    this.setToken(response.token);
    return response;
  }
}

export const authService = new AuthService();
```

---

## Utilities

### Date Utilities

```javascript
// src/utils/dateUtils.js
export const formatDate = (date, locale = 'en-PH') => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date));
};

export const formatDateTime = (date, locale = 'en-PH') => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};

export const getRelativeTime = (date) => {
  const now = new Date();
  const target = new Date(date);
  const diffMs = target - now;
  const diffMins = Math.round(diffMs / 60000);
  
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffMins < 1440) return `${Math.round(diffMins / 60)} hr ago`;
  return `${Math.round(diffMins / 1440)} days ago`;
};
```

### Currency Utilities

```javascript
// src/utils/currencyUtils.js
export const formatCurrency = (amount, currency = 'PHP') => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  }).format(amount);
};

export const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

export const calculateTax = (subtotal, rate = 0.12) => {
  return subtotal * rate;
};
```

### Array Utilities

```javascript
// src/utils/arrayUtils.js
export const groupBy = (array, key) => {
  return array.reduce((groups, item) => {
    const group = groups[item[key]] || [];
    group.push(item);
    groups[item[key]] = group;
    return groups;
  }, {});
};

export const sortBy = (array, key, order = 'asc') => {
  return [...array].sort((a, b) => {
    const valA = a[key];
    const valB = b[key];
    return order === 'asc' 
      ? valA.localeCompare(valB) || valA - valB
      : valB.localeCompare(valA) || valB - valA;
  });
};

export const paginate = (array, page, pageSize) => {
  const start = (page - 1) * pageSize;
  return array.slice(start, start + pageSize);
};
```

---

## Validation Logic

### Form Validator

```javascript
// src/utils/validators.js
export const validators = {
  required: (value) => !!value || 'This field is required',
  
  email: (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value) || 'Invalid email address';
  },
  
  minLength: (min) => (value) => 
    (value && value.length >= min) || `Minimum ${min} characters required`,
  
  maxLength: (max) => (value) => 
    (value && value.length <= max) || `Maximum ${max} characters allowed`,
  
  pattern: (regex, message) => (value) =>
    regex.test(value) || message,
  
  phone: (value) => {
    const regex = /^(\+63|0)[0-9]{9,10}$/;
    return regex.test(value) || 'Invalid Philippine phone number';
  }
};

export function validateForm(values, schema) {
  const errors = {};
  
  Object.keys(schema).forEach(field => {
    const fieldValidators = schema[field];
    const value = values[field];
    
    for (const validator of fieldValidators) {
      const error = typeof validator === 'function' 
        ? validator(value) 
        : validator;
      
      if (error !== true) {
        errors[field] = error;
        break;
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
```

### Usage Example

```javascript
const schema = {
  email: [validators.required, validators.email],
  password: [validators.required, validators.minLength(8)],
  phone: [validators.required, validators.phone]
};

const { isValid, errors } = validateForm(formData, schema);
```

---

## Data Transformation

### Transform Dashboard Data

```javascript
// src/features/admin/utils/transformData.js
export const transformOrderData = (orders) => {
  return orders.map(order => ({
    id: order.id,
    customer: order.customer.name,
    amount: order.total,
    status: order.status,
    date: new Date(order.createdAt)
  }));
};

export const aggregateSalesByPeriod = (orders, period = 'daily') => {
  const grouped = {};
  
  orders.forEach(order => {
    const key = period === 'daily' 
      ? formatDate(order.createdAt)
      : formatDate(order.createdAt, { month: 'short' });
    
    grouped[key] = (grouped[key] || 0) + order.total;
  });
  
  return Object.entries(grouped).map(([date, total]) => ({ date, total }));
};
```

---

## Quick Reference

### Hook Naming Convention

| Type | Pattern | Example |
|------|---------|---------|
| Data fetching | `useApi` | `useApi('/users')` |
| State persistence | `useLocalStorage` | `useLocalStorage('theme', 'light')` |
| Timing | `useDebounce` | `useDebounce(search, 300)` |
| Context | `use{Name}` | `useTheme()`, `useAuth()` |

### Service Pattern

```javascript
// Singleton service
class ServiceName {
  method() { return result; }
}
export const serviceName = new ServiceName();

// Or simple export object
export const service = {
  method: async () => result
};
```

---

*End of Custom Logic Guide*