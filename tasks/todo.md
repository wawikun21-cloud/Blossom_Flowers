## 2026-05-23 - Fix Vite import resolution for DashboardPage

### Plan
1. Verify where the real `DashboardPage` file lives and what export it provides.
   - Check `client/src/features/admin/pages/DashboardPage.jsx`.
   - Confirm whether there is a `client/src/features/admin/pages/dashboard/DashboardPage.(js|jsx|ts|tsx)`.
2. Fix `client/src/App.jsx` import path to match the actual file.
3. Run the client build (or dev) to confirm the Vite import-analysis error is gone.

### Success criteria
- `npm run build` (in `client/`) completes without the `Failed to resolve import` error.
- No new TypeScript/lint errors appear (as applicable).

### Notes
- Prefer correcting the import path over creating a duplicate file, to minimize impact.

---

## 2026-05-23 - Execution results
### What changed
- Fixed broken `DashboardPage` import in `client/src/App.jsx`.
- Corrected relative imports inside `client/src/features/admin/pages/DashboardPage.jsx`.
- Fixed relative imports for `formatPeso` in:
  - `client/src/features/admin/components/RecentOrders.jsx`
  - `client/src/features/admin/components/TopBouquets.jsx`
- Added missing UI component stubs under `client/src/components/ui/`:
  - `card.jsx`, `badge.jsx`, `select.jsx`, `table.jsx`

### Validation performed
- `cd client && npm run build` ✅ (build succeeded).

---

## 2026-05-24 - Debug: Dashboard CSS Loading Issue

### Root Cause
The `dashboard.css` file (containing all styling classes for the bento grid layout, cards, and components) was not being imported in `main.jsx`. This caused the interface to render as unformatted plain text because:
1. Components used CSS classes like `.stat-card`, `.sc-card`, `.oc-card`, etc. defined in `dashboard.css`
2. These classes were never loaded, so no styles were applied
3. Tailwind utilities were not being used - the codebase uses CSS classes from the dashboard.css file

### Fix Applied
- Added `import './styles/dashboard.css'` to `client/src/main.jsx`

### Validation
- `cd client && npm run build` ✅ (build succeeded, CSS bundle size increased from 57kb to 67kb)
- `cd client && npx eslint src/features/admin` ✅ (no lint errors)

---

## 2026-05-24 - Refactor DashboardPage to Bento Grid Layout

### What changed
- **DashboardPage.jsx**: Refactored to Bento grid with 12-col layout (`bento` class), varied column spans for visual interest
- **StatCard.jsx**: Uses `.stat-card` CSS class with proper structure
- **SalesOverviewChart.jsx**: Uses `.sc-card` CSS class with tab navigation
- **OrderStatusChart.jsx**: Uses `.oc-card` CSS class with pie chart and legend
- **TopBouquets.jsx**: Uses `.tb-card` CSS class with hover states
- **RecentOrders.jsx**: Uses `.ro-card` CSS class with table
- **UpcomingBookings.jsx**: Uses `.ub-card` CSS class with booking rows

### Responsive behavior
- Mobile: Single column stack via `@media (max-width: 640px)` in dashboard.css
- Tablet: 4-col stat cards via `@media (max-width: 1280px)`
- Desktop: 12-col bento grid with varied spans (3+8, 4, 5+7)

---

## 2026-05-24 - Dark Theme Fix
### Issue
In dark mode, `--card` and `--popover` were set to `#ffffff` (white), creating white cards on dark background.

### Fix Applied
Updated `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, and `--secondary` variables in `.dark` block to use dark-appropriate colors (`#352a3e` for cards, `#6b506a` for secondary, `#f3f4f6` for foreground text).