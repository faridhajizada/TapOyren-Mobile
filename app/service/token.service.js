
import * as SecureStore from 'expo-secure-store';
// import jwtDecode from 'jwt-decode';
import { refresh } from '../api/accountScreenAPI';


const getLocalAccessToken = async () => {
  let result = await SecureStore.getItemAsync('token');
  return result;
};
const setLocalAccessToken = async (token) => {
  await SecureStore.setItemAsync('token', token);
};
const removeLocalAccessToken = async () => {
  await SecureStore.deleteItemAsync('token');
};
const refreshLocalAccessToken = async () => {
  let token = await getLocalAccessToken();
  if (token) {
    try {
      let res = await refresh();
      let data = await res.data;
      return data;
    } catch (error) {
      console.log("error from token service ", error);
      return null;
    }
  } else {
    return null
  }
};

const TokenService = {
  getLocalAccessToken,
  setLocalAccessToken,
  removeLocalAccessToken,
  refreshLocalAccessToken,
  // getUser,
  // setUser,
  // removeUser,
};
export default TokenService;