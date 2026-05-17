import axios from 'axios';

// Instancia base
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Inyecta el Access Token a todas las peticiones
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('access_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de RESPUESTA: La magia del Refresh Token
api.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 (No autorizado) y no hemos reintentado ya
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Llamamos a tu endpoint de FastAPI para refrescar el token
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {}, {
          withCredentials: true 
        });

        // Guardamos el nuevo token
        const newAccessToken = res.data.access_token;
        sessionStorage.setItem('access_token', newAccessToken);

        // Reintentamos la petición original que falló con el nuevo token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
        
      } catch (refreshError) {
        // Si el refresh token también expiró, cerramos la sesión
        sessionStorage.removeItem('access_token');
        window.location.href = '/login'; 
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);