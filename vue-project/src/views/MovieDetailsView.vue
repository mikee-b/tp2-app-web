<template>
    <h1>{{ movie.title }}</h1>
    <img
      :src="baseUrlImg + movie.backdrop_path" width="600"  style="float: right" />
    <h2>{{ movie.overview }}</h2>
    <div class="average-rating">
        <div class="average-rating-star" v-for="index in 5" :key="index">
            <p v-if="getNumberOfStarsFromRating(movie.vote_average) >= (index)" class="static-rate full-star ">★</p>
            <p v-if="getNumberOfStarsFromRating(movie.vote_average) <= (index - 1)" class="static-rate empty-star">★</p>
        </div>
    </div>
    <p>durée: {{ movie.runtime }}</p>
    <p>année de parution: {{ getYearFromDate(movie.release_date) }}</p>
    <p>site: <a :href="movie.homepage" target="_blank">{{ movie.homepage }}</a></p>
    <form action="" method="post" @submit.prevent="submitForm">
      <div class="rate">
          <input type="radio" id="star5" name="rate" value="10" />
          <label for="star5" title="text">5 stars</label>
          <input type="radio" id="star4" name="rate" value="8" />
          <label for="star4" title="text">4 stars</label>
          <input type="radio" id="star3" name="rate" value="6" />
          <label for="star3" title="text">3 stars</label>
          <input type="radio" id="star2" name="rate" value="4" />
          <label for="star2" title="text">2 stars</label>
          <input type="radio" id="star1" name="rate" value="2" />
          <label for="star1" title="text">1 star</label>
      </div>
      <button type="submit">Envoyer</button>
    </form>
  </template>
  
  <script>
  import { getMovie } from '@/services/MovieService.js';
  import { rateMovie } from '@/services/MovieService.js';
  import { getCurrentSessionId } from '@/services/MovieService.js';
  
  export default {
    data() {
      return {
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
      },
      submitForm(e)
      {
          const formData = new FormData(e.target);
          let rating = formData.get("rate");
          if (rating == null)
              rating = 0.5;
          rateMovie(this.id, rating, getCurrentSessionId() /*TODO*/)
      },
      getNumberOfStarsFromRating(num) {
        return Math.round(num / 2);
      }
    }
  };
  </script>
  
  <style lang="css" scoped>
.rate {
          float: left;
          height: 46px;
          padding: 0 10px;
      }
      .rate:not(:checked) > input {
          position:absolute;
          top:-9999px;
      }
      .rate:not(:checked) > label {
          float:right;
          width:1em;
          overflow:hidden;
          white-space:nowrap;
          cursor:pointer;
          font-size:30px;
          color:#ccc;
      }
      .rate:not(:checked) > label:before {
          content: '★ ';
      }
      .rate > input:checked ~ label {
          color: #ffc700;    
      }
      .rate:not(:checked) > label:hover,
      .rate:not(:checked) > label:hover ~ label {
          color: #deb217;  
      }
      .rate > input:checked + label:hover,
      .rate > input:checked + label:hover ~ label,
      .rate > input:checked ~ label:hover,
      .rate > input:checked ~ label:hover ~ label,
      .rate > label:hover ~ input:checked ~ label {
          color: #c59b08;
      }

      .average-rating-star {
          display: inline;
      }
      .static-rate {
        display: inline; 
        font-size:30px;
      }

      .empty-star {
        color:#ccc;
      }
      
      .full-star {
        color:#ffc700;
      }

</style>