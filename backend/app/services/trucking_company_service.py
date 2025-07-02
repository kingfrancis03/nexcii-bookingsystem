from sqlalchemy.orm import Session
from app.models.trucking_company import TruckingCompany
from app.schemas.trucking_company import TruckingCompanyCreate, TruckingCompanyUpdate

class TruckingCompanyService:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.query(TruckingCompany).filter(TruckingCompany.status != 'inactive').all()

    def get_by_id(self, company_id: int):
        return self.db.query(TruckingCompany).filter(TruckingCompany.id == company_id).first()

    def create(self, data: TruckingCompanyCreate):
        new_company = TruckingCompany(**data.dict())
        self.db.add(new_company)
        self.db.commit()
        self.db.refresh(new_company)
        return new_company

    def update(self, company_id: int, data: TruckingCompanyUpdate):
        company = self.get_by_id(company_id)
        if not company:
            return None
        for field, value in data.dict(exclude_unset=True).items():
            setattr(company, field, value)
        self.db.commit()
        self.db.refresh(company)
        return company

    def deactivate(self, company_id: int):
        company = self.get_by_id(company_id)
        if not company:
            return None
        company.status = 'inactive'
        self.db.commit()
        return company
