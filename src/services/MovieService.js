const baseURL = 'http://laravel-e23.herokuapp.com/api/'
const headers = {
    "Accept": "application/json;charset=utf-8",
    "Content-Type": "application/json;charset=utf-8"
};


export async function getRecentMovies() {
  const response = await fetch(baseURL + 'films', headers);
  let json = await response.json();
  return await json.data.slice(0, 3);
}

export async function createUser(email, password, firstName, lastName)
{
    let options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
                "email": email,
                "password": password,
                "first_name": firstName,
                "last_name": lastName
        })
    };
    const response = await fetch(baseURL + 'users', options);
    let msg = await response.json();
    return msg;
}

export async function login(email, password)
{
    let options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
                "email": email,
                "password": password,
        })
    };
    const response = await fetch(baseURL + 'login', options);
    let msg = await response.json();
    return msg;
}

export async function getGenres() {
    // const response = await fetch(baseURL + 'genre/movie/list' + '?' + apiKeyParam + apiKey, headers);
    // let json = await response.json();
    // return json.genres;
    return null;
}

export async function getMovie(id) {
    const response = await fetch(baseURL + 'films/' + id, headers);
    let movie = await response.json();
    return movie.data;
}

export async function searchMoviesByKeyWordsGenreAndYear(keywords, genre, year, page, sortMethod /* either  'date' or 'rating', default is rating*/) {

    let sortBy = 'vote_average.desc';
    if (sortMethod == 'date')
        sortBy = 'release_date.desc'
    let keywordsIds = await getKeywordsIds(keywords);
    let query = baseURL + 'discover/movie?' + apiKeyParam + apiKey + '&year=' + year + '&with_keywords=' + keywordsIds + '&with_genres=' + genre + '&page=' + page + '&sort_by=' + sortBy + '&include_adult=false', headers;
    const response = await fetch(query, headers);
    let movies = await response.json();
    return movies;
}

export async function getKeywordsIds(keywords) {
    let keywordIds = '';
    let keywordsArray = keywords.split(",");
    for (let i = 0; i < keywordsArray.length; i++)
    {
        let query = baseURL + 'search/keyword?' + apiKeyParam + apiKey + '&query=' + keywordsArray[i], headers;
        const response = await fetch(query, headers);
        const json = await response.json();
        
        if (json.results.length > 0)
            keywordIds += json.results[0].id + ','
    }
    return keywordIds;
}

export async function rateMovie(movieId, rating, guestSessionId) {
    // rating between 0.5 and 10
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

export async function getAllActors() {
    const response = await fetch(baseURL + 'actors', headers);
    let actors = await response.json();
    return actors;
}