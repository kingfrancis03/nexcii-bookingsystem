import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getTruckingCompanies,
  getTruckingCompanyById,
  createTruckingCompany,
  updateTruckingCompany,
  deleteTruckingCompany,
  TruckingCompany,
} from '../services/truckingCompany';


interface TruckingCompanyState {
  list: TruckingCompany[];
  selected?: TruckingCompany;
  loading: boolean;
  error?: string | null;
}

const initialState: TruckingCompanyState = {
  list: [],
  selected: undefined,
  loading: false,
  error: null,
};

// Async thunks
export const fetchTruckingCompanies = createAsyncThunk(
  'truckingCompany/fetchAll',
  async () => await getTruckingCompanies()
);

export const fetchTruckingCompanyById = createAsyncThunk(
  'truckingCompany/fetchById',
  async (id: number) => await getTruckingCompanyById(id)
);

export const addTruckingCompany = createAsyncThunk(
  'truckingCompany/create',
  async (data: Partial<TruckingCompany>) => await createTruckingCompany(data)
);

export const editTruckingCompany = createAsyncThunk(
  'truckingCompany/update',
  async ({ id, data }: { id: number; data: Partial<TruckingCompany> }) =>
    await updateTruckingCompany(id, data)
);

export const removeTruckingCompany = createAsyncThunk(
  'truckingCompany/delete',
  async (id: number) => await deleteTruckingCompany(id)
);

const truckingCompanySlice = createSlice({
  name: 'truckingCompany',
  initialState,
  reducers: {
    clearSelected: (state) => {
      state.selected = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchTruckingCompanies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTruckingCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTruckingCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch companies';
      })

      // Fetch by ID
      .addCase(fetchTruckingCompanyById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })

      // Add
      .addCase(addTruckingCompany.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // Update
      .addCase(editTruckingCompany.fulfilled, (state, action) => {
        state.list = state.list.map((c) =>
          c.id === action.payload.id ? action.payload : c
        );
      })

      // Delete
      .addCase(removeTruckingCompany.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c.id !== action.payload.id);
      });
  },
});

export const { clearSelected } = truckingCompanySlice.actions;
export default truckingCompanySlice.reducer;
