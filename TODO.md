# TODO

## Resolve Vite large chunk warning

- [x] Update `client/src/App.jsx` to lazy-load `DashboardPage` with `React.lazy` + `Suspense`
- [x] Update `client/vite.config.js` to enable `build.rollupOptions.output.codeSplitting`
- [x] Add a modest `build.chunkSizeWarningLimit` to reduce noisy warnings
- [x] Run `npm run build` in `client/` and confirm warning behavior


