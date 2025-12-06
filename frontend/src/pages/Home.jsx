import { useEffect, useState } from "react";
import { fetchTopGames, searchGames } from "../api";
import GameCard from "../components/GameCard";

export default function Home() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchTopGames();
        setGames(data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Mängude esilehe laadimine ebaõnnestus.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleSearch(e) {
    e.preventDefault();
    if (!search.trim()) return;

    try {
      setSearchLoading(true);
      const data = await searchGames(search.trim());
      setGames(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Otsing ebaõnnestus.");
    } finally {
      setSearchLoading(false);
    }
  }

  return (
    <div className="grid-two">
      {/* Vasak – mängude list */}
      <section className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Mängud</div>
            <div className="card-sub">
              Esialgu RAWG top-rating list, hiljem filtrid ja kategooriad.
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSearch}
          style={{ display: "flex", gap: 8, marginBottom: 10 }}
        >
          <input
            type="text"
            placeholder="Otsi mängu (nt. Witcher)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Otsi</button>
        </form>

        {loading && <p className="text-muted">Laen top mänge...</p>}
        {error && <p className="text-error">{error}</p>}

        <div className="games-scroll">
          <div className="games-grid">
            {!loading && games.length === 0 && (
              <p className="text-muted">Mänge ei leitud.</p>
            )}
            {games.map((g) => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>
        </div>
      </section>

      {/* Parem – lühike selgitus / roadmap */}
      <section className="card">
        <div className="card-header">
          <div className="card-title">Mis see leht on?</div>
        </div>
        <p className="text-muted">
          See on RAWG API peale ehitatud marketplace:
        </p>
        <ul className="text-muted" style={{ paddingLeft: 18, fontSize: 13 }}>
          <li>Mängude info ja pildid tulevad RAWG API-st.</li>
          <li>
            Iga mängu juures saad näha kasutajate kuulutusi (Buy/Sell, key või
            account).
          </li>
          <li>
            Hiljem lisame on vaja lisada kasutajad, chati, mainsüsteem jne.
          </li>
        </ul>
        <p className="text-muted">
          Kliki vasakul mõnel mängul, et näha selle detaili ja kuulutusi.
        </p>
      </section>
    </div>
  );
}
