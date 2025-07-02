from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services.trucking_company_service import TruckingCompanyService
from app.schemas.trucking_company import (
    TruckingCompanyCreate,
    TruckingCompanyUpdate,
    TruckingCompanyOut,
)
from app.core.auth import get_current_user

router = APIRouter(prefix="/trucking-companies", tags=["Trucking Companies"], dependencies=[Depends(get_current_user)])


class TruckingCompanyController:
    def __init__(self):
        pass 
    def get_all(self, db: Session = Depends(get_db)) -> list[TruckingCompanyOut]:
        return TruckingCompanyService(db).get_all()

    def get_by_id(self, company_id: int, db: Session = Depends(get_db)) -> TruckingCompanyOut:
        company = TruckingCompanyService(db).get_by_id(company_id)
        if not company:
            raise HTTPException(status_code=404, detail="Trucking company not found")
        return company

    def create(self, data: TruckingCompanyCreate, db: Session = Depends(get_db)) -> TruckingCompanyOut:
        return TruckingCompanyService(db).create(data)

    def update(self, company_id: int, data: TruckingCompanyUpdate, db: Session = Depends(get_db)) -> TruckingCompanyOut:
        company = TruckingCompanyService(db).update(company_id, data)
        if not company:
            raise HTTPException(status_code=404, detail="Trucking company not found")
        return company

    def deactivate(self, company_id: int, db: Session = Depends(get_db)):
        company = TruckingCompanyService(db).deactivate(company_id)
        if not company:
            raise HTTPException(status_code=404, detail="Trucking company not found")
        return


controller = TruckingCompanyController()

router.add_api_route("/", controller.get_all, methods=["GET"], response_model=list[TruckingCompanyOut])
router.add_api_route("/{company_id}", controller.get_by_id, methods=["GET"], response_model=TruckingCompanyOut)
router.add_api_route("/", controller.create, methods=["POST"], response_model=TruckingCompanyOut, status_code=status.HTTP_201_CREATED)
router.add_api_route("/{company_id}", controller.update, methods=["PUT"], response_model=TruckingCompanyOut)
router.add_api_route("/{company_id}", controller.deactivate, methods=["DELETE"], status_code=status.HTTP_204_NO_CONTENT)
