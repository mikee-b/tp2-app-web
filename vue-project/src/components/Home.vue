<template>
  <div>
    <h2>{{ title }}</h2>
    <ul class="movies">
      <li
        v-for="movie in threeMovies"
        :key="movie.id"
        v-bind:class="{
          discontinued: movie.discontinued,
          selected: selectedMovie === movie,
        }"
        @click="onSelect(movie)" 
      >
       <img src={{ movie.picture }} alt="movie picture">
        <span class="title">{{ movie.title }}</span>
        <!-- <span class="img">{{ movie.img }}</span>
        <span class="release">{{ movie.release }}</span> -->
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
      pageNumber: 1,
    };
  },
  computed: {
    threeMovies() {
      return this.movies.slice(start, 3);
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
