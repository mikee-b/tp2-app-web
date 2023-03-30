<template>
  <h1>{{ movie.title }}</h1>
  <img
    :src="baseUrlImg + movie.backdrop_path" width="600"  style="float: right" />
  <h2>{{ movie.overview }}</h2>
  <p>Rating: {{ movie.vote_average }}</p>
  <p>durée: {{ movie.runtime }} minutes</p>
  <p>année de parution: {{ getYearFromDate(movie.release_date) }}</p>
  <p>site: <a :href="movie.homepage" target="_blank">{{ movie.homepage }}</a></p>
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
  methods: {
    getYearFromDate(date)
    {
        if (date != undefined)
            date = date.split("-", 1).pop();
        return date;
    }
  }
};
</script>

<style lang="css" scoped></style>
