<template>
    <div>
        <h2 v-if="isUserLoggedIn()">Modifier information</h2>
        <h2 v-else>Créer un compte</h2>
         <form class="form" action="" method="post" @submit.prevent="onSubmit">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 1l-4.5 16.5-6.097-5.43 5.852-6.175-7.844 5.421-5.411-1.316 18-9zm-11 12.501v5.499l2.193-3.323-2.193-2.176zm-13 8.63c1.013-1.574 1.955-2.256 2.938-2.55l.234 1.448c-.663.256-1.215.806-1.965 1.971l-1.207-.869zm11-4.729c-.928 1.473-1.748 2.104-2.566 2.322l.254 1.436c.746-.176 1.521-.583 2.312-1.391v-2.367zm-3.855 2.385c-.883-.103-1.92-.365-2.938-.376l.236 1.462c.873.068 1.931.345 2.963.395l-.261-1.481z"/></svg>
            <div>
                <label for="email">Email : </label>
                <input id="email" type="email" minlength="1" maxlength="50" required>
            </div>
            <div v-if="!isUserLoggedIn()">
                <div>
                    <label for="password">Mot de passe : </label>
                    <input id="password" type="password" minlength="6" maxlength="50" required>
                </div>
                <div>
                    <label for="confirmationPassword">Confirmation du mot de passe : </label>
                    <input id="confirmationPassword" type="password" minlength="6" maxlength="50" required>
                </div>
            </div>
            <div>
                <label for="firstname">Prenom : </label>
                <input id="firstname" type="text" minlength="1" maxlength="50" required>
            </div>
            <div>
                <label for="lastname">Nom : </label>
                <input id="lastname" type="text" minlength="1" maxlength="50" required>
            </div>
            <button v-if="isUserLoggedIn()" type="submit">Modifier</button>
            <button v-else type="submit">S'inscrire</button>
        </form>
        <div v-if="isUserLoggedIn()">
            <h2>Modifier mot de passe</h2>
            <form class="form" action="" method="post" @submit.prevent="onSubmitPasswordChange">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 1l-4.5 16.5-6.097-5.43 5.852-6.175-7.844 5.421-5.411-1.316 18-9zm-11 12.501v5.499l2.193-3.323-2.193-2.176zm-13 8.63c1.013-1.574 1.955-2.256 2.938-2.55l.234 1.448c-.663.256-1.215.806-1.965 1.971l-1.207-.869zm11-4.729c-.928 1.473-1.748 2.104-2.566 2.322l.254 1.436c.746-.176 1.521-.583 2.312-1.391v-2.367zm-3.855 2.385c-.883-.103-1.92-.365-2.938-.376l.236 1.462c.873.068 1.931.345 2.963.395l-.261-1.481z"/></svg>
                <div>
                    <label for="oldPaddword">Ancien Mot de Passe : </label>
                    <input id="oldPaddword" type="text" minlength="6" maxlength="50" required>
                </div>
                <div>
                    <label for="newPassword">Nouveau Mot de passe : </label>
                    <input id="newPassword" type="password" minlength="6" maxlength="50" required>
                </div>
                <div>
                    <label for="confirmationNewPassword">Confirmation du nouveau mot de passe : </label>
                    <input id="confirmationNewPassword" type="password" minlength="6" maxlength="50" required>
                </div>
                <button type="submit">Modifier</button>
            </form>
        </div>
        <div class="popup">
            <!-- The Modal -->
            <div id="myModal" class="modal">

                <!-- Modal content -->
                <div class="modal-content">
                <svg id="close" @click=closeSucessPopUp() stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21 3.998c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-8.991 6.932 2.717-2.718c.146-.146.338-.219.53-.219.405 0 .751.325.751.75 0 .193-.073.384-.219.531l-2.718 2.717 2.728 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.531-.219l-2.728-2.728-2.728 2.728c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .384.073.53.219z" fill-rule="nonzero"/></svg>
                <p id="messages" v-for="pop in popupMessage"> {{ pop }} </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { createUser, modifyUser } from '@/services/MovieService.js';
