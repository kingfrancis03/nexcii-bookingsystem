import axios from './axios';

export interface Vessel {
  id: number;
  vessel_name: string;
  registration_number: string;
  weight_capacity: number;
  entry_date: string; // e.g., "2025-07-25"
  status: 'pending' | 'active' | 'inactive' | string; // Adjust as needed
  created_by: number;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  [key: string]: any; // Optional, for flexibility
}

// Fetch all vessels
export const fetchVesselsApi = async (): Promise<Vessel[]> => {
  const res = await axios.get('/vessels');
  return res.data;
};

// Create new vessel
export const createVesselApi = async (data: Partial<Vessel>) => {
  const res = await axios.post('/vessels', data);
  return res.data;
};

// Update existing vessel
export const updateVesselApi = async (id: number, data: Partial<Vessel>) => {
  const res = await axios.put(`/vessels/${id}`, data);
  return res.data;
};

// Delete vessel
export const deleteVesselApi = async (id: number) => {
  const res = await axios.delete(`/vessels/${id}`);
  return res.data;
};
