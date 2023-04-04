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
      <form action="" method="post" @submit.prevent="executeSearch">
          <span class="search">
            Recherche par mots-clés: <input v-model="keyWordInput" />
            Genre: <select class="genre" v-model="genreSelect">
              <option value=""></option>
              <option :value="genre.id" v-for="genre in this.genres">{{ genre.name }}</option>
            </select>
            Year: <input v-model="yearInput" class="input-year" />
            <button>search</button>
          </span>
      </form>
  </header>
  <footer class="credit">
    <h2>Mathys Deshaies, Mikee Blanchet - 2023</h2>
  </footer>
  <RouterView />
</template>

<script>
import { getGenres } from '@/services/MovieService.js';
import { searchMoviesByKeyWordsGenreAndYear } from '@/services/MovieService.js';

export default {
  data() {
    return {
      genres: [],
      keyWordInput: '',
      genreSelect: '',
      yearInput: ''
    }
  },
  watch: {
    async keyWordInput()
    {
        if (this.keyWordInput.length >= 3)
        {
            this.executeSearch()
        }
    },

    async genreSelect()
    {
        this.executeSearch()
    },

    async yearInput()
    {
        if (this.yearInput.length == 4 || this.yearInput.length == 0)
            this.executeSearch()
    },
  },
  methods: {
    async executeSearch()
    {
        this.$router.push(`/movies?` + `searchQuery=` + this.keyWordInput + `&` + `genre=` + this.genreSelect + `&` + `year=` + this.yearInput).then(this.$forceUpdate())

    }
  },
  created() {
    getGenres().then(response => this.genres = response);
  },
};
</script>

<style scoped>
.credit{
  position: fixed;
  bottom: 10px;
  right: 0;
  left: 0;
  text-align: center;
}
.genre{
  background-color: var(--nav-content-color);
}
.genre option{
  color: #fff;
    font-size: 0.8rem;
}
button{
margin-left: 10px;
}
input{
  color: #fff;
  font-size: 1rem;
}
header {
  background: rgba(255, 0, 123, 0.1);
  display: flex;
  padding: 1.5rem;
  justify-content:space-around;
  line-height: 1.5;
  max-height: 100vh;
}

nav {
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
.credit{
      position: fixed;
      bottom: 10px;
      right: 0;
      left: 0;
      text-align: center;
    }

@media (min-width: 1024px) {
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>