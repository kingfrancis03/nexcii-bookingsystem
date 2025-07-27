import axios from './axios';

export interface TruckingCompany {
  id: number;
  company_name: string;
  contact_person: string;
  contact_number: string;
  entry_date: string; // e.g., "2025-07-25"
  status: 'pending' | 'active' | 'inactive' | string; // Adjust as needed
  created_by: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  [key: string]: any; // for any extra fields
}

export const getTruckingCompanies = async (): Promise<TruckingCompany[]> => {
  const res = await axios.get('/trucking-companies');
  return res.data;
};

export const getTruckingCompanyById = async (id: number): Promise<TruckingCompany> => {
  const res = await axios.get(`/trucking-companies/${id}`);
  return res.data;
};

export const createTruckingCompany = async (data: Partial<TruckingCompany>) => {
  const res = await axios.post('/trucking-companies', data);
  return res.data;
};

export const updateTruckingCompany = async (id: number, data: Partial<TruckingCompany>) => {
  const res = await axios.put(`/trucking-companies/${id}`, data);
  return res.data;
};

export const deleteTruckingCompany = async (id: number) => {
  const res = await axios.delete(`/trucking-companies/${id}`);
  return res.data;
};
