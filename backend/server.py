import logging
import os
import secrets
from datetime import datetime, timezone
from pathlib import Path
from typing import Annotated, List, Optional

from bson import ObjectId
from dotenv import load_dotenv
from fastapi import APIRouter, FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, BeforeValidator, ConfigDict, EmailStr, Field
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI(title="Aureon Architecture & Builders API")
api_router = APIRouter(prefix="/api")

PyObjectId = Annotated[str, BeforeValidator(str)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: PyObjectId = Field(default_factory=lambda: str(ObjectId()), alias="_id")

    def to_mongo(self) -> dict:
        doc = self.model_dump(by_alias=True)
        doc["_id"] = ObjectId(doc["_id"])
        return doc

    @classmethod
    def from_mongo(cls, doc: dict):
        if doc and "_id" in doc:
            doc["_id"] = str(doc["_id"])
        return cls(**doc)


class EnquiryCreate(BaseModel):
    full_name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=6, max_length=30)
    sector: str
    services: List[str] = Field(default_factory=list)
    budget: Optional[str] = None
    timeline: Optional[str] = None
    location: str = Field(min_length=2, max_length=200)
    message: str = Field(min_length=10, max_length=2000)


class Enquiry(BaseDocument):
    reference_id: str
    full_name: str
    email: EmailStr
    phone: str
    sector: str
    services: List[str] = Field(default_factory=list)
    budget: Optional[str] = None
    timeline: Optional[str] = None
    location: str
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


@api_router.get("/health")
async def health():
    return {"status": "ok", "service": "aureon-api"}


@api_router.post("/enquiries", status_code=201)
async def create_enquiry(payload: EnquiryCreate):
    reference_id = f"AUR-{datetime.now(timezone.utc).year}-{secrets.randbelow(9000) + 1000}"
    enquiry = Enquiry(reference_id=reference_id, **payload.model_dump())
    await db.enquiries.insert_one(enquiry.to_mongo())
    return {
        "message": "Enquiry received. Our team will respond within one business day.",
        "reference_id": enquiry.reference_id,
        "full_name": enquiry.full_name,
        "sector": enquiry.sector,
        "created_at": enquiry.created_at,
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
