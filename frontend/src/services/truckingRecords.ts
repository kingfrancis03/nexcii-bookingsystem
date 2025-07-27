import axios from './axios';

export interface TruckingRecord {
  id: number;
  record_date: string;
  destination: string;
  plate_number: string;
  vessel_id?: number;
  trucking_company_id?: number;
  contact_info?: string;
  weight_1?: number;
  weight_2?: number;
  created_by?: number;
  fees?: {
    fee_name: string;
    amount: number;
  }[];
  vessel?: { vessel_name: string };
  company?: { company_name: string };
  ppa_fee?: number;
  terminal_fee?: number;
  pcg_fee?: number;
}

interface FetchTruckingRecordsResponse {
  data: TruckingRecord[];
  total: number;
}

// Fetch with pagination and optional overview filter
export const fetchTruckingRecordsApi = async (
  skip = 0,
  limit = 10,
  overview: string | null = null
): Promise<FetchTruckingRecordsResponse> => {
  const res = await axios.get('/trucking-records', {
    params: { skip, limit, ...(overview ? { overview } : {}) },
  });

  return {
    data: res.data.data,
    total: res.data.total,
  };
};

// Create a new trucking record
export const createTruckingRecordApi = async (record: Omit<TruckingRecord, 'id'>): Promise<TruckingRecord> => {
  const res = await axios.post('/trucking-records', record);
  return res.data;
};

// Update an existing trucking record by ID
export const updateTruckingRecordApi = async (
  id: number,
  updatedData: Partial<TruckingRecord>
): Promise<TruckingRecord> => {
  const res = await axios.put(`/trucking-records/${id}`, updatedData);
  return res.data;
};

// Delete a trucking record by ID
export const deleteTruckingRecordApi = async (id: number): Promise<void> => {
  await axios.delete(`/trucking-records/${id}`);
};
