from sqlalchemy import Column, BigInteger, String, Text, DECIMAL, Enum, ForeignKey, TIMESTAMP
from sqlalchemy.orm import relationship
from app.database.database import Base
import enum


class FeeStatus(str, enum.Enum):
    active = "active"
    inactive = "inactive"


class Fee(Base):
    __tablename__ = "fees"

    id = Column(BigInteger, primary_key=True, autoincrement=True, index=True)
    fee_name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    default_value = Column(DECIMAL(10, 2), nullable=False, default=0.00)
    status = Column(Enum(FeeStatus), nullable=False, default=FeeStatus.active)
    created_by = Column(BigInteger, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)

    created_at = Column(TIMESTAMP, nullable=True, server_default="CURRENT_TIMESTAMP")
    updated_at = Column(TIMESTAMP, nullable=True, server_default="CURRENT_TIMESTAMP", server_onupdate="CURRENT_TIMESTAMP")

    creator = relationship("User", backref="fees")
    record_fees = relationship("TruckingRecordFee", back_populates="fee")

