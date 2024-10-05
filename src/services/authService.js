import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Función para obtener el token del localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Crear una instancia de axios
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Agregar un interceptor de solicitud para incluir el token en las cabeceras
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
