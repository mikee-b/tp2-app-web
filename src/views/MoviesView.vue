
<template>
    <SearchResults :key="movies"></SearchResults>
  </template>
  
  <script>
  import RecentMovieList from '../components/RecentMovies.vue'
  import SearchResults from '../components/SearchResults.vue';
  import { searchMoviesByKeyWordsGenreAndYear } from '../services/MovieService';
  
  export default {
    components: {
    RecentMovieList,
    SearchResults
},
    data() {
      return {
        movies: [],
      }
    },
    mounted() {
      this.updateSearchResults();
    },
    beforeRouteUpdate(to, from)
    {
        this.updateSearchResults(to.query);
    },
    methods: {
        updateSearchResults(query)
        {
            let searchQuery = '';
            let year = '';
            let genre = '';
            let page = 1;
            let sortBy = '';
            
            if (query == undefined)
            {
                searchQuery = this.$route.query.searchQuery;
                year = this.$route.query.year;
                genre = this.$route.query.genre;
                page = this.$route.query.page;
                sortBy = this.$route.query.sortBy;
                if (this.$route.query.searchQuery == undefined)
                    searchQuery = ''
                if (this.$route.query.year == undefined)
                    year = ''
                if (this.$route.query.genre == undefined)
                    genre = ''
                if (this.$route.query.page == undefined)
                    page = 1
                if (this.$route.query.sortBy == undefined)
                    sortBy = 'rating'
            }
            else
            {
                searchQuery = query.searchQuery;
                year = query.year;
                genre = query.genre;
                page = query.page;
                sortBy = query.sortBy;
                if (query.searchQuery == undefined)
                    searchQuery = ''
                if (query.year == undefined)
                    year = ''
                if (query.genre == undefined)
                    genre = ''
                if (query.page == undefined)
                    page = 1
                if (query.sortBy == undefined)
                    sortBy = 'rating'
            }

            searchMoviesByKeyWordsGenreAndYear(searchQuery, genre, year, page, sortBy).then(response => this.movies = response);
        },
    }
  };
  </script>
  
  