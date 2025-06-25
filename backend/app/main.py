from fastapi import FastAPI
from app.api import health_controller, user_controller  

app = FastAPI(
    title="Booking Management System",
    description="Sample project to test Swagger and routes",
    version="1.0.0"
)

# Include sample router
app.include_router(user_controller.router)
app.include_router(health_controller.router)
