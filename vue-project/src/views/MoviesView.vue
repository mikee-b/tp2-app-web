
<template>
    <SearchResults :movies="movies"></SearchResults>
  </template>
  
  <script>
  import RecentMovieList from '../components/RecentMovies.vue'
  import { searchMoviesByKeyWords } from '@/services/MovieService.js';
import SearchResults from '../components/SearchResults.vue';
import { searchMoviesByKeyWordsGenreAndYear } from '../services/MovieService';
  
  export default {
    components: {
    RecentMovieList,
    SearchResults
},
    data() {
      return {
        movies: []
      }
    },
    mounted() {
        let searchQuery = this.$route.query.searchQuery;
        let year = this.$route.query.year;
        let genre = this.$route.query.genre;
        if (this.$route.query.searchQuery == undefined)
            searchQuery = ''
        if (this.$route.query.year == undefined)
            year = ''
        if (this.$route.query.genre == undefined)
            genre = ''
      searchMoviesByKeyWordsGenreAndYear(searchQuery, genre, year).then(response => this.movies = response);
    },
  };
  </script>
  
  