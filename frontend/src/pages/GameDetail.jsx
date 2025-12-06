import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchGameDetails, fetchListingsByGame } from "../api";
import ListingCard from "../components/ListingCard";

export default function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [listings, setListings] = useState([]);
  const [loadingGame, setLoadingGame] = useState(true);
  const [loadingListings, setLoadingListings] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadGame() {
      try {
        setLoadingGame(true);
        const data = await fetchGameDetails(id);
        setGame(data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Mängu andmete laadimine ebaõnnestus.");
      } finally {
        setLoadingGame(false);
      }
    }

    async function loadListings() {
      try {
        setLoadingListings(true);
        const data = await fetchListingsByGame(id);
        setListings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingListings(false);
      }
    }

    loadGame();
    loadListings();
  }, [id]);

  return (
    <div className="grid-two">
      <section className="card detail-body">
        {loadingGame && <p className="text-muted">Laen mängu...</p>}
        {error && <p className="text-error">{error}</p>}
        {!loadingGame && game && !error && (
          <>
            <h2 style={{ marginTop: 0 }}>{game.name}</h2>
            {game.background_image && (
              <img
                src={game.background_image}
                alt={game.name}
                style={{
                  width: "100%",
                  maxHeight: 260,
                  objectFit: "cover",
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              />
            )}

            {game.rating != null && (
              <p>
                ⭐ Rating: {game.rating} ({game.ratings_count} arvustust RAWG-is)
              </p>
            )}

            {game.released && <p>Release date: {game.released}</p>}

            {Array.isArray(game.genres) && game.genres.length > 0 && (
              <p>
                <b>Genres:</b>{" "}
                {game.genres.map((g) => g.name || g).join(", ")}
              </p>
            )}

            {Array.isArray(game.platforms) && game.platforms.length > 0 && (
              <p>
                <b>Platforms:</b>{" "}
                {game.platforms
                  .map((p) => p.platform?.name || p)
                  .join(", ")}
              </p>
            )}

            <details style={{ marginTop: 10 }}>
              <summary style={{ cursor: "pointer" }}>Lühikirjeldus</summary>
              <p
                style={{ fontSize: 13, opacity: 0.8, marginTop: 8 }}
                dangerouslySetInnerHTML={{
                  __html: game.description || "No description.",
                }}
              />
            </details>

            <details style={{ marginTop: 10 }}>
              <summary style={{ cursor: "pointer" }}>Raw JSON</summary>
              <pre
                style={{
                  marginTop: 8,
                  background: "#05060a",
                  padding: 8,
                  borderRadius: 10,
                  fontSize: 11,
                  overflowX: "auto",
                }}
              >
                {JSON.stringify(game, null, 2)}
              </pre>
            </details>
          </>
        )}
      </section>

      <section className="card detail-body">
        <div className="card-header">
          <div>
            <div className="card-title">Kuulutused</div>
            <div className="card-sub">
              Buy/Sell – keys & accounts selle mängu jaoks.
            </div>
          </div>
          <Link to={`/game/${id}/sell`}>
            <button>Lisa kuulutus</button>
          </Link>
        </div>

        {loadingListings && (
          <p className="text-muted">Laen kuulutusi...</p>
        )}

        {!loadingListings && listings.length === 0 && (
          <p className="text-muted">Sellele mängule pole veel kuulutusi.</p>
        )}

        {listings.map((l) => (
          <ListingCard key={l.id} listing={l} />
        ))}
      </section>
    </div>
  );
}
