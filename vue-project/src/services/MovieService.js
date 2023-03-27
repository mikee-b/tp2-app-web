const apiKey = '7a43453c090876ec404f9d3117402b26';
const apiKeyParam = 'api_key='
const baseURL = 'https://api.themoviedb.org/3/';
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};


export async function getRecentMovies() {
  const response = await fetch(baseURL + '/trending/movie/day' + '?' + apiKeyParam + apiKey, headers);
  return await Object.keys(response.json().results).slice(0, 3);
}

export async function getMovie(id) {
    const response = await fetch(baseURL + 'movie/' + id + '?' + apiKeyParam + apiKey, headers);
    let movie = await response.json();
    return movie;
}

export async function searchMoviesByKeyWords(keywords) {
    // keywords format should be : "keyword1,keyword2,keyword3"
    const response = await fetch(baseURL + 'search/movie' + '?' + apiKeyParam + apiKey + '&query=' + keywords, headers);
    let movies = await response.json();
    return movies;
}