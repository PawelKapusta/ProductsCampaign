import axios from 'axios';

const url = 'http://localhost:5001';

export const getProducts = () =>
  axios
    .get(`${url}/products`)
    .then((response) => {
      console.log('Get products response: ', response);
      return response;
    })
    .catch((error) => console.log('Get products error: ', error));

export const createProduct = (product) =>
  axios
    .post(`${url}/products`, product, {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
    .then((response) => console.log('Create product response: ', response))
    .catch((error) => console.log('Create product error: ', error));

export const updateProduct = (id, updatedProduct) =>
  axios
    .patch(`${url}/products/${id}`, updatedProduct)
    .then((response) => console.log('Update product response: ', response))
    .catch((error) => console.log('Update product error: ', error));
export const deleteProduct = (id) =>
  axios
    .delete(`${url}/products/${id}`)
    .then((response) => console.log('Delete product response: ', response))
    .catch((error) => console.log('Delete product error: ', error));
