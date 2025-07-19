import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi } from '../services/auth';
import { decodeToken } from '../utils/jwt';

const defaultUser = {
  username: null,
  name: null,
  role: null
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string; password: string }) => {
    const response = await loginApi(credentials);
    return response;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: defaultUser,
    token: null,
    loading: false,
    error: null,
    isLoggedIn: false
  },
  reducers: {
    logout: (state) => {
      state.user = defaultUser;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const decoded = decodeToken(action.payload.token);
        state.loading = false;
        state.token = action.payload.token;
        state.user = {
          username: decoded?.username,
          name: decoded?.name,
          role: decoded?.role
        };
        state.isLoggedIn = true;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
        state.isLoggedIn = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
