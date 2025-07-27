import axios from './axios';

export interface Record {
  name: string;
  value: number;
}

export interface DashboardStats {
  total_users: number;
  total_trips: number;
  total_income: number;
}

export const fetchDashboardStatsApi = async (): Promise<DashboardStats> => {
  const res = await axios.get('/dashboard/stats');
  return res.data;
};

export const fetchDailyRecordsApi = async (): Promise<Record[]> => {
  const res = await axios.get('/dashboard/records/daily');
  return res.data;
};

export const fetchMonthlyRecordsApi = async (): Promise<Record[]> => {
  const res = await axios.get('/dashboard/records/monthly');
  return res.data;
};

export const fetchTopDestinationsApi = async (): Promise<Record[]> => {
  const res = await axios.get('/dashboard/records/top-destinations');
  return res.data;
};

export const fetchTopCompaniesApi = async (): Promise<Record[]> => {
  const res = await axios.get('/dashboard/records/top-companies');
  return res.data;
};
