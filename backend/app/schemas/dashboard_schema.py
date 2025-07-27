from pydantic import BaseModel
from datetime import date

class DashboardStats(BaseModel):
    total_bookings_today: int
    total_bookings_this_month: int
    total_fees: float
    total_companies: int
    total_vessels_today: int

class DailyRecord(BaseModel):
    date: date
    count: int

class MonthlyRecord(BaseModel):
    month: str
    total: int

class TopDestination(BaseModel):
    destination: str
    count: int

class TopTruckingCompany(BaseModel):
    company: str
    count: int