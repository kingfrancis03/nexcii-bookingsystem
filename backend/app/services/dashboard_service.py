from sqlalchemy.orm import Session
from sqlalchemy import func, extract
from datetime import date
from app.models.trucking_record import TruckingRecord
from datetime import date, timedelta

import calendar

class DashboardService:
    def __init__(self, db: Session):
        self.db = db

    def get_stats(self):
        today = date.today()

        total_bookings_today = self.db.query(TruckingRecord).filter(TruckingRecord.record_date == today).count()

        total_fees = self.db.query(
            TruckingRecord.ppa_fee +
            TruckingRecord.terminal_fee +
            TruckingRecord.pcg_fee +
            TruckingRecord.parking_fee1 +
            TruckingRecord.parking_fee2
        ).all()

        total_fees_sum = sum(f[0] for f in total_fees)
        total_companies = self.db.query(TruckingRecord.trucking_company_id).distinct().count()

        total_vessels_today = self.db.query(TruckingRecord.vessel_id)\
            .filter(TruckingRecord.record_date == today)\
            .distinct()\
            .count()

        return {
            "total_bookings_today": total_bookings_today,
            "total_fees": total_fees_sum,
            "total_companies": total_companies,
            "total_vessels_today": total_vessels_today
        }

    def get_daily_records(self, days: int = 7):
        from_date = date.today() - timedelta(days=days)

        result = (
            self.db.query(
                TruckingRecord.record_date,
                func.count(TruckingRecord.id).label("count")
            )
            .filter(TruckingRecord.record_date >= from_date)
            .group_by(TruckingRecord.record_date)
            .order_by(TruckingRecord.record_date)
            .all()
        )

        return [{"date": r.record_date, "count": r.count} for r in result]

    def get_monthly_records(self):
        current_year = date.today().year

        # Query records grouped by month
        raw_data = (
            self.db.query(
                extract('month', TruckingRecord.record_date).label('month'),
                func.count().label('total')
            )
            .filter(extract('year', TruckingRecord.record_date) == current_year)
            .group_by('month')
            .all()
        )

        # Convert to dictionary for fast lookup
        count_by_month = {int(row.month): row.total for row in raw_data}

        # Return all 12 months, with zero if not found
        return [
            {
                "month": calendar.month_name[month],  # 'January', 'February', etc.
                "total": count_by_month.get(month, 0)
            }
            for month in range(1, 13)
        ]

    def get_top_destinations(self, limit: int = 5):
        result = (
            self.db.query(
                TruckingRecord.destination,
                func.count(TruckingRecord.id).label("count")
            )
            .group_by(TruckingRecord.destination)
            .order_by(func.count(TruckingRecord.id).desc())
            .limit(limit)
            .all()
        )

        return [{"destination": r.destination, "count": r.count} for r in result]
    
    def get_top_trucking_companies(self, limit: int = 5):
        result = (
            self.db.query(
                TruckingCompany.company_name,
                func.count(TruckingRecord.id).label("count")
            )
            .join(TruckingCompany, TruckingCompany.id == TruckingRecord.trucking_company_id)
            .group_by(TruckingCompany.company_name)
            .order_by(func.count(TruckingRecord.id).desc())
            .limit(limit)
            .all()
        )

        return [{"company": r.company_name, "count": r.count} for r in result]
