# abdullahcam — Netlify deployment

## Important
Do NOT upload `index.html`. The homepage in this project is `index.html`.

### Recommended method: GitHub → Netlify

1. Unzip `abdullahcam.zip`.
2. Create a new **private** GitHub repository.
3. Upload the CONTENTS of the `abdullahcam` folder to the repository.
   - `index.html` must be at the repository root.
   - `netlify.toml` must be at the repository root.
   - `netlify/functions/` must be present.
4. In Netlify choose **Add new project → Import an existing project → GitHub**.
5. Select the repository.
6. Deploy it.
7. After deployment, open your `*.netlify.app` URL.

The project already contains:
- `index.html`
- `netlify.toml`
- `netlify/functions/analyze.mjs`
- `netlify/functions/download.mjs`

### If you use Netlify Drop
Unzip the ZIP first. Netlify's documentation says to unzip a project ZIP before drag-and-drop. For a project with serverless functions, Git-connected deployment is recommended because Netlify's build system detects and deploys the functions.

### Why the previous site showed 404
The previous upload used `index.html`. Netlify expects `index.html` at the root for a normal static homepage. This project fixes that.

### Current backend status
The API endpoints are wired to:
- `/api/analyze`
- `/api/download`

They are currently safe placeholders. A real, authorized media-processing provider/API must be connected before real downloads work. Put provider secrets in Netlify environment variables; never put them in `app.js` or `index.html`.
