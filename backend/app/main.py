from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import (
    health_controller,
    user_controller,
    trucking_record_controller,
    trucking_company_controller,
    vessel_controller,
    dashboard_controller,
    fee_controller,
    trucking_record_fees_controller
)

# Create a sub-app that holds all API routers
api_app = FastAPI()

# Include all routers in the sub-app (no /api prefix here)
api_app.include_router(user_controller.router)
api_app.include_router(health_controller.router)
api_app.include_router(trucking_record_controller.router)
api_app.include_router(trucking_company_controller.router)
api_app.include_router(vessel_controller.router)
api_app.include_router(dashboard_controller.router)
api_app.include_router(fee_controller.router)
api_app.include_router(trucking_record_fees_controller.router)

# Main FastAPI app
app = FastAPI(
    title="Booking Management System",
    description="Sample project to test Swagger and routes",
    version="1.0.0"
)

# CORS middleware
origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Mount the sub-app under /api (global prefix)
app.mount("/api", api_app)
