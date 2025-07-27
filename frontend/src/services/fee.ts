import axios from './axios';

// Interface defined inside the service
export interface Fee {
  id: number;
  fee_name: string;
  description: string;
  default_value: number;
  status: string;
  created_by: number | null;
}

// API: Fetch all fees
export const fetchFeesApi = async (): Promise<Fee[]> => {
  const res = await axios.get('/fees');
  return res.data;
};

// API: Create a new fee
export const createFeeApi = async (data: Partial<Fee>): Promise<Fee> => {
  const res = await axios.post('/fees', data);
  return res.data;
};

// API: Update fee
export const updateFeeApi = async (id: number, data: Partial<Fee>): Promise<Fee> => {
  const res = await axios.put(`/fees/${id}`, data);
  return res.data;
};

// API: Delete fee
export const deleteFeeApi = async (id: number) => {
  const res = await axios.delete(`/fees/${id}`);
  return res.data;
};
