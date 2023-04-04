<template>
    <div>
      <h2 class="title">{{ title }}</h2>
      <ul class="movies">
        <li
          v-for="movie in this.movies.results"
          
          @click="onSelect(movie)" 
        >
          <img class="movie-img" :src="baseUrlImg + movie.backdrop_path" alt="movie picture">
          <span class="movie-title">{{ movie.title }}</span>
          <span class="movie-release">{{ movie.release_date }}</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  
  export default {
    props: {
      movies: {
        type: Object,
        default: () => [],
      },
    },
    data() {
      return {
        title: "Search your favorite movie!",
        selectedmovie: null,
        baseUrlImg: "https://image.tmdb.org/t/p/w500"
      };
    },
    computed: {
      movies() {
        return ;
      },
    },
    methods: {
      onSelect(movie) {
        this.$router.push({ name: "movie", params: { id: movie.id } });
      },
    },
  };
  </script>
  
  <style lang="css" scoped>
    .movies{
      display: flex;
      justify-content: space-around;
      flex-flow: row wrap;
      margin: 0;
      list-style-type: none;
      padding: 0;
    }
  
    .title{
      text-align: center;
      text-decoration: underline;
      font-size: 2rem;
      color: var(--main-text-color);
      margin: 2rem 0;
    }
    .movies .movie-img{
      width: 25vw;
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