# GitHub Repository Search

A small React + TypeScript app to search GitHub repositories using the GitHub REST Search API.

## Features
- Search GitHub repositories by keyword
- Pagination (10 results per page)
- Loading, error, and empty-state handling
- Responsive, minimal CSS design

## Tech Stack
- React
- TypeScript
- Vite
- GitHub REST API (`/search/repositories`)

## Getting Started

```bash
npm install
npm start
```

Open the local URL shown in the terminal to view the app.

## Notes
The GitHub Search API is rate-limited to 10 requests/minute for unauthenticated requests.
