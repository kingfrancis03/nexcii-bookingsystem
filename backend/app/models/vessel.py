from sqlalchemy import Column, BigInteger, String, Date, DECIMAL, TIMESTAMP, Enum, ForeignKey
from sqlalchemy.orm import relationship
from app.database.database import Base
import enum

class VesselStatusEnum(str, enum.Enum):
    active = 'active'
    inactive = 'inactive'
    pending = 'pending'

class Vessel(Base):
    __tablename__ = "vessels"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    vessel_name = Column(String(255), nullable=False)
    registration_number = Column(String(100), nullable=False)
    weight_capacity = Column(DECIMAL(10, 2), nullable=False)
    created_by = Column(BigInteger, ForeignKey("users.id", ondelete="SET NULL"))
    entry_date = Column(Date, nullable=False)
    status = Column(Enum(VesselStatusEnum), default=VesselStatusEnum.pending, nullable=False)
    created_at = Column(TIMESTAMP, server_default="CURRENT_TIMESTAMP")
    updated_at = Column(TIMESTAMP, server_default="CURRENT_TIMESTAMP", onupdate="CURRENT_TIMESTAMP")

    trucking_records = relationship("TruckingRecord", back_populates="vessel")
