import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  fetchData: () => axios.get('https://jsonplaceholder.typicode.com/photos'),
  login: (username: string, password: string) =>
    api.post('/login', {
      username,
      password,
    }),
  getProfile: (token: string) =>
    api.get('/user', {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
