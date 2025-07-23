from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services.vessel_service import VesselService
from app.schemas.vessel import VesselCreate, VesselUpdate, VesselOut
from app.core.auth import get_current_user

router = APIRouter(prefix="/vessels", tags=["Vessels"], dependencies=[Depends(get_current_user)])


class VesselController:
    def __init__(self):
        pass

    def get_all(self, db: Session = Depends(get_db)) -> list[VesselOut]:
        return VesselService(db).get_all()

    def get_by_id(self, vessel_id: int, db: Session = Depends(get_db)) -> VesselOut:
        vessel = VesselService(db).get_by_id(vessel_id)
        if not vessel:
            raise HTTPException(status_code=404, detail="Vessel not found")
        return vessel

    def create(self, data: VesselCreate, db: Session = Depends(get_db)) -> VesselOut:
        return VesselService(db).create(data)

    def update(self, vessel_id: int, data: VesselUpdate, db: Session = Depends(get_db)) -> VesselOut:
        vessel = VesselService(db).update(vessel_id, data)
        if not vessel:
            raise HTTPException(status_code=404, detail="Vessel not found")
        return vessel

    def deactivate(self, vessel_id: int, db: Session = Depends(get_db)):
        vessel = VesselService(db).deactivate(vessel_id)
        if not vessel:
            raise HTTPException(status_code=404, detail="Vessel not found")
        return


controller = VesselController()

router.add_api_route("/", controller.get_all, methods=["GET"], response_model=list[VesselOut])
router.add_api_route("/{vessel_id}", controller.get_by_id, methods=["GET"], response_model=VesselOut)
router.add_api_route("/", controller.create, methods=["POST"], response_model=VesselOut, status_code=status.HTTP_201_CREATED)
router.add_api_route("/{vessel_id}", controller.update, methods=["PUT"], response_model=VesselOut)
router.add_api_route("/{vessel_id}", controller.deactivate, methods=["DELETE"], status_code=status.HTTP_204_NO_CONTENT)
