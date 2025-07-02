from fastapi import APIRouter, Depends, HTTPException, status, Query, Body
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services.trucking_record_service import TruckingRecordService
from app.schemas.trucking_record import (
    TruckingRecordCreate,
    TruckingRecordUpdate,
    TruckingRecordOut,
    TruckingRecordFilter
)
from app.schemas.paginated_response import PaginatedResponse
from typing import Dict, Any, Optional

router = APIRouter(prefix="/trucking-records", tags=["Trucking Records"])

class TruckingRecordController:
    def __init__(self):
        pass

    def get_all_records(
        self,
        skip: int = Query(0, ge=0),
        limit: int = Query(10, le=100),
        db: Session = Depends(get_db),
    ) -> PaginatedResponse:
        return TruckingRecordService(db).get_paginated_records(
            skip=skip, limit=limit, filters={}
        )

    def get_filtered_records(
        self,
        skip: int = Query(0, ge=0),
        limit: int = Query(10, le=100),
        filters: TruckingRecordFilter = Body(...),
        db: Session = Depends(get_db),
    ) -> PaginatedResponse:
        return TruckingRecordService(db).get_paginated_records(
            skip=skip, limit=limit, filters=filters.model_dump(exclude_none=True)
        )

    def get_by_id(self, record_id: int, db: Session = Depends(get_db)) -> TruckingRecordOut:
        record = TruckingRecordService(db).get_by_id(record_id)
        if not record:
            raise HTTPException(status_code=404, detail="Record not found")
        return record

    def create(self, data: TruckingRecordCreate, db: Session = Depends(get_db)) -> TruckingRecordOut:
        return TruckingRecordService(db).create(data)

    def update(self, record_id: int, data: TruckingRecordUpdate, db: Session = Depends(get_db)) -> TruckingRecordOut:
        record = TruckingRecordService(db).update(record_id, data)
        if not record:
            raise HTTPException(status_code=404, detail="Record not found")
        return record

    def soft_delete(self, record_id: int, db: Session = Depends(get_db)):
        record = TruckingRecordService(db).soft_delete(record_id)
        if not record:
            raise HTTPException(status_code=404, detail="Record not found")
        return


controller = TruckingRecordController()

router.add_api_route("/", controller.get_all_records, methods=["GET"], response_model=PaginatedResponse)
router.add_api_route("/filter", controller.get_filtered_records, methods=["POST"], response_model=PaginatedResponse)
router.add_api_route("/", controller.create, methods=["POST"], response_model=TruckingRecordOut, status_code=status.HTTP_201_CREATED)
router.add_api_route("/{record_id}", controller.update, methods=["PUT"], response_model=TruckingRecordOut)
router.add_api_route("/{record_id}", controller.soft_delete, methods=["DELETE"], status_code=status.HTTP_204_NO_CONTENT)
