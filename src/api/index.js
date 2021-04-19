import axios from 'axios';

const URL = 'http://localhost:5001';

export const getProducts = () =>
  axios
    .get(`${URL}/products`)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log('Get products error: ', error));

export const createProduct = (product) =>
  axios
    .post(`${URL}/products`, product, {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
    .then((response) => console.log('Create product response: ', response))
    .catch((error) => console.log('Create product error: ', error));

export const updateProduct = (id, updatedProduct) =>
  axios
    .patch(`${URL}/products/${id}`, updatedProduct)
    .then((response) => console.log('Update product response: ', response))
    .catch((error) => console.log('Update product error: ', error));

export const deleteProduct = (id) =>
  axios
    .delete(`${URL}/products/${id}`)
    .then((response) => console.log('Delete product response: ', response))
    .catch((error) => console.log('Delete product error: ', error));
