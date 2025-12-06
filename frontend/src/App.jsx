import { Link, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GameDetail from "./pages/GameDetail";
import NewListing from "./pages/NewListing";

export default function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <div>
          <h1>Game Marketplace (RAWG + Keys/Accounts)</h1>
          <p>
            RAWG API tõmbab mängude info.
          </p>
        </div>
        <nav>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<GameDetail />} />
          <Route path="/game/:id/sell" element={<NewListing />} />
        </Routes>
      </main>
    </div>
  );
}
