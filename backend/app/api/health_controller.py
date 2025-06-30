from fastapi import APIRouter, Depends
from app.core.auth import get_current_user

router = APIRouter(
    prefix="/health",
    tags=["Health Check"]  # This shows up as a group in Swagger
)

@router.get("/ping")
def ping(current_user: dict = Depends(get_current_user)):
    return {"message": "pong", "user": current_user}