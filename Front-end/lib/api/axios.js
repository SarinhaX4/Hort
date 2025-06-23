// HORTI--ei-main/lib/api/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // <-- ALTERADO AQUI para a nova porta do back-end
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;