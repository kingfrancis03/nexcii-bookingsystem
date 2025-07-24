from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services.fee_service import FeeService
from app.schemas.fee_schema import FeeCreate, FeeUpdate, FeeOut
from app.core.auth import get_current_user

router = APIRouter(
    prefix="/fees",
    tags=["Fees"],
    dependencies=[Depends(get_current_user)]
)


class FeeController:
    def __init__(self):
        pass

    def get_all(self, db: Session = Depends(get_db)) -> list[FeeOut]:
        return FeeService(db).get_all_fees()

    def get_by_id(self, fee_id: int, db: Session = Depends(get_db)) -> FeeOut:
        fee = FeeService(db).get_fee_by_id(fee_id)
        if not fee:
            raise HTTPException(status_code=404, detail="Fee not found")
        return fee

    def create(self, data: FeeCreate, db: Session = Depends(get_db)) -> FeeOut:
        return FeeService(db).create_fee(data)

    def update(self, fee_id: int, data: FeeUpdate, db: Session = Depends(get_db)) -> FeeOut:
        fee = FeeService(db).update_fee(fee_id, data)
        if not fee:
            raise HTTPException(status_code=404, detail="Fee not found")
        return fee

    def delete(self, fee_id: int, db: Session = Depends(get_db)):
        success = FeeService(db).delete_fee(fee_id)
        if not success:
            raise HTTPException(status_code=404, detail="Fee not found")
        return


controller = FeeController()

router.add_api_route("/", controller.get_all, methods=["GET"], response_model=list[FeeOut])
router.add_api_route("/{fee_id}", controller.get_by_id, methods=["GET"], response_model=FeeOut)
router.add_api_route("/", controller.create, methods=["POST"], response_model=FeeOut, status_code=status.HTTP_201_CREATED)
router.add_api_route("/{fee_id}", controller.update, methods=["PUT"], response_model=FeeOut)
router.add_api_route("/{fee_id}", controller.delete, methods=["DELETE"], status_code=status.HTTP_204_NO_CONTENT)
