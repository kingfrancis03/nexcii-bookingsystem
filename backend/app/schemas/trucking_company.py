from pydantic import BaseModel
from datetime import datetime, date
from typing import Optional
from enum import Enum

class TruckingCompanyStatusEnum(str, Enum):
    active = "active"
    inactive = "inactive"
    pending = "pending"

class TruckingCompanyBase(BaseModel):
    company_name: str
    contact_person: str
    contact_number: str
    entry_date: date
    status: TruckingCompanyStatusEnum = TruckingCompanyStatusEnum.pending

class TruckingCompanyCreate(TruckingCompanyBase):
    created_by: Optional[int]

class TruckingCompanyUpdate(BaseModel):
    company_name: Optional[str]
    contact_person: Optional[str]
    contact_number: Optional[str]
    entry_date: Optional[date]
    status: Optional[TruckingCompanyStatusEnum]

class TruckingCompanyOut(TruckingCompanyBase):
    id: int
    created_by: Optional[int]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True
