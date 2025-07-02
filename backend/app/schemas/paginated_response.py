from typing import List
from pydantic import BaseModel
from .trucking_record import TruckingRecordOut

class PaginatedResponse(BaseModel):
    data: List[TruckingRecordOut]
    total: int
    limit: int
    skip: int