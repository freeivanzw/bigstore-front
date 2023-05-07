import axios from 'axios';

export const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

export const $authHost = axios.create({
  headers: {
    authorization: localStorage.getItem('Authorization'),
  },
  baseURL: process.env.REACT_APP_API_URL
})