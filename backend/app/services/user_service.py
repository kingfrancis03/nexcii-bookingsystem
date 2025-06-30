from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user_schema import UserCreate, UserLogin
from app.utils.security import hash_password, verify_password, create_access_token
from fastapi import HTTPException, status

class UserService:
    def __init__(self, db: Session):
        self.db = db

    def register(self, user: UserCreate):
        if self.db.query(User).filter(User.username == user.username).first():
            raise HTTPException(status_code=400, detail="Username already exists")

        new_user = User(
            username=user.username,
            name=user.name,
            password=hash_password(user.password),
        )
        self.db.add(new_user)
        self.db.commit()
        self.db.refresh(new_user)

        return new_user

    def login(self, credentials: UserLogin):
        user = self.db.query(User).filter(User.username == credentials.username).first()
        if not user or not verify_password(credentials.password, user.password):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        token = create_access_token({
            "sub": str(user.id),
            "role": str(user.role),
            "username": str(user.username),
            "name": str(user.username),
            })

        return {"access_token": token, "token_type": "bearer"}

    def logout(self):
        # For JWT, logout is typically handled on the client (token discard).
        return {"message": "Logged out (client-side token discard)"}

    def get_all_users(self):
        return self.db.query(User).all()
