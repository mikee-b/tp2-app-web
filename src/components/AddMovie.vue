<template>
    <div>
        <h1>Ajouter un bon film</h1>
        <form class="form" @submit.prevent="onSubmit">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 1l-4.5 16.5-6.097-5.43 5.852-6.175-7.844 5.421-5.411-1.316 18-9zm-11 12.501v5.499l2.193-3.323-2.193-2.176zm-13 8.63c1.013-1.574 1.955-2.256 2.938-2.55l.234 1.448c-.663.256-1.215.806-1.965 1.971l-1.207-.869zm11-4.729c-.928 1.473-1.748 2.104-2.566 2.322l.254 1.436c.746-.176 1.521-.583 2.312-1.391v-2.367zm-3.855 2.385c-.883-.103-1.92-.365-2.938-.376l.236 1.462c.873.068 1.931.345 2.963.395l-.261-1.481z"/></svg>
            <div>
                <label for="title">Titre du film : </label>
                <input id="title" name="title" type="text" required>
            </div>
            <div>
                <label for="image">Image : </label>
                <!--upload file, par POST-->
                <input id="image" name="image" type="text" placeholder="Image URL" required>
            </div>
            <div>
                <label for="prodYear">Année de production : </label>
                <input id="prodYear" name="prodYear" type="text" required>
            </div>
            <div>
                <label for="duration">Durée en minutes : </label>
                <input id="duration" name="duration" type="number" required>
            </div>
            <div>
                <label>Auditoire : </label>
                <!--boucle pour chaque auditoire de dispo dans l'api-->
                <select id="audience">
                    <option>PG-13</option>
                    <option>R</option>
                    <option>NC-17</option>
                    <option>G</option>
                    <option>PG</option>
                </select>
            </div>
            <label>Acteurs : </label>
            <div class="actors">
                <!--boucle pour chaque acteurs de la bd, mettre son nom à cocher-->
                <div v-for="actor in allActors">
                    <input class="actor_checkbox" :value="actor.first_name + ' ' + actor.last_name" type="checkbox">
                    <p>{{ actor.last_name }}</p>
                </div>
            </div>
            <div>
                <label for="desc">Description du film : </label>
                <textarea id="desc" name="desc" type="text" placeholder="Il était une fois..."></textarea>
            </div>
            <button type="submit">Ajouter</button>
        </form>
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
    </div>
</template>

<script>
import { createMovie } from '@/services/MovieService.js';
import { useTokensStore } from '@/stores/TokensStore.js';
export default {
    props: {
      actors: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        popupMessage: ["Merci pour votre envoie!😊"],
        //Veillez vérifier vos champs😔
        maxlength: 50,
        minlength: 1,
        tokensStore: useTokensStore()
      };
    },
    computed: {
      allActors() {
        return this.actors;
      },
    },
    methods: {
      closeSucessPopUp(){
        document.getElementById("myModal").style.display = "none";
      },
      async onSubmit(event)
      {
        let form = event.target;
        
        let title = form.querySelector("#title").value
        let image = form.querySelector("#image").value
        let prodYear = form.querySelector("#prodYear").value
        let duration = form.querySelector("#duration").value
        let audience = form.querySelector("#audience").value
        let desc = form.querySelector("#desc").value
        let actors = form.querySelectorAll(".actor_checkbox")
        let checkedActors = []
        for(let i = 0; i < actors.length; i++){
            if(actors[i].checked){
                checkedActors.push(actors[i].value)
            }
        }
        this.popupMessage = []
        if(title.length >= this.maxlength || title.length < this.minlength){
            this.popupMessage.push("- Le titre doit avoir 50 charactères ou moins et ne doit pas être vide.")
        } 
        if(image.length >= this.maxlength || image.length < this.minlength){
            this.popupMessage.push("- L'URL de l'image doit avoir 50 charactères ou moins et ne doit pas être vide.")
        }
        if(prodYear.length != 4 || prodYear > new Date().getFullYear()){
            this.popupMessage.push("L'année doit être dans le passé.")
        }
        if(duration.length <= 0){
            this.popupMessage.push("La durée ne doit pas être vide.")
        }
        if(desc.length >= this.maxlength || desc.length < this.minlength){
            this.popupMessage.push("La description doit avoir 50 charactères ou moins et ne doit pas être vide.")
        }

        if(this.popupMessage.length == 0){
            let response = await createMovie(this.tokensStore.latestToken, title, prodYear, desc, duration, checkedActors, audience, image);
            if (response['statusCode'] != 200)
                this.popupMessage.push(response['error']);
            if(this.popupMessage.length == 0)
            {
                this.popupMessage.push(response['message'])
            }
        }
        document.getElementById("myModal").style.display = "block";
      },
    }
}
</script>

<style lang="css" scoped>
h1{
    color: var(--main-text-color);
    text-align: center;
    margin: 2rem 0 3rem 0;
}
p{
    color: var(--main-text-color);
}
select{
  background-color: var(--main-text-color);
  height: 1.5rem;
  color: #fff;
  border: 3px solid var(--second-text-color);
}
form textarea{
    width:100%;
    height: 5.2rem;
    resize: none;
    font-size: 1rem;
    border: 3px solid var(--second-text-color);
    border-radius: 10px;
}
form{
    width: 35%;
    margin-bottom: 4rem;
}
.actors input{
    margin-right: 5px;
}
.actors > div{
    display: flex;
    margin: 0 10px;
}
.actors{
    border: 2px solid var(--second-text-color);
    display: flex;
    flex-wrap: wrap;
    height: 10rem;
    overflow-y:scroll;
}
</style>