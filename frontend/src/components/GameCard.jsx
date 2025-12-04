import { Link } from "react-router-dom";

export default function GameCard({ game }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      padding: 10,
      borderRadius: 8,
      margin: 10,
      width: 220
    }}>
      <img
        src={game.background_image}
        alt={game.name}
        style={{ width: "100%", borderRadius: 8 }}
      />
      <h4>{game.name}</h4>
      <p>⭐ {game.rating}</p>

      <Link to={`/game/${game.id}`}>View</Link>
    </div>
  );
}
