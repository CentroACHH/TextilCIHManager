import axios from 'axios';

const API = axios.create({
  baseURL: 'https://textilmanager-backend.onrender.com/api',
});

export default API;
