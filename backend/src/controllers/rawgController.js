const RAWG_BASE = "https://api.rawg.io/api";

function buildRawgUrl(path, params = {}) {
  const url = new URL(RAWG_BASE + path);
  const apiKey = process.env.RAWG_API_KEY;

  if (!apiKey) {
    throw new Error("RAWG_API_KEY is not set in environment");
  }

  url.searchParams.set("key", apiKey);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") {
      url.searchParams.set(k, String(v));
    }
  }

  return url.toString();
}

async function rawgFetch(path, params) {
  const url = buildRawgUrl(path, params);
  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`RAWG error ${res.status}: ${text}`);
  }

  return res.json();
}

export async function searchGames(req, res) {
  const { q, page = 1, pageSize = 20 } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Query 'q' is required" });
  }

  try {
    const data = await rawgFetch("/games", {
      search: q,
      page,
      page_size: pageSize,
    });
    res.json(data);
  } catch (err) {
    console.error("❌ RAWG search error:", err);
    res.status(500).json({ error: "Failed to search games from RAWG." });
  }
}

// GET /games/:id
export async function getGameDetails(req, res) {
  const { id } = req.params;

  try {
    const data = await rawgFetch(`/games/${id}`);
    res.json(data);
  } catch (err) {
    console.error("❌ RAWG details error:", err);
    res.status(500).json({ error: "Failed to fetch game details from RAWG." });
  }
}
