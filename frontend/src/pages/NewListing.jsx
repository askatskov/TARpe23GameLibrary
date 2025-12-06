import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchGameDetails, createListing } from "../api";

export default function NewListing() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [loadingGame, setLoadingGame] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    type: "SELL",
    itemType: "KEY",
    platform: "",
    price: "",
    currency: "EUR",
    description: "",
    userId: 1, 
  });

  useEffect(() => {
    async function loadGame() {
      try {
        setLoadingGame(true);
        const data = await fetchGameDetails(id);
        setGame(data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Mängu laadimine ebaõnnestus.");
      } finally {
        setLoadingGame(false);
      }
    }
    loadGame();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!game) return;

    try {
      await createListing({
        gameRawgId: game.id,
        gameSlug: game.slug,
        gameName: game.name,
        type: form.type,
        itemType: form.itemType,
        platform: form.platform,
        price: Number(form.price),
        currency: form.currency,
        description: form.description,
        userId: form.userId,
      });

      navigate(`/game/${game.id}`);
    } catch (err) {
      console.error(err);
      alert("Kuulutuse salvestamine ebaõnnestus (vaata backend logi).");
    }
  }

  return (
    <div className="card" style={{ maxWidth: 640 }}>
      <div className="card-header">
        <div>
          <div className="card-title">Lisa kuulutus</div>
          <div className="card-sub">
            BUY/SELL – key või account selle konkreetse mängu jaoks.
          </div>
        </div>
        <Link to={`/game/${id}`}>
          <button className="secondary">Tagasi</button>
        </Link>
      </div>

      {loadingGame && <p className="text-muted">Laen mängu...</p>}
      {error && <p className="text-error">{error}</p>}
      {game && !loadingGame && (
        <p className="text-muted">
          Mäng: <b>{game.name}</b>
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: 10, marginTop: 10 }}
      >
        <div>
          <label style={{ fontSize: 13 }}>Tüüp</label>
          <br />
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            <option value="SELL">SELL</option>
            <option value="BUY">BUY</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: 13 }}>Item type</label>
          <br />
          <select
            name="itemType"
            value={form.itemType}
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            <option value="KEY">KEY</option>
            <option value="ACCOUNT">ACCOUNT</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: 13 }}>Platform</label>
          <br />
          <input
            type="text"
            name="platform"
            placeholder="Steam, Epic, PS5..."
            value={form.platform}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 13 }}>Price</label>
            <br />
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ width: 120 }}>
            <label style={{ fontSize: 13 }}>Currency</label>
            <br />
            <input
              type="text"
              name="currency"
              value={form.currency}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div>
          <label style={{ fontSize: 13 }}>Description</label>
          <br />
          <textarea
            name="description"
            rows={4}
            placeholder="Region free key, 1-time used account jne..."
            value={form.description}
            onChange={handleChange}
            style={{ width: "100%", resize: "vertical" }}
          />
        </div>

        <div style={{ textAlign: "right", marginTop: 4 }}>
          <button type="submit">Salvesta kuulutus</button>
        </div>
      </form>
    </div>
  );
}
