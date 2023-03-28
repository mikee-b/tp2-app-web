
<template>
  <RecentMovieList :movies="movies"></RecentMovieList>
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
  created() {
    getRecentMovies().then(response => this.movies = response);
    console.log('homeView')
    console.log(this.movies)
  },
};
</script>


<template>
    <RecentMovieList :movies="movies"></RecentMovieList>
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
    created() {
      getRecentMovies().then(response => this.movies = response);
    },
  };
  </script>
  
  