const RAWG_BASE = "https://api.rawg.io/api";

function buildUrl(path, params = {}) {
  const url = new URL(RAWG_BASE + path);
  const apiKey = process.env.RAWG_API_KEY;

  if (!apiKey) {
    throw new Error("RAWG_API_KEY missing");
  }

  url.searchParams.set("key", apiKey);

  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") {
      url.searchParams.set(k, v);
    }
  }

  return url.toString();
}

export async function rawgFetch(path, params = {}) {
  const url = buildUrl(path, params);

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`RAWG error ${res.status}`);
  }

  return res.json();
}

export async function getTopGames(req, res) {
  try {
    const data = await rawgFetch("/games", {
      ordering: "-rating",
      page_size: 20,
    });
    res.json(data.results || []);
  } catch (err) {
    console.error("TOP GAMES ERROR:", err);
    res.status(500).json({ error: "Failed to fetch games" });
  }
}

export async function searchGames(req, res) {
  const { q } = req.query;

  if (!q) return res.status(400).json({ error: "Missing q parameter" });

  try {
    const data = await rawgFetch("/games", {
      search: q,
      page_size: 20,
    });
    res.json(data.results || []);
  } catch (err) {
    console.error("SEARCH ERROR:", err);
    res.status(500).json({ error: "Failed to search games" });
  }
}

export async function getGameDetails(req, res) {
  const { id } = req.params;

  try {
    const data = await rawgFetch(`/games/${id}`);
    res.json(data);
  } catch (err) {
    console.error("DETAIL ERROR:", err);
    res.status(500).json({ error: "Failed to fetch game details" });
  }
}
