const apiKey = '7a43453c090876ec404f9d3117402b26';
const baseURL = 'https://api.themoviedb.org/3/';
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};


export async function getRecentMovies() {
  const response = await fetch(baseURL + '/trending/movie/day' + '?' + apiKey, headers);
  return await Object.keys(response.json().results).slice(0, 3);
}

export async function getMovie(id) {
    const response = await fetch(baseURL + 'movie/' + id + '?' + apiKey, headers);
    let product = await response.json();
    return product;
}

export async function getKeyWordIds(keyword) {
    const response = await fetch(baseURL + 'search/keyword' + '?' + apiKey + '&query=' + keyword, headers);
    let product = await response.json();
    return product.results;
}