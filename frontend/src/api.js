const API = "http://localhost:8000/api/v1";

// RAWG search
export async function searchGames(q) {
  const res = await fetch(`${API}/games/search?q=${encodeURIComponent(q)}`);
  return res.json();
}

// RAWG details
export async function getGameDetails(id) {
  const res = await fetch(`${API}/games/${id}`);
  return res.json();
}

// Marketplace listings
export async function getListings(gameRawgId) {
  const res = await fetch(`${API}/listings?gameRawgId=${gameRawgId}`);
  return res.json();
}

// Create listing
export async function createListing(data) {
  const res = await fetch(`${API}/listings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
