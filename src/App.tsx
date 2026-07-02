import { useState, FormEvent } from "react";
import "./App.css";

interface Repo {
  id: number;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
}

interface SearchResponse {
  total_count: number;
  items: Repo[];
}

const PER_PAGE = 10;

function App() {
  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState<Repo[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const search = async (q: string, pageNum: number) => {
    if (!q.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(
          q
        )}&page=${pageNum}&per_page=${PER_PAGE}`
      );
      if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
      const data: SearchResponse = await res.json();
      setRepos(data.items);
      setTotalCount(data.total_count);
      setPage(pageNum);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setRepos([]);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    search(query, 1);
  };

  const totalPages = Math.min(Math.ceil(totalCount / PER_PAGE), 100); // GitHub caps at 1000 results

  return (
    <div className="app">
      <h1>GitHub Repository Search</h1>

      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search repositories..."
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {searched && !loading && !error && repos.length === 0 && (
        <p className="empty">No repositories found.</p>
      )}

      <ul className="repo-list">
        {repos.map((repo) => (
          <li key={repo.id} className="repo-card">
            <a href={repo.html_url} target="_blank" rel="noreferrer">
              {repo.full_name}
            </a>
            {repo.description && <p>{repo.description}</p>}
            <div className="repo-meta">
              {repo.language && <span>{repo.language}</span>}
              <span>★ {repo.stargazers_count.toLocaleString()}</span>
            </div>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={page <= 1 || loading}
            onClick={() => search(query, page - 1)}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages || loading}
            onClick={() => search(query, page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
