import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getGameDetails, getListings } from "../api";
import ListingCard from "../components/ListingCard";

export default function Game() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getGameDetails(id).then(setGame);
    getListings(id).then(setListings);
  }, [id]);

  if (!game) return <p>Loading...</p>;

  return (
    <div>
      <h2>{game.name}</h2>

      <img src={game.background_image} width={400} />

      <p>{game.description_raw?.slice(0, 200)}...</p>

      <Link to={`/sell/${id}`}><button>Sell Key / Account</button></Link>

      <h3>Listings</h3>
      {listings.length === 0 && <p>No listings yet.</p>}
      {listings.map((l) => (
        <ListingCard key={l.id} item={l} />
      ))}
    </div>
  );
}
