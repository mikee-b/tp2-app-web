<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/movies">Movies</RouterLink>
      </nav>
      <span class="search">
        Recherche par nom: <input v-model="filterName" />
        Genre: <select v-for="genre in this.genres">
          <option>{{ genre.name }}</option>
        </select>
        Year: <input class="input-year" />
      </span>
  </header>

  <RouterView />
</template>

<script>
/*import RecentMovieList from '../components/Home.vue'
import { getRecentMovies } from '@/services/MovieService.js';

export default {
  /*components: {
    RecentMovieList,
  },
  data() {
    return {
      genres: []
    }
  },
  created() {
    getGenres().then(response => this.genres = response);
  },
};*/
</script>

<style scoped>
header {
  background: rgba(255, 0, 123, 0.1);
  display: flex;
  padding: 1.5rem;
  justify-content:space-around;
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--selected-color);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  font-size: 1.2rem;
  padding: 0 1rem;
  font-size: 1.2rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

header .search{
  align-self: center;
  color: var(--nav-content-color);
  font-size: 1.2rem;
}

header .search > input{
  background-color: var(--nav-content-color);
  height: 2rem;
  width: 15rem;
  border: 2px solid var(--selected-color);
  border-radius: 25px;
}

header .search > .input-year{
  width: 6rem;
}

@media (min-width: 1024px) {
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
