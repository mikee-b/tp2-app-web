//clé api : 7a43453c090876ec404f9d3117402b26
let baseURL = 'https://api.themoviedb.org/3/';
let headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

const RESOURCE_NAME = "products";

export async function getAllProducts() {
  const response = await fetch(baseURL + RESOURCE_NAME, headers);
  return await response.json();
}

export async function getProduct(id) {
    const response = await fetch(baseURL + RESOURCE_NAME + '/' + id, headers);
    let product = await response.json();
    return product;
  }