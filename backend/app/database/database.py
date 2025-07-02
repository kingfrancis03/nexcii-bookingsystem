from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from app.core.config import get_settings

settings = get_settings()
print("DEBUG: DATABASE_URL =", settings.DATABASE_URL)

# ✅ Use synchronous engine
engine = create_engine(settings.DATABASE_URL, echo=True)

# ✅ Standard sessionmaker
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

# ✅ Base class for models
class Base(DeclarativeBase):
    pass

# ✅ Dependency for FastAPI routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
