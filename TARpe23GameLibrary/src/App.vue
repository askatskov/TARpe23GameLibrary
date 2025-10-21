<script setup>
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div id="app">
    <!-- 🧭 Top Navigation -->
    <NavBar />

    <!-- 📄 Main Content -->
    <main class="main-content">
      <section class="hero">
        <h1>Welcome to GameLibrary 🎮</h1>
        <p>Discover, track, and organize your favorite games in one place.</p>
      </section>

      <section class="features">
        <div class="feature-card">
          <h2>📚 Game Collection</h2>
          <p>Keep track of every game you own — from retro classics to the latest releases.</p>
        </div>

        <div class="feature-card">
          <h2>⭐ Favorites</h2>
          <p>Create your personal wishlist and never lose track of what’s next.</p>
        </div>

        <div class="feature-card">
          <h2>🕹️ Explore</h2>
          <p>Browse new games, read details, and discover hidden gems.</p>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
#app {
  background: #0f0f1a;
  min-height: 100vh;
  color: #fff;
  font-family: 'Segoe UI', sans-serif;
}

.main-content {
  padding: 4rem 2rem;
  text-align: center;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.3rem;
  color: #aaa;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
}

.feature-card {
  background: #1a1a2e;
  padding: 2rem;
  border-radius: 12px;
  transition: transform 0.3s ease, background 0.3s ease;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
}

.feature-card:hover {
  transform: translateY(-6px);
  background: #22223a;
}

.feature-card h2 {
  margin-bottom: 0.8rem;
  color: #42b883;
}

.feature-card p {
  color: #ccc;
  font-size: 1rem;
}
</style>
