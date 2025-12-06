import { Link } from "react-router-dom";

export default function GameCard({ game }) {
  return (
    <div className="game-card">
      {game.background_image && (
        <img
          src={game.background_image}
          alt={game.name}
          className="game-card-img"
        />
      )}
      <div className="game-card-body">
        <div className="game-card-title">{game.name}</div>
        <div className="game-card-meta">
          {game.released && <span>{game.released}</span>}
          {game.rating != null && <span>⭐ {game.rating}</span>}
        </div>
        {Array.isArray(game.genres) && game.genres.length > 0 && (
          <div className="game-card-genres">
            {game.genres.map((g) => g.name || g).join(", ")}
          </div>
        )}
        <Link to={`/game/${game.id}`} className="game-card-link">
          View details
        </Link>
      </div>
    </div>
  );
}
