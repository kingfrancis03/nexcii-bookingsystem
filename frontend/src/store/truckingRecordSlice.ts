// src/store/slices/truckingRecordsSlice.js

import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTruckingRecordsApi,
  createTruckingRecordApi,
  updateTruckingRecordApi,
  deleteTruckingRecordApi,
} from '../services/truckingRecords';

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
    addTruckingRecord(state, action) {
      state.records.unshift(action.payload);
      state.total += 1;
    },
    updateTruckingRecord(state, action) {
      const index = state.records.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.records[index] = action.payload;
      }
    },
    deleteTruckingRecord(state, action) {
      state.records = state.records.filter(r => r.id !== action.payload);
      state.total -= 1;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

// --- Thunks ---
export const fetchTruckingRecords = (skip = 0, limit = 10, overview = null) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const result = await fetchTruckingRecordsApi(skip, limit, overview);
    dispatch(setTruckingRecords({ records: result.data, total: result.total }));
  } catch (error) {
    dispatch(setError(error.message || 'Failed to fetch trucking records.'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const createTruckingRecordThunk = (record) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const created = await createTruckingRecordApi(record);
    dispatch(addTruckingRecord(created));
  } catch (error) {
    dispatch(setError(error.message || 'Failed to create trucking record.'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateTruckingRecordThunk = (id, data) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const updated = await updateTruckingRecordApi(id, data);
    dispatch(updateTruckingRecord(updated));
  } catch (error) {
    dispatch(setError(error.message || 'Failed to update trucking record.'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteTruckingRecordThunk = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await deleteTruckingRecordApi(id);
    dispatch(deleteTruckingRecord(id));
  } catch (error) {
    dispatch(setError(error.message || 'Failed to delete trucking record.'));
  } finally {
    dispatch(setLoading(false));
  }
};

// --- Exports ---
export const {
  setTruckingRecords,
  addTruckingRecord,
  updateTruckingRecord,
  deleteTruckingRecord,
  setLoading,
  setError,
} = truckingRecordsSlice.actions;

export default truckingRecordsSlice.reducer;
