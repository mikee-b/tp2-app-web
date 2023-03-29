<template>
  <div>
    <h2>{{ title }}</h2>
    <ul class="movies">
      <li
        v-for="movie in threeMovies"
        :key="movie.id"
        
        @click="onSelect(movie)" 
      >
        <img :src="baseUrlImg + movie.backdrop_path" alt="movie picture">
        <span class="title">{{ movie.title }}</span>
        <span class="release">{{ movie.release_date }}</span>
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
      title: "movies",
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
      this.$router.push({ name: "movie", params: { id: movie.id } });
    },
  },
};
</script>

<style lang="css" scoped>

</style>
