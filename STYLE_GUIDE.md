# Blossom Flowers - Style Guide

**Version:** 1.0  
**Last Updated:** May 2026

---

## Table of Contents

1. [Typography](#typography)
2. [Color Palette](#color-palette)
3. [Spacing & Layout](#spacing--layout)
4. [Components](#components)
5. [Dark Mode](#dark-mode)
6. [CSS Architecture](#css-architecture)

---

## Typography

### Font Families

| Variable | Font Stack | Usage |
|----------|------------|-------|
| `--sans` | `system-ui, 'Segoe UI', Roboto, sans-serif` | UI elements, body text |
| `--heading` | `system-ui, 'Segoe UI', Roboto, sans-serif` | Headings (h1, h2) |
| `--serif` | `'Noto Serif', Georgia, serif` | **Dashboard pages only** |
| `--mono` | `ui-monospace, Consolas, monospace` | Code, timestamps |

### Font Sizes

| Element | Size | Line Height | Weight |
|---------|------|-------------|--------|
| h1 | 56px (36px mobile) | 118% | 500 |
| h2 | 24px (20px mobile) | 118% | 500 |
| Dashboard header title | 1.25rem | - | 700 |
| Dashboard card title | 0.9375rem | - | 700 |
| Stat value | 1.6rem | 1.1 | 700 |
| Body text | 18px (16px mobile) | 145% | 400 |
| Table headers | 0.7rem | - | 600 |
| Table cells | 0.8rem | - | 400 |
| Captions | 0.72rem | - | 400/500/600 |

### Letter Spacing

| Context | Tracking |
|---------|----------|
| Default | 0.18px |
| h1 | -1.68px |
| h2 | -0.24px |
| Uppercase labels | 0.08em |

---

## Color Palette

### Light Mode

| Variable | Value | Usage |
|----------|-------|-------|
| `--background` | `#fdf6f0` | Page background |
| `--foreground` | `#2a1f2e` | Primary text |
| `--text` | `#6b506a` | Secondary text |
| `--text-h` | `#2a1f2e` | Headings |
| `--card` | `#ffffff` | Card background |
| `--card-foreground` | `#2a1f2e` | Card text |
| `--border` | `#f0e6dc` | Borders |
| `--muted` | `#ede4f4` | Muted backgrounds |
| `--muted-foreground` | `#b09ab0` | Secondary text |
| `--primary` | `#c95f8b` | Primary action |
| `--primary-hover` | `#a04070` | Primary hover |
| `--accent` | `#c95f8b` | Accent elements |
| `--accent-bg` | `rgba(201, 95, 139, 0.1)` | Accent backgrounds |
| `--success` | `#9db39a` | Success states |
| `--destructive` | `oklch(0.577 0.245 27.325)` | Error states |
| `--ring` | `#c8b4d8` | Focus rings |

### Dark Mode

| Variable | Value | Usage |
|----------|-------|-------|
| `--background` | `#2a1f2e` | Page background |
| `--foreground` | `#f3f4f6` | Primary text |
| `--text` | `#b09ab0` | Secondary text |
| `--text-h` | `#f3f4f6` | Headings |
| `--card` | `#352a3e` | Card background |
| `--card-foreground` | `#f3f4f6` | Card text |
| `--border` | `#6b506a` | Borders |
| `--muted` | `#3d3148` | Muted backgrounds |
| `--muted-foreground` | `#b09ab0` | Secondary text |
| `--primary` | `#e8a0b4` | Primary action |
| `--primary-hover` | `#c95f8b` | Primary hover |
| `--accent` | `#e8a0b4` | Accent elements |
| `--accent-bg` | `rgba(232, 160, 180, 0.15)` | Accent backgrounds |
| `--ring` | `#c8b4d8` | Focus rings |

### Sidebar Colors

| Variable | Light | Dark |
|----------|-------|------|
| `--sidebar` | `#ede4f4` | `#2a1f2e` |
| `--sidebar-foreground` | `#2a1f2e` | `#f3f4f6` |
| `--sidebar-primary` | `#c95f8b` | `#e8a0b4` |
| `--sidebar-accent` | `#e8a0b4` | `#c8b4d8` |
| `--sidebar-border` | `#f0e6dc` | `#6b506a` |

---

## Spacing & Layout

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `calc(var(--radius) * 0.6)` | Small elements |
| `--radius-md` | `calc(var(--radius) * 0.8)` | Medium elements |
| `--radius` / `--radius-lg` | `0.625rem` | Standard cards/buttons |
| `--radius-xl` | `calc(var(--radius) * 1.4)` | Large cards |
| `999px` | `999px` | Pills/buttons |

### Breakpoints

| Name | Width |
|------|-------|
| Mobile | `< 640px` |
| Tablet | `< 1024px` |
| Desktop | `< 1280px` |

### Dashboard Bento Grid

| Class | Column Span | Description |
|-------|-------------|-------------|
| `.bento__stat` | 3 (4 on tablet, 12 mobile) | Stat cards |
| `.bento__sales` | 8 (12 tablet) | Sales chart |
| `.bento__donut` | 4 (12 tablet) | Order status |
| `.bento__bouquets` | 3 (12 tablet) | Top bouquets |
| `.bento__orders` | 5 (12 tablet) | Recent orders |
| `.bento__bookings` | 4 (12 tablet) | Upcoming bookings |

---

## Components

### Card Base Styles

```css
.stat-card, .sc-card, .oc-card, .ro-card, .tb-card, .ub-card
  background: var(--card)
  color: var(--card-foreground)
  border: 1px solid color-mix(in srgb, var(--border) 40%, transparent)
  border-radius: var(--radius)
  padding: 1.125rem
  height: 100%
```

### Buttons

| Class | Description |
|-------|-------------|
| `.db-header__btn` | Pill-shaped header button |
| `.db-ghost-btn` | Text-only ghost button |
| `.db-outline-btn` | Outlined button |
| `.sc-tab` | Tab button with active state `.sc-tab--on` |

### Status Badges

| Class | Color Source |
|-------|--------------|
| `.os-badge--pending` | `--secondary` |
| `.os-badge--preparing` | `--ring` |
| `.os-badge--out-for-delivery` | `--sidebar-accent` |
| `.os-badge--completed` | `--success` |
| `.os-badge--cancelled` | `--destructive` |

---

## Dark Mode

Apply `.dark` class to `<html>` element via `ThemeContext.jsx`. All colors respond automatically via CSS variables.

### Toggle Implementation

```jsx
document.documentElement.classList.add('dark'); // Enable
document.documentElement.classList.remove('dark'); // Disable
```

---

## CSS Architecture

### File Structure

```
client/src/
  index.css              # Global variables, Tailwind config
  styles/
    dashboard.css        # Dashboard-specific styles
  components/ui/         # shadcn/ui components
  features/admin/        # Page-specific styles via className
```

### CSS Variables vs. Tailwind

| Use Case | Method |
|----------|--------|
| Dashboard components | CSS classes in `dashboard.css` |
| Global layout | CSS variables in `index.css` |
| Utility overrides | Tailwind classes in JSX |

### Font Import

```css
@import "@fontsource/noto-serif";
```

---

## Quick Reference

```css
/* Dashboard font application */
.db-page { font-family: var(--serif); }

/* Border with theme-aware opacity */
border: 1px solid color-mix(in srgb, var(--border) 40%, transparent);
```

---

*End of Style Guide*