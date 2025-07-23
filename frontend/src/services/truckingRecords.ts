import axios from './axios';

interface TruckingRecord {
  id: number;
  record_date: string;
  destination: string;
  plate_number: string;
  vessel?: { vessel_name: string };
  company?: { company_name: string };
  ppa_fee: number;
  terminal_fee: number;
  pcg_fee: number;
}

interface FetchTruckingRecordsResponse {
  data: TruckingRecord[];
  total: number;
}

export const fetchTruckingRecordsApi = async (skip = 0, limit = 10): Promise<FetchTruckingRecordsResponse> => {
  const res = await axios.get('/trucking-records', {
    params: { skip, limit },
  });

  return {
    data: res.data.data,
    total: res.data.total,
  };
};
