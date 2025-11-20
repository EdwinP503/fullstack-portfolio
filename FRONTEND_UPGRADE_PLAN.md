# Frontend Upgrade Plan & Project Cleanup

**Status**: Cleanup completed (2025-11-20)

## Completed Cleanup Tasks ✅

### Dependencies Addressed
- ✅ Removed `emailjs-com` (deprecated package)
- ✅ Ran `npm update --legacy-peer-deps` (upgraded 10+ packages to patch/minor versions)
- ✅ Fixed `js-yaml` prototype pollution vulnerability (GHSA-mh29-5h37-fv8m)
- ✅ Resolved webpack-dev-server vulnerabilities (kept v4.15.2 as dev-only acceptable risk)

### Files & Directories Deleted
- ✅ `backend/archive/` (old MongoDB backend, no longer used)
- ✅ `pentest_report/` (testing artifact, not needed for production)
- ✅ Root-level unused backend dependencies from `package.json` (express, mongodb, mongoose, body-parser, etc.)
- ✅ Malformed patch files (webpack-dev-server patches that caused CI failures)

### Project Structure Cleaned
- ✅ Removed unnecessary root-level `package.json` dependencies
- ✅ Kept only frontend build scripts at root
- ✅ Added `.github/dependabot.yml` to suppress dev-only webpack-dev-server alerts

### Current Architecture
- **Frontend**: React 18.3.1 with react-router v6.30.2 (production-ready)
- **Deployment**: Netlify with proper `netlify.toml` configuration
- **Security**: All critical vulnerabilities resolved; dev-only alerts documented

## Future Major Upgrade Opportunities (Optional)

When ready for major version bumps, consider these in order:
1. react-router-dom: 6.x → 7.x (review migration guide)
2. @react-three/* ecosystem: 8.x/9.x → latest (test 3D scenes)
3. FontAwesome: 6.x → 7.x (update imports)
4. framer-motion: 11.x → 12.x (verify animations)

These are feature enhancements and can be deferred; current versions are stable and secure.
