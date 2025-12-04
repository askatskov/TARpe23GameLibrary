import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createListing, getGameDetails } from "../api";

export default function Sell() {
  const { rawgId } = useParams();
  const nav = useNavigate();

  const [form, setForm] = useState({
    price: "",
    type: "SELL",
    itemType: "KEY",
    platform: "Steam",
    description: "",
  });

  async function submit(e) {
    e.preventDefault();

    const game = await getGameDetails(rawgId);

    await createListing({
      gameRawgId: game.id,
      gameName: game.name,
      gameSlug: game.slug,
      ...form,
      price: Number(form.price)
    });

    nav(`/game/${rawgId}`);
  }

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <h2>Create Listing</h2>

      <form onSubmit={submit}>
        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={change}
        /><br />

        <select name="type" value={form.type} onChange={change}>
          <option value="SELL">SELL</option>
          <option value="BUY">BUY</option>
        </select><br />

        <select name="itemType" value={form.itemType} onChange={change}>
          <option value="KEY">KEY</option>
          <option value="ACCOUNT">ACCOUNT</option>
        </select><br />

        <input
          name="platform"
          placeholder="Platform (Steam, Epic...)"
          value={form.platform}
          onChange={change}
        /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={change}
        /><br />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
