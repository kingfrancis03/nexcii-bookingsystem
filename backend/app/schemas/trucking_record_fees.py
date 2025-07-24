from pydantic import BaseModel
from datetime import datetime
from decimal import Decimal

class TruckingRecordFeeBase(BaseModel):
    record_id: int
    fee_id: int
    amount: Decimal

class TruckingRecordFeeCreate(TruckingRecordFeeBase):
    pass

class TruckingRecordFeeOut(TruckingRecordFeeBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
