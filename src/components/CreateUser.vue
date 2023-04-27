<template>
    <div>
        <h2>Créer un compte</h2>
        <form>
            <div>
                <label for="email">Email : </label>
                <input type="email">
            </div>
            <div>
                <label for="password">Mot de passe : </label>
                <input type="password">
            </div>
            <div>
                <label for="confirmationPassword">Confirmation du mot de passe : </label>
                <input type="password">
            </div>
            <div>
                <label for="firstname">Prenom : </label>
                <input type="text">
            </div>
            <div>
                <label for="lastname">Nom : </label>
                <input type="text">
            </div>
            <button type="submit">S'inscrire</button>
            <button type="submit">Modifié</button>
        </form>
    </div>
</template>

<script>

</script>

<style lang="css" scoped>
h2{
    margin-top: 1.5rem;
    color: var(--main-text-color);
    text-align: center;
}
form{
    display: block;
    margin: 1.5rem auto;
    width:fit-content;
    padding: 1rem;
    border: 3px solid var(--second-text-color);
    border-radius: 10px;
}

form label{
    color: var(--main-text-color);
    font-size: 1.4rem;
}

form input{
    height: 1.8rem;
    font-size: 1rem;
    border: 3px solid var(--second-text-color);
    border-radius: 10px;
}

form > div {
    margin: 0.4rem;
}

form button {
    margin: 0.4rem;
    margin-top: 2rem;
}
</style>