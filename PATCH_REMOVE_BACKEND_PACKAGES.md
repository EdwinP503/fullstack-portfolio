PATCH: Remove backend-only packages from root package.json

Goal
- Remove server/backend-only dependencies from the root `package.json` to avoid confusion and reduce surface area.

Rationale
- The repository no longer contains an active local backend. The backend code has been archived and the local lambda was removed. Root `dependencies` list contains Express/Mongo and related packages that are not used by the frontend.

Packages proposed for removal (from `dependencies` in root `package.json`):
- body-parser
- express
- mongodb
- mongoose

Optional removals (if you want a minimal root manifest):
- rollup
- @rollup/plugin-babel
- @rollup/plugin-commonjs
- @rollup/plugin-node-resolve
- esbuild

Proposed post-patch `dependencies` block (example)

{
  "dependencies": {
    "@mdx-js/mdx": "^3.1.0",
    "@mdx-js/react": "^3.1.0",
    "@mdx-js/rollup": "^3.1.0",
    "framer-motion": "^11.13.5",
    "nth-check": "^2.1.1"
  }
}

Patch management cycle (recommended)
1) Create a branch for the change:
   git checkout -b chore/remove-backend-deps

2) Apply the change locally (edit `package.json`) to remove the listed packages and run:
   npm install --package-lock-only
   # or run `npm prune && npm install` to ensure `node_modules` reflect the new manifest

3) Run smoke tests (optional but recommended):
   # If you run the frontend locally
   cd frontend
   npm ci
   npm run build

4) Commit the changes and push:
   git add package.json package-lock.json
   git commit -m "chore: remove backend-only deps from root package.json"
   git push origin chore/remove-backend-deps

5) Create a PR and run CI / manual verification.

Notes & rollback
- If you later need these packages, revert the commit or re-add the package names and run `npm install`.
- This patch only edits the repository-level manifest and lockfile; it will not remove any code.

If you want, I can apply this patch now (create the branch, update `package.json`, regenerate `package-lock.json`) or just create this patch file for you to follow manually. Which do you prefer?