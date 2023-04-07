<template>
  <div>
    <h2 class="title">{{ title }}</h2>
    <div class="page-nav">
      <button @click="prevPage" :disabled="pageNumber === 1">
        &lt; Previous
      </button>
      Page {{ currentPage() }}
      <button @click="nextPage" :disabled="pageNumber >= pageCount">
        Next &gt;
      </button>
      <p>({{ getTotalResults() }} résultats)</p>
    </div>
    <ul class="movies">
      <li
        v-for="movie in getMovies()"
        
        @click="onSelect(movie)" 
      >
        <img class="movie-img" :src="baseUrlImg + movie.backdrop_path" alt="movie picture">
        <span class="movie-title">{{ movie.title }}</span>
        <span class="movie-release">{{ movie.release_date }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { getCurrentInstance} from "vue";

export default {
  props: {
    movies: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      title: "Search your favorite movie!",
      selectedMovie: null,
      baseUrlImg: "https://image.tmdb.org/t/p/w500",
      key: null
    };
  },
  created() {
      this.key = getCurrentInstance().vnode.key;
    },
  methods: {
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
        return this.key.total_results;
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
  .movies{
    display: flex;
    justify-content: space-around;
    flex-flow: row wrap;
    margin: 0;
    list-style-type: none;
    padding: 0;
    margin-bottom: 4rem;
  }
  button {
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .page-nav{
    display: flex;
    margin: 3rem;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 1.2rem;
  }
  .title{
    text-align: center;
    text-decoration: underline;
    font-size: 2rem;
    color: var(--main-text-color);
    margin: 2rem 0;
  }
  .movies .movie-img{
    width: 25vw;
  }
  .movies .movie-title{
    font-size: 1.2rem;
    color: var(--main-text-color);
    width:fit-content;
    margin: 0.5rem 0;
    cursor: pointer;
    padding: 0 0.5rem;

    background:
      linear-gradient(to right, var(--second-text-color) 2px, transparent 4px) 0 0,
      linear-gradient(to left, var(--second-text-color) 2px, transparent 4px) 100% 100%,
      linear-gradient(to bottom, var(--second-text-color) 2px, transparent 4px) 0 0,
      linear-gradient(to top, var(--second-text-color) 2px, transparent 4px) 100% 100%;

    background-repeat: no-repeat;
    background-size: 20px 20px;
  }
  .movies .movie-title:hover{
    background:
      linear-gradient(to right, var(--second-text-color) 2px, transparent 4px) 100% 100%,
      linear-gradient(to left, var(--second-text-color) 2px, transparent 4px) 100% 100%,
      linear-gradient(to bottom, var(--second-text-color) 2px, transparent 4px) 100% 100%,
      linear-gradient(to top, var(--second-text-color) 2px, transparent 4px) 100% 100%;
  }
  .movies .movie-release{
    font-size: 1rem;
    color: var(--main-text-color);
  }
  .movies li {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }
  .movies .break:nth-child(3n){
    display: block;
    width: 100%;
    height: 0;
  }
</style>