from sqlalchemy import Column, BigInteger, String, Date, Enum, TIMESTAMP, ForeignKey
from sqlalchemy.orm import relationship
from app.database.database import Base
import enum

class TruckingCompanyStatusEnum(str, enum.Enum):
    active = "active"
    inactive = "inactive"
    pending = "pending"

class TruckingCompany(Base):
    __tablename__ = "trucking_companies"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    company_name = Column(String(255), nullable=False)
    contact_person = Column(String(255), nullable=False)
    contact_number = Column(String(100), nullable=False)
    entry_date = Column(Date, nullable=False)
    status = Column(Enum(TruckingCompanyStatusEnum), nullable=False, default=TruckingCompanyStatusEnum.pending)

    created_by = Column(BigInteger, ForeignKey("users.id"), nullable=True)
    created_at = Column(TIMESTAMP)
    updated_at = Column(TIMESTAMP)

    trucking_records = relationship("TruckingRecord", back_populates="company")

    class Config:
        orm_mode = True
