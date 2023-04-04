<template>
    <RecentMovieList :movies="movies"></RecentMovieList>
  </template>
  
  <script>
  import RecentMovieList from '../components/RecentMovies.vue'
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
    created() {
      getRecentMovies().then(response => this.movies = response);
    },
  };
  </script>
  
  