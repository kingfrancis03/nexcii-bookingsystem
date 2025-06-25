from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.user_schema import UserCreate, UserLogin, Token, UserOut
from app.services.user_service import UserService

router = APIRouter(prefix="/users", tags=["Users"])


class UserController:
    def __init__(self):
        pass

    def get_all_users(self, db: Session = Depends(get_db)) -> list[UserOut]:
        return UserService(db).get_all_users()

    def register(self, user: UserCreate, db: Session = Depends(get_db)) -> UserOut:
        return UserService(db).register(user)

    def login(self, credentials: UserLogin, db: Session = Depends(get_db)) -> Token:
        return UserService(db).login(credentials)

    def logout(self):
        return {"message": "Logged out successfully"}


controller = UserController()

router.add_api_route("/", controller.get_all_users, methods=["GET"], response_model=list[UserOut])
router.add_api_route("/register", controller.register, methods=["POST"], response_model=UserOut)
router.add_api_route("/login", controller.login, methods=["POST"], response_model=Token)
router.add_api_route("/logout", controller.logout, methods=["POST"])
