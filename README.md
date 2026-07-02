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


## Preview

**Search results:**
<img width="2360" height="1233" alt="image" src="https://github.com/user-attachments/assets/adcc56af-c309-49cf-85b8-1028008081e4" />

**Empty state (no matches):**
<img width="2360" height="1255" alt="image" src="https://github.com/user-attachments/assets/12f6bed3-875a-4923-99d2-9a92aeb74cd8" />



## Notes
The GitHub Search API is rate-limited to 10 requests/minute for unauthenticated requests.
