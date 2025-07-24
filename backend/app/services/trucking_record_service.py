from fastapi import HTTPException
from datetime import date
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import extract
from app.models.trucking_record import TruckingRecord
from app.models.trucking_record_fees import TruckingRecordFee
from app.models.fees import Fee
from app.schemas.trucking_record import TruckingRecordCreate, TruckingRecordUpdate
from typing import Dict, Any, Optional, List

class TruckingRecordService:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> list[TruckingRecord]:
        return self.db.query(TruckingRecord).options(
            joinedload(TruckingRecord.vessel),
            joinedload(TruckingRecord.company),
            joinedload(TruckingRecord.fees).joinedload(TruckingRecordFee.fee)
        ).filter(TruckingRecord.is_deleted == False).all()

    def get_paginated_records(
        self,
        skip: int = 0,
        limit: int = 10,
        filters: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        today = date.today()
        query = self.db.query(TruckingRecord).options(
            joinedload(TruckingRecord.vessel),
            joinedload(TruckingRecord.company),
            joinedload(TruckingRecord.fees).joinedload(TruckingRecordFee.fee)
        ).filter(TruckingRecord.is_deleted == False)
        print(query)
        if filters:
            overview = filters.pop("overview", None)

            if overview == "today":
                query = query.filter(TruckingRecord.record_date == today)
            elif overview == "this_month":
                query = query.filter(
                    extract("month", TruckingRecord.record_date) == today.month,
                    extract("year", TruckingRecord.record_date) == today.year
                )

            for key, value in filters.items():
                if value is not None and hasattr(TruckingRecord, key):
                    query = query.filter(getattr(TruckingRecord, key) == value)

        total = query.count()
        records = query.offset(skip).limit(limit).all()

        return {
            "data": records,
            "total": total,
            "limit": limit,
            "skip": skip
        }

    def get_by_id(self, record_id: int) -> TruckingRecord:
        return self.db.query(TruckingRecord).options(
            joinedload(TruckingRecord.fees).joinedload(TruckingRecordFee.fee),
            joinedload(TruckingRecord.vessel),
            joinedload(TruckingRecord.company)
        ).filter(
            TruckingRecord.id == record_id,
            TruckingRecord.is_deleted == False
        ).first()

    def create(self, record_data: TruckingRecordCreate):
        # Create the record first
        new_record = TruckingRecord(**record_data.dict())
        self.db.add(new_record)
        self.db.commit()
        self.db.refresh(new_record)

        # Get all active fees
        active_fees = self.db.query(Fee).filter(Fee.status == 'active').all()

        # Attach fees to the record with default values
        for fee in active_fees:
            fee_link = TruckingRecordFee(
                record_id=new_record.id,
                fee_id=fee.id,
                amount=fee.default_value
            )
            self.db.add(fee_link)

        self.db.commit()
        return new_record

    def create_many(self, records_data: List[TruckingRecordCreate]):
        try:
            new_records = [TruckingRecord(**r.dict()) for r in records_data]
            self.db.add_all(new_records)
            self.db.commit()

            for record in new_records:
                self.db.refresh(record)

                # Add default fees
                active_fees = self.db.query(Fee).filter(Fee.status == 'active').all()
                for fee in active_fees:
                    self.db.add(TruckingRecordFee(
                        record_id=record.id,
                        fee_id=fee.id,
                        amount=fee.default_value
                    ))
            self.db.commit()
            return new_records

        except Exception:
            self.db.rollback()
            raise

    def update(self, record_id: int, update_data: TruckingRecordUpdate):
        record = self.get_by_id(record_id)
        if not record:
            return None
        for field, value in update_data.dict(exclude_unset=True).items():
            setattr(record, field, value)
        self.db.commit()
        self.db.refresh(record)
        return record

    def soft_delete(self, record_id: int):
        record = self.get_by_id(record_id)
        if not record:
            return None
        record.is_deleted = True
        self.db.commit()
        return record
