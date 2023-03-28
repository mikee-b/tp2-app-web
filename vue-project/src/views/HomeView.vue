
<template>
  <RecentMovieList :products="products" :page-size="5"></RecentMovieList>
</template>

<script>
import RecentMovieList from '../components/Home.vue'
import { getRecentMovies } from '@/services/MovieService.js';

export default {
  components: {
    RecentMovieList,
  },
  data() {
    return {
      movies: []
    }
  },
  mounted() {
    getRecentMovies().then(response => this.movies = response);
  },
};
</script>

