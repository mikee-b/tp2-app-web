<template>
    <div>
        <h2>Créer un compte</h2>
        <form action="" method="post" @submit.prevent="onSubmit">
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
        </form>
    </div>
</template>

<script>
import { createUser } from '@/services/MovieService.js';
export default {
  methods: {
    async onSubmit()
    {
        console.log(await createUser("userTest@email.com", "password", "firstNameTest", "lastNameTest"));
        // need to add validation
        
    },
    updateSearchResults(page)
        {
            let searchQuery = this.$route.query.searchQuery;
            let year = this.$route.query.year;
            let genre = this.$route.query.genre;
            if (this.$route.query.searchQuery == undefined)
                searchQuery = ''
            if (this.$route.query.year == undefined)
                year = ''
            if (this.$route.query.genre == undefined)
                genre = ''
            if (page == undefined)
                page = 1
            this.$router.push(`/movies?searchQuery=` + searchQuery + `&genre=` + genre + `&year=` + year + `&page=` + page);
        },
    getTotalResults()
    {
        let totalResults = this.key.total_results;
        let div = document.getElementById("no-result");
        if(totalResults === 0){
          this.urlNoResultImg = "../../img/img_noresults_movies.png";
        } else{
          this.urlNoResultImg = "";
        }
        console.log(div)
        return totalResults;
    },
    getTotalPages()
    {
        return this.key.total_pages;
    },
    getMovies()
    {
        return this.key.results;
    },
    onSelect(movie) {
      this.$router.push({ name: "movie", params: { id: movie.id } });
    },
    nextPage() {
        let newPage = +this.$route.query.page + 1;
        if (newPage > this.getTotalPages())
            newPage = this.getTotalPages()
        this.updateSearchResults(newPage);
    },
    prevPage() {
        let newPage = +this.$route.query.page - 1;
        if (newPage < 1)
            newPage = 1
        this.updateSearchResults(newPage);
    },
    currentPage() {
        return +this.$route.query.page;
    },
  },
};
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