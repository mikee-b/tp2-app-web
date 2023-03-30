<template>
  <div>
    <h2 class="title">{{ title }}</h2>
    <ul class="movies">
      <li
        v-for="movie in threeMovies"
        
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
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      title: "Most Popular Movies",
      selectedmovie: null,
      baseUrlImg: "https://image.tmdb.org/t/p/w500"
    };
  },
  computed: {
    threeMovies() {
      return this.movies;
    },
  },
  methods: {
    onSelect(movie) {
        console.log(movie.id)
      this.$router.push({ name: "movie", params: { id: movie.id } });
    },
  },
};
</script>

<style lang="css" scoped>
  .movies{
    display: flex;
    justify-content: space-around;

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
    font-size: 1.5rem;
    color: var(--main-text-color);
  }
  .movies .movie-release{
    font-size: 1rem;
    color: var(--main-text-color);
  }
  .movies li {
    display: flex;
    flex-direction: column;
  }
</style>
