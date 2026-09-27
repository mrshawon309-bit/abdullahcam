# abdullahcam

A Netlify-ready MEDIA downloader interface. The front page intentionally shows only **MEDIA** and does not list individual site names.

## Deploy
1. Upload this project to GitHub.
2. In Netlify choose **Add new project → Import an existing project**.
3. Select the GitHub repository.
4. Deploy.

The site is API-ready. The Netlify Functions currently validate requests and return demo responses; connect an authorized media-processing provider through Netlify environment variables to enable real downloads.

## API endpoints
- `/api/analyze`
- `/api/download`

Do not put API keys in `index.html` or `app.js`.
