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
            <button id="add-rating" type="submit" @click=openSucessPopUp($event)>Ajouter</button>
            <!--si commentaire éxiste déjà-->
            <button id="update-rating" type="submit" @click=openSucessPopUp($event)>Modifier</button>
        </form>
    </div>
     <!--si administrateur ou user-->
     <h3>Commentaries</h3>
    <div class="card_container">
        <!--boucle for pour faire une carte pour chaque commentaire de l'api, sauf celui du membre-->
        <div class="card_commentary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.738 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 9.236 2.247 15.968-3.405 15.968-9.457 0-5.812-5.701-10.007-12-10.007zm0 14h-6v-1h6v1zm6-3h-12v-1h12v1zm0-3h-12v-1h12v1z"/></svg>
            <p class="name">Mikee Blanchet</p>
            <p>1 janvier 2020</p>
            <p class="commentary">wevhbiwfehbiwfehbiwfebiwefbhiwefhbi</p>
        </div>
        <!--exemples-->
        <div class="card_commentary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.738 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 9.236 2.247 15.968-3.405 15.968-9.457 0-5.812-5.701-10.007-12-10.007zm0 14h-6v-1h6v1zm6-3h-12v-1h12v1zm0-3h-12v-1h12v1z"/></svg>
            <p class="name">Mikee Blanchet</p>
            <p>1 janvier 2020</p>
            <p class="commentary">iwefbhiwefhbi</p>
        </div>
        <div class="card_commentary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.738 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 9.236 2.247 15.968-3.405 15.968-9.457 0-5.812-5.701-10.007-12-10.007zm0 14h-6v-1h6v1zm6-3h-12v-1h12v1zm0-3h-12v-1h12v1z"/></svg>
            <p class="name">Mikee Blanchet</p>
            <p>1 janvier 2020</p>
            <p class="commentary">wevhbiwfehbiwwfewfewfewfefehbiwfebiwefbhiwefhbi</p>
        </div>
        <div class="card_commentary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.738 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 9.236 2.247 15.968-3.405 15.968-9.457 0-5.812-5.701-10.007-12-10.007zm0 14h-6v-1h6v1zm6-3h-12v-1h12v1zm0-3h-12v-1h12v1z"/></svg>
            <p class="name">Mikee Blanchet</p>
            <p>1 janvier 2020</p>
            <p class="commentary">wevhbiwfehbiqweffffffffffeeeeeeeeeeeeeeeeeeeeeeeeeeeffffffffffffffwfehbiwfebiwefbhiwefhbi</p>
        </div>
    </div>
    <div class="popup">
        <!-- The Modal -->
        <div id="myModal" class="modal">

        <!-- Modal content -->
            <div class="modal-content">
            <svg id="close" @click=closeSucessPopUp() stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21 3.998c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-8.991 6.932 2.717-2.718c.146-.146.338-.219.53-.219.405 0 .751.325.751.75 0 .193-.073.384-.219.531l-2.718 2.717 2.728 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.531-.219l-2.728-2.728-2.728 2.728c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .384.073.53.219z" fill-rule="nonzero"/></svg>
            <p>{{ popupMessage }}</p>
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
        popupMessage: "Merci pour votre envoie!😊",
        //Veillez vérifier vos champs😔
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
      openSucessPopUp(event){
        //empêcher l'envoie pour voir le pop-up et ne pas reloader la page
        event.preventDefault()
        document.getElementById("myModal").style.display = "block";
      },
      closeSucessPopUp(){
        document.getElementById("myModal").style.display = "none";
      }
    }
  };
  </script>
  
  <style lang="css" scoped>
.card_container{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 2rem;
}
.card_container svg{
    fill: var(--third-text-color);
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
    top: -1.5rem;
    right: 0.5rem;
}
.card_container p{
    word-wrap: break-word
}
.card_container .name{
    color: var(--main-text-color);
    font-size: 1.5rem;
    font-weight: large;
}
.card_container .commentary{
    font-size: 1.2rem;
    color: var(--main-text-color);
}
.card_commentary{
    position: relative;
    padding: 0.8vw;
    width: 35%;
    margin-bottom: 3rem;
    height: fit-content;
    border-radius: 5px;
    background-color: rgb(255, 81, 110, 0.1);
    border: 2px solid var(--second-text-color);
}
h3{
    margin-top: 1.5rem;
    color: var(--main-text-color);
    text-align: center;
}
.rating-form{
    display: block;
    margin: 1rem auto 3rem auto;
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