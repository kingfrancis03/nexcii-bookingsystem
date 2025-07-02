from fastapi import HTTPException
from sqlalchemy.orm import Session, joinedload
from app.models.trucking_record import TruckingRecord
from app.schemas.trucking_record import TruckingRecordCreate, TruckingRecordUpdate
from typing import Dict, Any, Optional


class TruckingRecordService:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> list[TruckingRecord]:
        return self.db.query(TruckingRecord).options(
            joinedload(TruckingRecord.vessel),
            joinedload(TruckingRecord.company),
        ).filter(TruckingRecord.is_deleted == False).all()

    def get_paginated_records(
        self,
        skip: int = 0,
        limit: int = 10,
        filters: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        query = self.db.query(TruckingRecord).options(
            joinedload(TruckingRecord.vessel),
            joinedload(TruckingRecord.company),
        ).filter(TruckingRecord.is_deleted == False)

        # Apply dynamic filters
        if filters:
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
        return self.db.query(TruckingRecord).filter(TruckingRecord.id == record_id, TruckingRecord.is_deleted == False).first()

    def create(self, record_data: TruckingRecordCreate):
        new_record = TruckingRecord(**record_data.dict())
        self.db.add(new_record)
        self.db.commit()
        self.db.refresh(new_record)
        return new_record

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