<template>
    <div>
        <h2>Connexion</h2>
        <form class="form" @submit.prevent="openPopUp">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 1l-4.5 16.5-6.097-5.43 5.852-6.175-7.844 5.421-5.411-1.316 18-9zm-11 12.501v5.499l2.193-3.323-2.193-2.176zm-13 8.63c1.013-1.574 1.955-2.256 2.938-2.55l.234 1.448c-.663.256-1.215.806-1.965 1.971l-1.207-.869zm11-4.729c-.928 1.473-1.748 2.104-2.566 2.322l.254 1.436c.746-.176 1.521-.583 2.312-1.391v-2.367zm-3.855 2.385c-.883-.103-1.92-.365-2.938-.376l.236 1.462c.873.068 1.931.345 2.963.395l-.261-1.481z"/></svg>
            <div>
                <label for="email">Email : </label>
                <input id="email" type="email" minlength="1" maxlength="50" required>
            </div>
            <div>
                <label for="password">Mot de passe : </label>
                <input id="password" type="password" minlength="1" maxlength="50" required>
            </div>
            <button type="submit">Se connecter</button>
        </form>
        <div class="popup">
            <!-- The Modal -->
            <div id="myModal" class="modal">

                <!-- Modal content -->
                <div class="modal-content">
                <svg id="close" @click=closePopUp() stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21 3.998c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-8.991 6.932 2.717-2.718c.146-.146.338-.219.53-.219.405 0 .751.325.751.75 0 .193-.073.384-.219.531l-2.718 2.717 2.728 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.531-.219l-2.728-2.728-2.728 2.728c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .384.073.53.219z" fill-rule="nonzero"/></svg>
                <p id="messages" v-for="pop in popupMessage"> {{ pop }} </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { login, getRole } from '@/services/MovieService.js'
import { useTokensStore } from '@/stores/TokensStore.js';

export default {
    data() {
      return {
        popupMessage: ["Merci pour votre envoie!😊"],
        maxlength: 50,
        minlength: 1,
        tokensStore: useTokensStore()
        //Veillez vérifier vos champs...😔
      };
    },
    methods: {
      async openPopUp(event){
        //empêcher l'envoie pour voir le pop-up et ne pas reloader la page
        event.preventDefault()
        let form = event.target
        this.popupMessage = []

        let email = form.querySelector("#email").value
        let password = form.querySelector("#password").value
        if(email.length >= this.maxlength || email.length < this.minlength ){
            this.popupMessage.push("- Email doit avoir 50 charactères ou moins.")
        } 
        if(password.length >= this.maxlength || password.length < this.minlength){
            this.popupMessage.push("- Password doit avoir 50 charactères ou moins.")
        }
        if(this.popupMessage.length == 0){
            let error = await this.logUser(email, password)
            if (error != null)
                this.popupMessage.push(error);
            if(this.popupMessage.length == 0)
                this.popupMessage.push("Merci pour votre envoie!😊")
            //document.getElementById("messages").style.color = "green"
        } 
        document.getElementById("myModal").style.display = "block";
      },
      async logUser(email, password){
        let map = await login(email, password)
        console.log(map)
        if (map['statusCode'] == 201)
        {
            let roleMap = await getRole(map['token'])
            if (roleMap.statusCode == 200)
            {
                const roleId = roleMap['roleId']
                this.tokensStore.addToken(map['token'], roleId)
            }
            else
            {
                return roleMap['message']
            }
        }
        else
        {
            return map['error']
        }
      },
      closePopUp(){
        document.getElementById("myModal").style.display = "none";
      }
    }
}
</script>

<style lang="css" scoped>
h2{
    margin-top: 1.5rem;
    color: var(--main-text-color);
    text-align: center;
}
</style>