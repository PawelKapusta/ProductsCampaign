import {http} from '../lib/axios';

export const getProducts = () =>
 http
    .get(`/products`)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log('Get products error: ', error));

export const createProduct = (product) =>
 http
    .post(`/products`, product, {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
    .then((response) => console.log('Create product response: ', response))
    .catch((error) => console.log('Create product error: ', error));

export const updateProduct = (id, updatedProduct) =>
 http
    .patch(`/products/${id}`, updatedProduct)
    .then((response) => console.log('Update product response: ', response))
    .catch((error) => console.log('Update product error: ', error));

export const deleteProduct = (id) =>
 http
    .delete(`/products/${id}`)
    .then((response) => console.log('Delete product response: ', response))
    .catch((error) => console.log('Delete product error: ', error));
