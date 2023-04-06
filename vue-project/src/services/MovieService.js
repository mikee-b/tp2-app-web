const apiKey = '7a43453c090876ec404f9d3117402b26';
const apiKeyParam = 'api_key='
const baseURL = 'https://api.themoviedb.org/3/';
const headers = {
    "Accept": "application/json;charset=utf-8",
    "Content-Type": "application/json;charset=utf-8"
};
const sessionId = await getNewGuestSessionId();


export async function getRecentMovies() {
  const response = await fetch(baseURL + '/trending/movie/day' + '?' + apiKeyParam + apiKey, headers);
  let json = await response.json()
  return await json.results.slice(0, 3);
}

export async function getGenres() {
    const response = await fetch(baseURL + 'genre/movie/list' + '?' + apiKeyParam + apiKey, headers);
    let json = await response.json();
    return json.genres;
}

export async function getMovie(id) {
    const response = await fetch(baseURL + 'movie/' + id + '?' + apiKeyParam + apiKey, headers);
    let movie = await response.json();
    return movie;
}

export async function searchMoviesByKeyWordsGenreAndYear(keywords, genre, year) {

    let keywordsIds = getKeywordsIds(keywords);
    let query = baseURL + 'discover/movie?' + apiKeyParam + apiKey + '&year=' + year + '&with_keywords=' + keywordsIds + '&with_genres=' + genre + '&include_adult=false', headers;
    const response = await fetch(query, headers);
    let movies = await response.json();
    return movies;
}

export async function getKeywordsIds(keywords) {
    
    return ''
}

export async function rateMovie(movieId, rating, guestSessionId) {
    // rating between 0.5 and 10
    // TODO : guest_session_id
    let options = {
        method: 'POST',
        headers: headers,
        body: {
            "value": rating
        },
    };
    const response = await fetch(baseURL + 'movie/' + movieId + '/rating?' + apiKeyParam + apiKey + '&guest_session_id=' + guestSessionId, options);
    let msg = await response.json();
    return msg;
}

export async function getNewGuestSessionId() {
    const response = await fetch(baseURL + 'authentication/guest_session/new' + '?' + apiKeyParam + apiKey, headers);
    let msg = await response.json();
    return msg.guest_session_id;
}

export function getCurrentSessionId() {
    return sessionId;
}