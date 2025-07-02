from pydantic import BaseModel
from typing import Optional
from datetime import datetime, date
from enum import Enum


# Match the SQLAlchemy enum
class VesselStatusEnum(str, Enum):
    active = "active"
    inactive = "inactive"
    pending = "pending"


class VesselBase(BaseModel):
    vessel_name: str
    registration_number: str
    weight_capacity: float
    entry_date: date
    status: Optional[VesselStatusEnum] = VesselStatusEnum.pending


class VesselCreate(VesselBase):
    created_by: Optional[int]


class VesselUpdate(BaseModel):
    vessel_name: Optional[str] = None
    registration_number: Optional[str] = None
    weight_capacity: Optional[float] = None
    entry_date: Optional[date] = None
    status: Optional[VesselStatusEnum] = None


class VesselOut(VesselBase):
    id: int
    created_by: Optional[int]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True
