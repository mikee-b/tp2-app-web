<template>
    <div>
        <h1>Ajouter un bon film</h1>
        <form class="form">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 1l-4.5 16.5-6.097-5.43 5.852-6.175-7.844 5.421-5.411-1.316 18-9zm-11 12.501v5.499l2.193-3.323-2.193-2.176zm-13 8.63c1.013-1.574 1.955-2.256 2.938-2.55l.234 1.448c-.663.256-1.215.806-1.965 1.971l-1.207-.869zm11-4.729c-.928 1.473-1.748 2.104-2.566 2.322l.254 1.436c.746-.176 1.521-.583 2.312-1.391v-2.367zm-3.855 2.385c-.883-.103-1.92-.365-2.938-.376l.236 1.462c.873.068 1.931.345 2.963.395l-.261-1.481z"/></svg>
            <div>
                <label for="text">Titre du film : </label>
                <input type="text">
            </div>
            <div>
                <label for="text">Image : </label>
                <!--upload file, par POST-->
                <input type="file">
            </div>
            <div>
                <label for="text">Année de production : </label>
                <input type="text" maxlength="4" minlength="4" step="1">
            </div>
            <div>
                <label for="text">Durée en minutes : </label>
                <input type="number">
            </div>
            <div>
                <label for="text">Auditoire : </label>
                <!--boucle pour chaque auditoire de dispo dans l'api-->
                <select>
                    <option>PG</option>
                    <option>R</option>
                    <option>NC-17</option>
                </select>
            </div>
            <div class="actors">
                <label for="text">Acteurs : </label>
                <!--boucle pour chaque acteurs de la bd, mettre son nom à cocher-->
                <div>
                    <input type="checkbox">
                    <p>acteur1</p>
                </div>
                <!--exemples-->
                <div>
                    <input type="checkbox">
                    <p>acteur2</p>
                </div>
                <div>
                    <input type="checkbox">
                    <p>acteur3</p>
                </div>
                <div>
                    <input type="checkbox">
                    <p>acteur4</p>
                </div>
                <div>
                    <input type="checkbox">
                    <p>acteur4</p>
                </div>
                <div>
                    <input type="checkbox">
                    <p>acteur4</p>
                </div>
                <div>
                    <input type="checkbox">
                    <p>acteur4</p>
                </div>
                <div>
                    <input type="checkbox">
                    <p>acteur4</p>
                </div>
            </div>
            <div>
                <label for="text">Description du film : </label>
                <textarea type="text" placeholder="Il était une fois..."></textarea>
            </div>
            <button type="submit" @click=openSucessPopUp($event)>Ajouter</button>
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
export default {
    data() {
      return {
        popupMessage: "Merci pour votre envoie!😊",
        //Veillez vérifier vos champs😔
      };
    },
    methods: {
      openSucessPopUp(event){
        //empêcher l'envoie pour voir le pop-up et ne pas reloader la page
        event.preventDefault()
        document.getElementById("myModal").style.display = "block";
      },
      closeSucessPopUp(){
        document.getElementById("myModal").style.display = "none";
      }
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
    display: flex;
    flex-wrap: wrap;
}
</style>