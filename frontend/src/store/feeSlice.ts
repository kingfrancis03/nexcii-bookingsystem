import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchFeesApi,
  createFeeApi,
  updateFeeApi,
  deleteFeeApi,
  Fee,
} from '../services/fee';

interface FeeState {
  list: Fee[];
  loading: boolean;
  error: string | null;
}

const initialState: FeeState = {
  list: [],
  loading: false,
  error: null,
};

// Thunks
export const fetchFees = createAsyncThunk('fees/fetchAll', async () => {
  return await fetchFeesApi();
});

export const createFee = createAsyncThunk('fees/create', async (data: Partial<Fee>) => {
  return await createFeeApi(data);
});

export const updateFee = createAsyncThunk(
  'fees/update',
  async ({ id, data }: { id: number; data: Partial<Fee> }) => {
    return await updateFeeApi(id, data);
  }
);

export const deleteFee = createAsyncThunk('fees/delete', async (id: number) => {
  return await deleteFeeApi(id);
});

// Slice
const feeSlice = createSlice({
  name: 'fees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFees.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchFees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch fees';
      })

      .addCase(createFee.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      .addCase(updateFee.fulfilled, (state, action) => {
        const index = state.list.findIndex((f) => f.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      .addCase(deleteFee.fulfilled, (state, action) => {
        state.list = state.list.filter((f) => f.id !== action.meta.arg);
      });
  },
});

export default feeSlice.reducer;
