<template>
    <div class="recent-movies-container">
      <button class="add_movie_btn" @click=onAddMovie()>Ajout d'un film</button>
      <h3 class="greetingMessage">{{ greetingMessage }}</h3>
      <h2 class="title">{{ title }}</h2>
      <ul class="movies">
        <li
          v-for="movie in threeMovies"
          
          @click="onSelect(movie)" 
        >
          <img class="movie-img" :src="movie.image" alt="movie picture">
          <span class="movie-title">{{ movie.titre }}</span>
          <span class="movie-release">{{ movie.annee }}</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      movies: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        title: "Most Popular Movies",
        greetingMessage: "🎥Welcome movies enjoyers🎥",
        selectedmovie: null
      };
    },
    computed: {
      threeMovies() {
        return this.movies;
      },
    },
    methods: {
      onSelect(movie) {
        this.$router.push({ name: "movie", params: { id: movie.id } });
      },
      onAddMovie(){
        this.$router.push("/addMovie");
      }
    },
  };
  </script>
  
  <style lang="css" scoped>
    .add_movie_btn{
      float: right;
      font-size: 1.5rem;
      height:3rem;
      border-radius: 100px;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      margin-top: 1rem;
      margin-right: 10rem;
    }
    .movies{
      display: flex;
      justify-content: space-around;
      flex-flow: row wrap;
      margin: 0;
      list-style-type: none;
      padding: 0;
    }
    .recent-movies-container{
      position: relative;
    }
    .title, .greetingMessage{
      text-align: center;
      color: var(--main-text-color);
      margin: 4rem 0;
    }
    .title{
      text-decoration: underline;
    }
    .movies .movie-img{
      background-image: url(../../img/img_cannot_load_movie.png);
      width: 25vw;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 15vw;
    }
    .movies .movie-title{
      font-size: 1.2rem;
      color: var(--main-text-color);
      width:fit-content;
      margin: 0.5rem 0;
      cursor: pointer;
      padding: 0 0.5rem;
  
      background:
        linear-gradient(to right, var(--second-text-color) 2px, transparent 4px) 0 0,
        linear-gradient(to left, var(--second-text-color) 2px, transparent 4px) 100% 100%,
        linear-gradient(to bottom, var(--second-text-color) 2px, transparent 4px) 0 0,
        linear-gradient(to top, var(--second-text-color) 2px, transparent 4px) 100% 100%;
  
      background-repeat: no-repeat;
      background-size: 20px 20px;
    }
    .movies .movie-title:hover{
      background:
        linear-gradient(to right, var(--second-text-color) 2px, transparent 4px) 100% 100%,
        linear-gradient(to left, var(--second-text-color) 2px, transparent 4px) 100% 100%,
        linear-gradient(to bottom, var(--second-text-color) 2px, transparent 4px) 100% 100%,
        linear-gradient(to top, var(--second-text-color) 2px, transparent 4px) 100% 100%;
    }
    .movies .movie-release{
      font-size: 1rem;
      color: var(--main-text-color);
    }
    .movies li {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
    }
    .movies .break:nth-child(3n){
      display: block;
      width: 100%;
      height: 0;
    }
  </style>