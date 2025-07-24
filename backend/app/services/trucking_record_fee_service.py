from sqlalchemy.orm import Session
from app.models.trucking_record_fees import TruckingRecordFee
from app.schemas.trucking_record_fees import TruckingRecordFeeCreate
from typing import List

class TruckingRecordFeeService:
    def __init__(self, db: Session):
        self.db = db

    def create(self, data: TruckingRecordFeeCreate) -> TruckingRecordFee:
        record_fee = TruckingRecordFee(**data.dict())
        self.db.add(record_fee)
        self.db.commit()
        self.db.refresh(record_fee)
        return record_fee

    def create_bulk(self, data_list: List[TruckingRecordFeeCreate]) -> List[TruckingRecordFee]:
        record_fees = [TruckingRecordFee(**data.dict()) for data in data_list]
        self.db.add_all(record_fees)
        self.db.commit()
        return record_fees

    def get_by_record_id(self, record_id: int) -> List[TruckingRecordFee]:
        return self.db.query(TruckingRecordFee).filter_by(record_id=record_id).all()
