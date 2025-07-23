// src/store/slices/truckingRecordsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchTruckingRecordsApi } from '../services/truckingRecords';

// --- Initial state ---
const initialState = {
  records: [],
  total: 0,
  loading: false,
  error: null,
};

// --- Slice ---
const truckingRecordsSlice = createSlice({
  name: 'truckingRecords',
  initialState,
  reducers: {
    setTruckingRecords(state, action) {
      state.records = action.payload.records;
      state.total = action.payload.total;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const fetchTruckingRecords = (skip = 0, limit = 10) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const result = await fetchTruckingRecordsApi(skip, limit);
    dispatch(setTruckingRecords({ records: result.data, total: result.total }));
  } catch (error) {
    dispatch(setError(error.message || 'Failed to fetch trucking records.'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const {
  setTruckingRecords,
  setLoading,
  setError,
} = truckingRecordsSlice.actions;

export default truckingRecordsSlice.reducer;
