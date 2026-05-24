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


