import { useState } from "react";
import { searchGames } from "../api";
import GameCard from "../components/GameCard";

export default function Home() {
  const [q, setQ] = useState("");
  const [games, setGames] = useState([]);

  async function onSearch(e) {
    e.preventDefault();
    const data = await searchGames(q);
    setGames(data.results || []);
  }

  return (
    <div>
      <h2>Search Games</h2>

      <form onSubmit={onSearch}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="The Witcher..." />
        <button type="submit">Search</button>
      </form>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {games.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </div>
    </div>
  );
}