import { useTokensStore } from '@/stores/TokensStore.js';

const tokensStore = useTokensStore();
const MESSAGE_CONFORMATION = "Merci pour la création de votre compte!😊";

export default {
    data() {
      return {
        popupMessage: [MESSAGE_CONFORMATION],
        //Veillez vérifier vos champs😔
        maxlength: 50,
        minlength: 1,
        minlengthPassword: 6,
      };
    },
    methods: {
      closeSucessPopUp(){
        document.getElementById("myModal").style.display = "none";
      },
      isUserLoggedIn(){
        return tokensStore.isLoggedIn();
      },
      async onSubmit(event)
      {
        let form = event.target;
        let firstname = form.querySelector("#firstname").value
        let lastname = form.querySelector("#lastname").value
        let email = form.querySelector("#email").value
        this.popupMessage = []

        if(firstname.length >= this.maxlength && firstname.length > this.minlength){
            this.popupMessage.push("- Le prenom doit avoir 50 charactères ou moins et ne doit pas être vide.")
        }
        if(lastname.length >= this.maxlength && lastname.length > this.minlength){
            this.popupMessage.push("- Le nom doit avoir 50 charactères ou moins et ne doit pas être vide.")
        }
        if(email.length >= this.maxlength && email.length > this.minlength){
            this.popupMessage.push("- Le mail doit avoir 50 charactères ou moins et ne doit pas être vide.")
        } 
        
        if (this.isUserLoggedIn())
        {
            if(this.popupMessage.length == 0){
                let modifyMap = await modifyUser(firstname, lastname, email, tokensStore.latestToken);
                this.popupMessage.push(MESSAGE_CONFORMATION)
                console.log(this.popupMessage)
            }
        }
        else
        {
            let password = form.querySelector("#password").value
            let confirmationPassword = form.querySelector("#confirmationPassword").value

            if(password.length >= this.maxlength && password.length > this.minlengthPassword){
                this.popupMessage.push("- Le mot de passe doit avoir entre 6 et 50 charactères.")
            }
            if(password != confirmationPassword){
                this.popupMessage.push("- Le mot de passe doit avoir entre 6 et 50 charactères.")
            }

            document.getElementById("myModal").style.display = "block";
            if(this.popupMessage.length == 0){
                this.popupMessage.push(MESSAGE_CONFORMATION)
                await createUser(email, password, firstname, lastname);
                //document.getElementById("messages").style.color = "green"
            } 
        }        
    },
    async onSubmitPasswordChange(event)
    {
        let form = event.target;
        let oldPassword = form.querySelector("#oldPassword").value
        let newPassword = form.querySelector("#newPassword").value
        let confirmationNewPassword = form.querySelector("#confirmationNewPassword").value
        this.popupMessage = []

        if(oldPassword.length >= this.maxlength && oldPassword.length > this.minlengthPassword){
            this.popupMessage.push("- Le l'ancien mot de passe doit avoir entre 6 et 50 charactères.")
        }
        if(newPassword.length >= this.maxlength && newPassword.length > this.minlengthPassword){
            this.popupMessage.push("- Le nouveau mot de passe doit avoir entre 6 et 50 charactères.")
        }
        if(confirmationNewPassword.length >= this.maxlength && confirmationNewPassword.length > this.minlengthPassword){
            this.popupMessage.push("- La confirmation du nouveau mot de passe doit avoir entre 6 et 50 charactères.")
        } 

        document.getElementById("myModal").style.display = "block";
        if(this.popupMessage.length == 0){
            this.popupMessage.push(MESSAGE_CONFORMATION)
            await modifyPassword(oldPassword, newPassword, confirmationNewPassword, tokensStore.latestToken);
            //document.getElementById("messages").style.color = "green"
        } 
    },
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