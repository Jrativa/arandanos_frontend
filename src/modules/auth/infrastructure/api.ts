import { api } from '../../../core/api/axios.instance';

export const authAPI = {
  login: async (username: string, password: string) => {

    const response = await api.post('/auth/login', {
      username,
      password,
    });

    return response.data;
  }
};