import axios from 'axios';

export const http = axios.create({baseURL : 'https://products-campaign.herokuapp.com'});