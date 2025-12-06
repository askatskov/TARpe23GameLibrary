const API_BASE = "http://localhost:8000/api/v1";

export async function fetchTopGames() {
  const res = await fetch(`${API_BASE}/games`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function searchGames(q) {
  const res = await fetch(
    `${API_BASE}/games/search?q=${encodeURIComponent(q)}`
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function fetchGameDetails(id) {
  const res = await fetch(`${API_BASE}/games/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function fetchListingsByGame(gameRawgId) {
  const res = await fetch(
    `${API_BASE}/listings?gameRawgId=${encodeURIComponent(gameRawgId)}`
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function createListing(payload) {
  const res = await fetch(`${API_BASE}/listings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
