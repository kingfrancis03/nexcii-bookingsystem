import axios from './axios';

export const loginApi = async (credentials: { username: string; password: string }) => {
  const res = await axios.post('/users/login', credentials);
  
  return {
    token: res.data.access_token,
    token_type: res.data.token_type,
  };
};
