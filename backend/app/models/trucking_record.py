from sqlalchemy import Column, BigInteger, Boolean, String, Date, Time, DECIMAL, TIMESTAMP, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.database.database import Base


class TruckingRecord(Base):
    __tablename__ = "trucking_records"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    destination = Column(String(255), nullable=False)
    record_date = Column(Date, nullable=False)
    record_time = Column(Time, nullable=False)

    # 🔁 Replace vessel name with foreign key to vessels table
    vessel_id = Column(BigInteger, ForeignKey("vessels.id"), nullable=True)
    vessel = relationship("Vessel", back_populates="trucking_records")

    trucking_company_id = Column(BigInteger, ForeignKey("trucking_companies.id"))
    company = relationship("TruckingCompany", back_populates="trucking_records")

    plate_number = Column(String(255), nullable=False)
    contact_info = Column(String(255))
    # ppa_fee = Column(DECIMAL(10, 2), nullable=False, default=0.00)
    # terminal_fee = Column(DECIMAL(8, 2), nullable=True)
    # pcg_fee = Column(DECIMAL(10, 2), nullable=False, default=0.00)
    # parking_fee1 = Column(DECIMAL(10, 2), nullable=False, default=0.00)
    # parking_fee2 = Column(DECIMAL(10, 2), nullable=False, default=0.00)
    weight_1 = Column(DECIMAL(10, 2))
    weight_2 = Column(DECIMAL(10, 2))

    is_deleted = Column(Boolean, nullable=False, default=False)

    created_at = Column(TIMESTAMP)
    updated_at = Column(TIMESTAMP)
    created_by = Column(Integer, ForeignKey("users.id"))
    updated_by = Column(BigInteger)
    fees = relationship("TruckingRecordFee", back_populates="record")
    creator = relationship("User", back_populates="records_created")

    class Config:
        orm_mode = True
