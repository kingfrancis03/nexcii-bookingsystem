from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database.database import get_db
from app.core.auth import get_current_user
from app.schemas.trucking_record_fees import TruckingRecordFeeCreate, TruckingRecordFeeOut
from app.services.trucking_record_fee_service import TruckingRecordFeeService

router = APIRouter(
    prefix="/trucking-record-fees",
    tags=["Trucking Record Fees"],
    dependencies=[Depends(get_current_user)]
)

class TruckingRecordFeeController:
    def __init__(self):
        pass

    def create(self, data: TruckingRecordFeeCreate, db: Session = Depends(get_db)) -> TruckingRecordFeeOut:
        return TruckingRecordFeeService(db).create(data)

    def create_bulk(self, data: List[TruckingRecordFeeCreate], db: Session = Depends(get_db)) -> List[TruckingRecordFeeOut]:
        return TruckingRecordFeeService(db).create_bulk(data)

    def get_by_record_id(self, record_id: int, db: Session = Depends(get_db)) -> List[TruckingRecordFeeOut]:
        result = TruckingRecordFeeService(db).get_by_record_id(record_id)
        if not result:
            raise HTTPException(status_code=404, detail="No fees found for this record")
        return result


controller = TruckingRecordFeeController()

router.add_api_route("/", controller.create, methods=["POST"], response_model=TruckingRecordFeeOut)
router.add_api_route("/bulk", controller.create_bulk, methods=["POST"], response_model=List[TruckingRecordFeeOut])
router.add_api_route("/record/{record_id}", controller.get_by_record_id, methods=["GET"], response_model=List[TruckingRecordFeeOut])
