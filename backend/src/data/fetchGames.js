/*const RAWG_BASE = "https://api.rawg.io/api";

function buildUrl(path, params = {}) {
  const url = new URL(RAWG_BASE + path);
  url.searchParams.set("key", process.env.RAWG_API_KEY);

  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null) {
      url.searchParams.set(k, String(v));
    }
  }

  return url.toString();
}

async function rawgFetch(path, params) {
  const url = buildUrl(path, params);
  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`RAWG request failed ${res.status}: ${url} -> ${text}`);
  }

  return res.json();
}

async function fetchRawgGamesList(total = 50) {
  const pageSize = 40;
  const pages = Math.ceil(total / pageSize);
  const all = [];

  for (let page = 1; page <= pages; page++) {
    const data = await rawgFetch("/games", {
      page,
      page_size: pageSize,
      ordering: "-rating",
    });

    if (!data.results || data.results.length === 0) break;

    all.push(...data.results);

    if (!data.next) break;
  }

  return all.slice(0, total);
}

async function fetchRawgGameDetails(id) {
  return rawgFetch(`/games/${id}`);
}

async function fetchRawgScreenshots(id) {
  const data = await rawgFetch(`/games/${id}/screenshots`);
  return data.results || [];
}

async function fetchRawgMovies(id) {
  const data = await rawgFetch(`/games/${id}/movies`);
  return data.results || [];
}

export async function fetchFullGames(total = 50) {
  const list = await fetchRawgGamesList(total);
  const fullGames = [];

  for (const item of list) {
    try {
      const detail = await fetchRawgGameDetails(item.id);

      const [screenshots, movies] = await Promise.all([
        fetchRawgScreenshots(item.id).catch(() => []),
        fetchRawgMovies(item.id).catch(() => []),
      ]);

      fullGames.push({
        rawgId: detail.id,
        slug: detail.slug,
        name: detail.name,
        description: detail.description || "",
        descriptionRaw: detail.description_raw || "",
        imageUrl: detail.background_image,
        backgroundImageAdditional: detail.background_image_additional,
        website: detail.website || "",
        releaseDate: detail.released || null,

        rating: detail.rating ?? null,
        ratingTop: detail.rating_top ?? null,
        ratingsCount: detail.ratings_count ?? null,
        playtime: detail.playtime ?? null,

        genres: detail.genres?.map((g) => g.name) || [],
        platforms:
          detail.platforms
            ?.map((p) => p.platform?.name)
            .filter(Boolean) || [],
        tags: detail.tags?.map((t) => t.name) || [],
        stores:
          detail.stores?.map((s) => s.store?.name).filter(Boolean) || [],
        esrbRating: detail.esrb_rating || null,

        screenshots: screenshots.map((s) => s.image),
        movies: movies.map((m) => ({
          name: m.name,
          preview: m.preview,
          data: m.data,
        })),

        rawgMeta: detail,
      });
    } catch (err) {
      console.error(
        "❌ Failed to fetch full RAWG data for game:",
        item.id,
        err
      );
    }
  }

  return fullGames;
}
*/