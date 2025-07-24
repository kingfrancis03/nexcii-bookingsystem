from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.fees import Fee
from app.schemas.fee_schema import FeeCreate, FeeUpdate


class FeeService:
    def __init__(self, db: Session):
        self.db = db

    def get_all_fees(self) -> List[Fee]:
        return self.db.query(Fee).all()

    def get_fee_by_id(self, fee_id: int) -> Optional[Fee]:
        return self.db.query(Fee).filter(Fee.id == fee_id).first()

    def create_fee(self, data: FeeCreate) -> Fee:
        fee = Fee(**data.dict())
        self.db.add(fee)
        self.db.commit()
        self.db.refresh(fee)
        return fee

    def update_fee(self, fee_id: int, data: FeeUpdate) -> Optional[Fee]:
        fee = self.get_fee_by_id(fee_id)
        if not fee:
            return None
        for field, value in data.dict(exclude_unset=True).items():
            setattr(fee, field, value)
        self.db.commit()
        self.db.refresh(fee)
        return fee

    def delete_fee(self, fee_id: int) -> bool:
        fee = self.get_fee_by_id(fee_id)
        if not fee:
            return False
        self.db.delete(fee)
        self.db.commit()
        return True
