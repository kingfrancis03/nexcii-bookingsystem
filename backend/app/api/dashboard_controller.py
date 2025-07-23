from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.services.dashboard_service import DashboardService
from app.schemas.dashboard_schema import (
    DashboardStats,
    DailyRecord,
    TopDestination,
    TopTruckingCompany,
    MonthlyRecord
    )
from app.database.database import get_db
from app.core.auth import get_current_user
from typing import Dict, Any, Optional, List

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

class DashboardController:
    def __init__(self):
        pass

    def get_stats(self, db: Session = Depends(get_db)) -> DashboardStats:
        return DashboardService(db).get_stats()
    
    def get_daily_records(self, db: Session = Depends(get_db)) -> List[DailyRecord]:
        return DashboardService(db).get_daily_records()

    def get_monthly_records(self, db: Session = Depends(get_db)) -> List[MonthlyRecord]:
        return DashboardService(db).get_monthly_records()

    def get_top_destinations(self, db: Session = Depends(get_db)) -> List[TopDestination]:
        return DashboardService(db).get_top_destinations()

    def get_top_trucking_companies(self, db: Session = Depends(get_db)) -> List[TopTruckingCompany]:
        return DashboardService(db).get_top_trucking_companies()

controller = DashboardController()
router.add_api_route("/stats", controller.get_stats, methods=["GET"], response_model=DashboardStats)
router.add_api_route("/records/daily", controller.get_daily_records, methods=["GET"], response_model=List[DailyRecord])
router.add_api_route("/records/monthly", controller.get_monthly_records, methods=["GET"], response_model=List[MonthlyRecord])
router.add_api_route("/records/top-destinations", controller.get_top_destinations, methods=["GET"], response_model=List[TopDestination])
router.add_api_route("/records/top-companies", controller.get_top_trucking_companies, methods=["GET"], response_model=List[TopTruckingCompany])
