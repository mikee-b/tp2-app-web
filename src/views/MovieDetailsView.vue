<template>
    <h2>{{ movie.title }}</h2>
    <div class="img-main-info">
        <img
        :src="baseUrlImg + movie.backdrop_path" width="600" />
        <div class="main-info">
            <p class="overview">{{ movie.overview }}</p>
            <p>Durée: {{ movie.runtime }} min</p>
            <p>Année de parution: {{ getYearFromDate(movie.release_date) }}</p>
            <p>Site: <a :href="movie.homepage" target="_blank">{{ movie.homepage }}</a></p>
        </div>
    </div>
    <div class="average-rating">
        <div class="average-rating-star" v-for="index in 5" :key="index">
            <p v-if="getNumberOfStarsFromRating(movie.vote_average) >= (index)" class="static-rate full-star ">★</p>
            <p v-if="getNumberOfStarsFromRating(movie.vote_average) <= (index - 1)" class="static-rate empty-star">★</p>
        </div>
    </div>
    <!--si administrateur-->
    <div>
        <h3>Rating</h3>
        <form class="rating-form">
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
            <div>
                <label for="text">Message : </label>
                <textarea type="text" placeholder="Commentaire ici..." maxlength="255"></textarea>
            </div>
            <!--si aucun commentaire-->
            <button id="add-rating" type="submit">Ajouter</button>
            <!--si commentaire éxiste déjà-->
            <button id="update-rating" type="submit">Modifier</button>
        </form>
    </div>
     <!--si administrateur ou user-->
    <div>
        <div class="card_commentary">

        </div>
    </div>
    <div>
        <button id="myBtn" @click=openSucessPopUp()>Click me</button>
        <!-- The Modal -->
        <div id="myModal" class="modal">

        <!-- Modal content -->
            <div class="modal-content">
            <span id="close"  @click=closeSucessPopUp()>&times;</span>
            <p>Hello! I am a popup.</p>
            </div>
        </div>
    </div>
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
          rateMovie(this.id, rating, getCurrentSessionId())
      },
      getNumberOfStarsFromRating(num) {
        return Math.round(num / 2);
      },
      openSucessPopUp(){
        document.getElementById("myModal").style.display = "block";
      },
      closeSucessPopUp(){
        document.getElementById("myModal").style.display = "none";
      }
    }
  };
  </script>
  
  <style lang="css" scoped>
.card_commentary{
    width: 30%;
    aspect-ratio: 3/2;
    border-radius: 5px;
    border: 4px solid var(--second-text-color);
}
#myBtn {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 20px;
  cursor: pointer;
}
/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}




h3{
    margin-top: 1.5rem;
    color: var(--main-text-color);
    text-align: center;
}
.rating-form{
    display: block;
    margin: 1rem auto 5rem auto;
    width:50%;
    padding: 1rem;
    border: 3px solid var(--second-text-color);
    border-radius: 10px;
}

.rating-form label{
    color: var(--main-text-color);
    font-size: 1.4rem;
}

.rating-form textarea{
    width:100%;
    height: 5.2rem;
    resize: none;
    font-size: 1rem;
    border: 3px solid var(--second-text-color);
    border-radius: 10px;
}

.rating-form > div {
    margin: 0.4rem;
}

.rating-form button {
    margin: 0.4rem;
    margin-top: 2rem;
}

p{
    color: var(--second-text-color);
}
h2{
    color: var(--main-text-color);
    margin: 1rem 0;
}
.overview{
    color: var(--main-text-color);
    font-size: 1.5rem;   
    margin-bottom: 1rem;
}

/* CSS */
.main-info{
    margin: 0 1rem;
}
img{
    background-image: url(../../img/img_cannot_load_movie.png);
    width: 30vw;
    height: 15vw;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 15vw;
 }
.img-main-info{
    display: flex;
}
/*css étoiles*/
.rate {
    display: block;
    margin: 0 auto;
    height: 46px;
    padding: 0;
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