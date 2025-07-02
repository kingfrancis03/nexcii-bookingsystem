from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import health_controller, user_controller, trucking_record_controller, trucking_company_controller, vessel_controller

app = FastAPI(
    title="Booking Management System",
    description="Sample project to test Swagger and routes",
    version="1.0.0"
)

origins = [
    "http://localhost:3000",  # React or frontend origin
    # Add other origins if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Or use ["*"] to allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Include sample router
app.include_router(user_controller.router)
app.include_router(health_controller.router)
app.include_router(trucking_record_controller.router)
app.include_router(trucking_company_controller.router)
app.include_router(vessel_controller.router)
