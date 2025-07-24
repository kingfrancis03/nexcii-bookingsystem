from pydantic import BaseModel
from datetime import date, time, datetime
from typing import Optional, List
from .trucking_company import TruckingCompanyOut
from .vessel import VesselOut
from .fee_schema import FeeForRecord

# 🧾 Dynamic Fee Schema
class TruckingRecordFeeOut(BaseModel):
    id: int
    fee_id: int
    amount: float
    fee: FeeForRecord  # ✅ This is the joined full fee object

    class Config:
        orm_mode = True

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

    weight_1: Optional[float]
    weight_2: Optional[float]

    created_at: Optional[datetime]
    updated_at: Optional[datetime]
    created_by: Optional[int]
    updated_by: Optional[int]

    fees: Optional[List[TruckingRecordFeeOut]]  # ✅ List of dynamic fees

    class Config:
        orm_mode = True

# 🔎 For filtering
class TruckingRecordFilter(BaseModel):
    destination: Optional[str]
    record_date: Optional[date]
    record_time: Optional[time]
    vessel_id: Optional[int]
    trucking_company_id: Optional[int]
    plate_number: Optional[str]
    contact_info: Optional[str]
    created_by: Optional[int]
    overview: Optional[str]  # e.g., "today" or "this_month"

# ✳️ Create schema
class TruckingRecordCreate(BaseModel):
    destination: str
    record_date: date
    record_time: time
    vessel_id: Optional[int]
    trucking_company_id: Optional[int]
    plate_number: str
    contact_info: Optional[str]
    weight_1: Optional[float]
    weight_2: Optional[float]
    created_by: Optional[int]

    class Config:
        orm_mode = True

# 🔄 Update schema
class TruckingRecordUpdate(BaseModel):
    destination: Optional[str]
    record_date: Optional[date]
    record_time: Optional[time]
    vessel_id: Optional[int]
    trucking_company_id: Optional[int]
    plate_number: Optional[str]
    contact_info: Optional[str]
    weight_1: Optional[float]
    weight_2: Optional[float]
    updated_by: Optional[int]

    class Config:
        orm_mode = True
