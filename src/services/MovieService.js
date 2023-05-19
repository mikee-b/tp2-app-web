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

//marche pas
export async function createMovie(token, title, year, description, length, actors, rating, image)
{

    let newHeaders = addTokenToHeaders(headers, token)
    let options = {
        method: 'POST',
        headers: newHeaders,
        body: JSON.stringify({
            "title": title,
            "release_year": year,
            "description": description,
            "rating": rating,
            "length": length,
            "actors": actors,
            "image": image,
            "language_id": 1
        })
    };

    const response = await fetch(baseURL + 'films', options);
    let returnValue = new Map();
    returnValue['statusCode'] = response.status;
    if (response.status == 201)
        returnValue['message'] = "Création du film a bel et bien fonctionné!";
    else
        returnValue['error'] = "La création du film a échouée, veillez réessayer plus tard."
    return returnValue;
}

export async function deleteMovie(token, movieId)
{
    let newHeaders = addTokenToHeaders(headers, token)
    let options = {
        method: 'DELETE',
        headers: newHeaders
    };

    const response = await fetch(baseURL + 'films/' + movieId, options);
    let returnValue = new Map();
    returnValue['statusCode'] = response.status;
    if (response.status == 201)
        returnValue['message'] = "succès";
    else
        returnValue['error'] = "erreur"
    return returnValue;
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
    const msg = await fetch(baseURL + 'login', options);
    let returnValue = new Map();
    returnValue['statusCode'] = msg.status;
    if (msg.status == 201)
    {
        let json = await msg.json();
        returnValue['token'] = json.token;
    }
    else
        returnValue['error'] = msg.text();
    return returnValue;
}

export async function getUser(token)
{
    let newHeaders = addTokenToHeaders(headers, token);
    let options = {
        method: 'GET',
        headers: newHeaders
    };
    let response = await fetch(baseURL + 'user', options);
    let msg = await response.json();
    let returnValue = new Map();
    returnValue['statusCode'] = response.status;
    if (response.status == 200)
    {
        returnValue['email'] = msg.email;
        returnValue['firstName'] = msg.first_name;
        returnValue['lastName'] = msg.last_name;
        returnValue['role'] = msg.role_id;
        returnValue['id'] = msg.id;
    }
    else
        returnValue['error'] = msg.message;
    return returnValue;
}

export async function getUsername(token)
{
    let response = await getUser(token);
    let msg = await response.json();
    let returnValue = new Map();
    returnValue['statusCode'] = response.status;
    if (response.status == 200)
        returnValue['email'] = msg.email;
    else
        returnValue['error'] = msg.message;
    return returnValue;
}

export async function getUserId(token)
{
    let response = await getUser(token);
    let msg = await response.json();
    let returnValue = new Map();
    returnValue['statusCode'] = response.status;
    if (response.status == 200)
        returnValue['id'] = msg.id;
    else
        returnValue['error'] = msg.message;
    return returnValue;
}

export async function getPreviousComment(userId, movieId)
{
    let options = {
        method: 'GET',
        headers: headers,
    };

    const response = await fetch(baseURL + 'films/' + movieId, options);
    let returnValue = new Map();
    returnValue['statusCode'] = response.status;
    if (response.status == 200)
    {
        let json = await response.json();
        for (let i = 0; i < json.data.critiques.length; i++)
        {
            if (json.data.critiques[i].user_id == userId)
                returnValue['comment'] = json.data.critiques[i]
        }
    }
    else
    {
        returnValue['error'] = "erreur";
    }
    return returnValue;
        // returnValue[''] = "!"
    // else
        // returnValue['message'] = "erreur"
    // return returnValue;
}

export async function addCritic(token, movieId, comment, score)
{
    let newHeaders = addTokenToHeaders(headers, token)
    let options = {
        method: 'POST',
        headers: newHeaders,
        body: JSON.stringify({
            "comment": comment,
            "score": score,
        })
    };

    const response = await fetch(baseURL + 'films/' + movieId + "/critics", options);
    let returnValue = new Map();
    returnValue['statusCode'] = response.status;
    if (response.status == 200)
        returnValue['message'] = "succès!"
    else
        returnValue['message'] = "erreur"
    return returnValue;
}

export async function modifyCritic(token, movieId, criticId, comment, score)
{
    let newHeaders = addTokenToHeaders(headers, token)
    let options = {
        method: 'PUT',
        headers: newHeaders,
        body: JSON.stringify({
            "comment": comment,
            "score": score,
        })
    };

    const response = await fetch(baseURL + 'films/' + movieId + "/critics/" + criticId, options);
    let returnValue = new Map();
    returnValue['statusCode'] = response.status;
    if (response.status == 200)
        returnValue['message'] = "succès!"
    else
        returnValue['message'] = "erreur"
    return returnValue;
}

export async function logout(token)
{
    let newHeaders = addTokenToHeaders(headers, token);
    let options = {
        method: 'GET',
        headers: newHeaders
    };
    const response = await fetch(baseURL + 'logout', options);
    let returnValue = new Map();
    returnValue['statusCode'] = response.status;
    if (response.status != 204)
        returnValue['error'] = "Impossible de se déconnecter.";
    return returnValue;
}

//old
export async function getGenres() {
    // const response = await fetch(baseURL + 'genre/movie/list' + '?' + apiKeyParam + apiKey, headers);
    // let json = await response.json();
    // return json.genres;
    return null;
}

//old
export async function getMovie(id) {
    const response = await fetch(baseURL + 'films/' + id, headers);
    let movie = await response.json();
    return movie.data;
}

//old
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

//old
export async function getKeywordsIds(keywords) {
    // let keywordIds = '';
    // let keywordsArray = keywords.split(",");
    // for (let i = 0; i < keywordsArray.length; i++)
    // {
    //     let query = baseURL + 'search/keyword?' + apiKeyParam + apiKey + '&query=' + keywordsArray[i], headers;
    //     const response = await fetch(query, headers);
    //     const json = await response.json();
        
    //     if (json.results.length > 0)
    //         keywordIds += json.results[0].id + ','
    // }
    // return keywordIds;
}


//old
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


//old
export async function getAllActors() {
    const response = await fetch(baseURL + 'actors', headers);
    let actors = await response.json();
    return actors;
}

export async function modifyUser(firstName, lastName, email, token) {
    let newHeaders = addTokenToHeaders(headers, token);
    let options = {
        method: 'PATCH',
        headers: newHeaders,
        body: JSON.stringify({
                "email": email,
                "first_name": firstName,
                "last_name": lastName
        })
    };
    const response = await fetch(baseURL + 'user', options);
    let returnValue = new Map();
    returnValue['statusCode'] = response.status;
    if (response.status == 200)
        returnValue['message'] = await response.text();
    else
    {
        let json = await response.json()
        returnValue['message'] = json.message;
    }
    return returnValue;
}

export async function modifyPassword(oldPassword, newPassword, newPasswordConfirm, token) {
    let newHeaders = addTokenToHeaders(headers, token);
    let options = {
        method: 'PATCH',
        headers: newHeaders,
        body: JSON.stringify({
            "old_password": oldPassword,
            "new_password": newPassword,
            "confirm_new_password": newPasswordConfirm
        })
    };

    
    const response = await fetch(baseURL + 'user/password', options);
    let returnValue = new Map();
    returnValue['statusCode'] = response.status;
    if (response.status == 200)
        returnValue['message'] = await response.text();
    else
    {
        returnValue['message'] = "Failed to change password";
    }
    return returnValue;
}

function addTokenToHeaders(headers, token)
{
    headers["Authorization"] = "Bearer " + token;
    return headers
}