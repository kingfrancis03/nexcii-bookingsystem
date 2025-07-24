from pydantic import BaseModel
from typing import Optional, Literal


class FeeBase(BaseModel):
    fee_name: str
    description: Optional[str] = None
    default_value: float
    status: Literal["active", "inactive"] = "active"

class FeeForRecord(BaseModel):
    fee_name: str


class FeeCreate(FeeBase):
    created_by: Optional[int] = None


class FeeUpdate(BaseModel):
    description: Optional[str] = None
    default_value: Optional[float] = None
    status: Optional[Literal["active", "inactive"]] = None


class FeeOut(FeeBase):
    id: int
    created_by: Optional[int]

    class Config:
        orm_mode = True