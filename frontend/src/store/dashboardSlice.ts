import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchDashboardStatsApi,
  fetchDailyRecordsApi,
  fetchMonthlyRecordsApi,
  fetchTopDestinationsApi,
  fetchTopCompaniesApi,
  DashboardStats,
  Record,
} from '../services/dashboard';

interface DashboardState {
  stats: DashboardStats | null;
  daily: Record[];
  monthly: Record[];
  topDestinations: Record[];
  topCompanies: Record[];
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  stats: null,
  daily: [],
  monthly: [],
  topDestinations: [],
  topCompanies: [],
  loading: false,
  error: null,
};

// Thunks
export const fetchDashboardStats = createAsyncThunk('dashboard/stats', fetchDashboardStatsApi);
export const fetchDailyRecords = createAsyncThunk('dashboard/daily', fetchDailyRecordsApi);
export const fetchMonthlyRecords = createAsyncThunk('dashboard/monthly', fetchMonthlyRecordsApi);
export const fetchTopDestinations = createAsyncThunk('dashboard/topDestinations', fetchTopDestinationsApi);
export const fetchTopCompanies = createAsyncThunk('dashboard/topCompanies', fetchTopCompaniesApi);

// Slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch stats';
      })

      // Daily
      .addCase(fetchDailyRecords.fulfilled, (state, action) => {
        state.daily = action.payload;
      })

      // Monthly
      .addCase(fetchMonthlyRecords.fulfilled, (state, action) => {
        state.monthly = action.payload;
      })

      // Top Destinations
      .addCase(fetchTopDestinations.fulfilled, (state, action) => {
        state.topDestinations = action.payload;
      })

      // Top Companies
      .addCase(fetchTopCompanies.fulfilled, (state, action) => {
        state.topCompanies = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
