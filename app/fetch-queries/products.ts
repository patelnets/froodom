export async function getProducts() {
  return fetch("https://8b0z64x58c.execute-api.eu-west-2.amazonaws.com/prod/products", {
    method: 'GET',
  });
}
