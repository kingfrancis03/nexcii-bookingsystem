# app/models/__init__.py
from .user import User
from .vessel import Vessel
from .trucking_company import TruckingCompany
from .trucking_record import TruckingRecord

__all__ = ["User", "Vessel", "TruckingCompany", "TruckingRecord"]
