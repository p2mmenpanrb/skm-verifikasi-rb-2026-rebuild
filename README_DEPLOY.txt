SKM VERIFIKASI RB 2026 — NETLIFY REBUILD

Current baseline:
- index.html = frontend V9
- Static prototype data still exists inside index.html
- Booking interaction restored
- Institution category logic restored
- Access-log prototype restored
- Backend proxy included but frontend is not connected to it yet

DEPLOY
1. Replace your GitHub repository contents with this package.
2. Keep:
   - index.html
   - netlify.toml
   - netlify/functions/skm-api.js
3. Commit to main.
4. Netlify will deploy automatically if the repository is connected.

ENVIRONMENT VARIABLE
When ready to connect Apps Script:
APPS_SCRIPT_URL = your Apps Script /exec URL

IMPORTANT
The current index.html is still frontend-only.
It can be deployed immediately for visual/interaction testing.
The next integration step will remove demoData and connect the page to:
- bootstrap
- institution
- availability
- saveVerification
