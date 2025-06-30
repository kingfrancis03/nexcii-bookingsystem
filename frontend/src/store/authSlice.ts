import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi } from '../services/auth';
import { decodeToken } from '../utils/jwt';

const defaultUser = {
    username: null,
    name: null,
    role: null
}

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string; password: string }) => {
    const response = await loginApi(credentials);
    console.log(response);
    
    return response;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user:  defaultUser,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = defaultUser;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const decoded_details = decodeToken(action.payload.token);
        state.loading = false;
        state.token = action.payload.token;
        state.user = {
          username: decoded_details?.username,
          name: decoded_details.name,
          role: decoded_details.role
        };
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
