<template>
    <AddMovie :actors="actors"></AddMovie>
</template>
  
  <script>
  import AddMovie from '../components/AddMovie.vue'
  import { getAllActors } from '../services/MovieService';
  
  export default {
    components: {
        AddMovie,
    },
    data() {
      return {
        actors: []
      }
    },
    created() {
      getAllActors().then(response => this.actors = response);
    },
  }
  </script>