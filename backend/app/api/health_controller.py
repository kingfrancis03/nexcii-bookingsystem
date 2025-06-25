from fastapi import APIRouter

router = APIRouter(
    prefix="/health",
    tags=["Health Check"]  # This shows up as a group in Swagger
)

@router.get("/ping")
def ping():
    """
    Simple health check endpoint
    """
    return {"status": "ok", "message": "pong"}
