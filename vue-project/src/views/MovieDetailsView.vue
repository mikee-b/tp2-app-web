<template>
  <h1>{{ movie.title }}</h1>
  <img
    :src="baseUrlImg + movie.backdrop_path" width="600"  style="float: right" />
  <h2>{{ movie.overview }}</h2>
  <p>Rating: {{ movie.vote_average }}</p>
  <p>durée: {{ product.runtime }}</p>
  <p>année de parution: {{ movie.release_date }}</p>
  <p>site: {{ movie.homepage }}</p>
</template>

<script>
import { getMovie } from '@/services/MovieService.js';

export default {
  data() {
    return {
      product: Object,
      baseUrlImg: "https://image.tmdb.org/t/p/original/",
      movie: Object
    };
  },
  props: {
    id: {
      type: Number,
    },
  },
  mounted() {
    getMovie(this.id).then(response => this.movie = response);
  },
};
</script>

<style lang="css" scoped></style>
