from pydantic import BaseModel
from datetime import date, time, datetime
from typing import Optional, List
from .trucking_company import TruckingCompanyOut
from .vessel import VesselOut, VesselStatusEnum

# 🟢 Main output schema
class TruckingRecordOut(BaseModel):
    id: int
    destination: str
    record_date: date
    record_time: time

    vessel_id: Optional[int]
    vessel: Optional[VesselOut]

    trucking_company_id: Optional[int]
    company: Optional[TruckingCompanyOut]

    plate_number: str
    contact_info: Optional[str]

    ppa_fee: float
    terminal_fee: Optional[float]
    pcg_fee: float
    parking_fee1: float
    parking_fee2: float
    weight_1: Optional[float]
    weight_2: Optional[float]

    created_at: Optional[datetime]
    updated_at: Optional[datetime]
    created_by: Optional[int]
    updated_by: Optional[int]


    class Config:
        orm_mode = True


class TruckingRecordFilter(BaseModel):
    destination: str
    record_date: date
    record_time: time
    vessel_id: Optional[int]
    trucking_company_id: Optional[int]
    plate_number: str
    contact_info: Optional[str]
    created_by: Optional[int]  

# ✳️ Create schema (used when creating a new record)
class TruckingRecordCreate(BaseModel):
    destination: str
    record_date: date
    record_time: time
    vessel_id: Optional[int]
    trucking_company_id: Optional[int]
    plate_number: str
    contact_info: Optional[str]
    ppa_fee: float
    terminal_fee: Optional[float]
    pcg_fee: float
    parking_fee1: float
    parking_fee2: float
    weight_1: Optional[float]
    weight_2: Optional[float]
    created_by: Optional[int]  # Optional depending on how your logic works

    class Config:
        orm_mode = True

# 🔄 Update schema (for partial updates — PATCH/PUT)
class TruckingRecordUpdate(BaseModel):
    destination: Optional[str]
    record_date: Optional[date]
    record_time: Optional[time]
    vessel_id: Optional[int]
    trucking_company_id: Optional[int]
    plate_number: Optional[str]
    contact_info: Optional[str]
    ppa_fee: Optional[float]
    terminal_fee: Optional[float]
    pcg_fee: Optional[float]
    parking_fee1: Optional[float]
    parking_fee2: Optional[float]
    weight_1: Optional[float]
    weight_2: Optional[float]
    updated_by: Optional[int]

    class Config:
        orm_mode = True
