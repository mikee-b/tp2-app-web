<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useTokensStore } from '@/stores/TokensStore.js';
</script>

<template>
  <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/movies">Movies</RouterLink>
      </nav>
      <div class="main">
        <form action="" method="post" @submit.prevent="executeSearch">
            <span class="search">
              Recherche par mots-clés: <input v-model="keyWordInput" placeholder="abc,def,..." />
              Genre: <select class="genre" v-model="genreSelect">
                <option value=""></option>
                <option :value="genre.id" v-for="genre in this.genres">{{ genre.name }}</option>
              </select>
              Year: <input v-model="yearInput" class="input-year" placeholder="YYYY"/>
              <button>search</button>
            </span>
        </form>
        <div class="triage">
          <p>Trier:</p>
            <input v-model="sortRadio" type="radio" id="date" name="sort_method" v-bind:value="'date'">
            <p for="date">Date de sortie</p>
            <input v-model="sortRadio" type="radio" id="rating" name="sort_method" v-bind:value="'rating'" checked>
            <p for="rating">Notes d'appréciation</p>
        </div>
    </div>
    <div v-if="isLoggedIn()">
      <button @click="onSignUp()" class="login">Profil</button>
      <button @click="onLogout()">Se déconnecter</button>
    </div>
    <div v-else>
      <button @click="onLogin()" class="login">Se connecter</button>
      <button @click="onSignUp()">Créer un compte</button>
    </div>
    <p v-if="isLoggedIn()">Hi {{ userName }}!</p>
  </header>
  <footer class="credit">
    <h2>Mathys Deshaies, Mikee Blanchet - 2023</h2>
  </footer>
  <RouterView />
</template>

<script>

import { getGenres, logout} from '@/services/MovieService.js';

export default {
    // setup() {
    //     const tokensStore = useTokensStore();
    //     return { tokensStore };
    // },
  data() {
    return {
      genres: [],
      keyWordInput: '',
      genreSelect: '',
      yearInput: '',
      sortRadio: 'rating',
      userName: '',
      tokensStore: useTokensStore()
    }
  },
  watch: {
    async keyWordInput()
    {
        if (this.keyWordInput.length >= 3 || this.keyWordInput.length == 0)
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
    async sortRadio()
    {
        this.executeSearch()
    },
  },
  methods: {
    isAdmin() {
        if (!this.isLoggedIn())
            return false
        return this.tokensStore.getLatestTokenDetails()['roleId'] == 1
    },
    getLoginText() {
        if (this.$store.state.token.isLoggedIn())
            return "Modifier le compte"
        else
            return "Connexion"
    },
    async executeSearch()
    {
        this.$router.push(`/movies?searchQuery=` + this.keyWordInput + `&genre=` + this.genreSelect + `&year=` + this.yearInput + `&sortBy=` + this.sortRadio + `&page=1`);
    },
    isLoggedIn()
    {
        let isLoggedIn = this.tokensStore.isLoggedIn();
        if (isLoggedIn)
        {
            let details = this.tokensStore.getLatestTokenDetails()
            this.userName = details['firstName'] + ' ' + details['lastName']
            
        }
        return isLoggedIn;
    },
    onLogin() {
      this.$router.push(`/login`);
    },
    onSignUp() {
      this.$router.push(`/signup`);
    },
    onLogout(){
        logout(this.tokensStore.latestToken);
        this.tokensStore.logOut();
    }
  },
  mounted() {
    getGenres().then(response => this.genres = response);
  }
}
</script>

<style scoped>
p{
  color: white;
}
.login{
  background: rgb(66, 66, 66, 0.0);
  border: 2px solid var(--nav-content-color);
}
.credit{
  position: fixed;
  bottom: 10px;
  right: 0;
  left: 0;
  text-align: center;
}
.genre{
  background-color: var(--nav-content-color);
  height: 2rem;
  color: #fff;
}
.genre option{
  color: #fff;
  font-size: 0.8rem;
}
button{
  margin-left: 10px;
}
.main{
  display: flex;
  flex-direction: column;
}
.triage{
  display: flex;
  margin-top: 0.5rem;
  gap: 0.6rem;
  margin-left: auto;
  margin-right: auto;
}
.triage p{
  color: var(--nav-content-color);
  align-self: center;
}
header {
  background: rgba(255, 0, 123, 0.1);
  display: flex;
  padding: 0.5rem 5rem;
  justify-content:space-between;
  line-height: 1.5;
  max-height: 100vh;
}

nav a.router-link-exact-active {
  color: var(--selected-color);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: flex;
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
  color: #fff;
  font-size: 1rem;
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