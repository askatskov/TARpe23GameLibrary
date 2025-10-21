<template>
  <nav class="navbar">
    <div class="logo">
      🎮 GameLibrary
    </div>

    <ul class="nav-links">
      <li><a href="#">Home</a></li>
      <li><a href="#">Games</a></li>
      <li><a href="#">Library</a></li>
      <li><a href="#">Profile</a></li>
    </ul>

    <div class="actions">
      <button class="login-btn">Login</button>
    </div>
  </nav>
</template>

<script setup>
// No logic yet, but you can later add props or emit events if needed
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1a1a2e;
  padding: 1rem 2rem;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.4);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo {
  font-size: 1.8rem;
  font-weight: bold;
  letter-spacing: 1px;
  cursor: pointer;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  text-decoration: none;
  color: #ccc;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #42b883;
}

.actions {
  display: flex;
  align-items: center;
}

.login-btn {
  background: #42b883;
  color: #1a1a2e;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.login-btn:hover {
  background: #2da46f;
}
</style>
