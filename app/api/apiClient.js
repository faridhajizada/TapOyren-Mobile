import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
// import TokenService from '../service/token.service'


const axiosClient = axios.create({
  baseURL: `http://tapoyren.morooq.az/`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Origin': 'http://tapoyren.morooq.az/'
  },
});
export const authAxiosClient = axios.create({
  baseURL: `http://tapoyren.morooq.az/`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Origin': 'http://tapoyren.morooq.az/'
  },
  withCredentials: true
});

authAxiosClient.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('token');
    // console.log('interceptor token ',token)
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

authAxiosClient.interceptors.response.use(
  response => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    if (error.response.status == 401 && !originalConfig._retry) {
      console.warn('error interceptors 401 code ')
      originalConfig._retry = true;
      try {
        const resp = await authAxiosClient.post(`/api/User/refresh-token`);
        const data = await resp.data;
        await SecureStore.setItemAsync('token', data.token);
        // await TokenService.setLocalAccessToken(resp.token);
        return authAxiosClient(originalConfig);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
    console.error('Looks like there was a problem. Status Code: ' + error.response.status);
    return Promise.reject(error);
  }
);

export default axiosClient;