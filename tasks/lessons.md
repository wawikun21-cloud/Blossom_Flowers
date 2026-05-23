# Lessons Learned

## 2026-05-23 - Production Readiness Implementation

**Context**: Implementing production-ready features for Node.js/Express server

**Pattern**: Always check existing codebase patterns and dependencies before adding new ones; verify MySQL2 promise API uses correct option names

**Action**: Use `connectTimeout` instead of `acquireTimeout`/`timeout` for mysql2 pool configuration