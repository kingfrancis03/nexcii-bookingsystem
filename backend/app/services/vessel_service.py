from sqlalchemy.orm import Session
from app.models.vessel import Vessel
from app.schemas.vessel import VesselCreate, VesselUpdate, VesselStatusEnum


class VesselService:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(Vessel).all()

    def get_by_id(self, vessel_id: int):
        return self.db.query(Vessel).filter(Vessel.id == vessel_id).first()

    def create(self, data: VesselCreate):
        new_vessel = Vessel(**data.dict())
        self.db.add(new_vessel)
        self.db.commit()
        self.db.refresh(new_vessel)
        return new_vessel

    def update(self, vessel_id: int, data: VesselUpdate):
        vessel = self.get_by_id(vessel_id)
        if not vessel:
            return None
        for key, value in data.dict(exclude_unset=True).items():
            setattr(vessel, key, value)
        self.db.commit()
        self.db.refresh(vessel)
        return vessel

    def deactivate(self, vessel_id: int):
        vessel = self.get_by_id(vessel_id)
        if not vessel:
            return None
        vessel.status = "inactive"
        self.db.commit()
        return vessel
