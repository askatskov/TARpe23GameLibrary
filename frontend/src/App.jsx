import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Sell from "./pages/Sell";

export default function App() {
  return (
    <div style={{ fontFamily: "Arial", padding: 20 }}>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/">Home</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<Game />} />
        <Route path="/sell/:rawgId" element={<Sell />} />
      </Routes>
    </div>
  );
}
