import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchVesselsApi,
  createVesselApi,
  updateVesselApi,
  deleteVesselApi,
  Vessel
} from '../services/vessel';

interface VesselState {
  list: Vessel[];
  loading: boolean;
  error: string | null;
}

const initialState: VesselState = {
  list: [],
  loading: false,
  error: null,
};

// Thunks
export const fetchVessels = createAsyncThunk('vessels/fetchAll', async () => {
  return await fetchVesselsApi();
});

export const createVessel = createAsyncThunk(
  'vessels/create',
  async (data: Partial<Vessel>) => {
    return await createVesselApi(data);
  }
);

export const updateVessel = createAsyncThunk(
  'vessels/update',
  async ({ id, data }: { id: number; data: Partial<Vessel> }) => {
    return await updateVesselApi(id, data);
  }
);

export const deleteVessel = createAsyncThunk('vessels/delete', async (id: number) => {
  return await deleteVesselApi(id);
});

// Slice
const vesselSlice = createSlice({
  name: 'vessels',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchVessels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVessels.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchVessels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch vessels';
      })

      // Create
      .addCase(createVessel.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // Update
      .addCase(updateVessel.fulfilled, (state, action) => {
        const index = state.list.findIndex((v) => v.id === action.payload.id);
        if (index > -1) {
          state.list[index] = action.payload;
        }
      })

      // Delete
      .addCase(deleteVessel.fulfilled, (state, action) => {
        state.list = state.list.filter((v) => v.id !== action.meta.arg);
      });
  },
});

export default vesselSlice.reducer;
