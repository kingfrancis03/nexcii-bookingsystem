from sqlalchemy import Column, ForeignKey, BigInteger, DECIMAL, TIMESTAMP, func
from sqlalchemy.orm import relationship
from app.database.database import Base

class TruckingRecordFee(Base):
    __tablename__ = "trucking_record_fees"

    id = Column(BigInteger, primary_key=True, index=True)
    record_id = Column(BigInteger, ForeignKey("trucking_records.id"), nullable=False)
    fee_id = Column(BigInteger, ForeignKey("fees.id"), nullable=False)
    amount = Column(DECIMAL(10, 2), nullable=False, default=0.00)
    created_at = Column(TIMESTAMP, server_default=func.current_timestamp())

    # Relationships
    fee = relationship("Fee", back_populates="record_fees")
    record = relationship("TruckingRecord", back_populates="fees")
