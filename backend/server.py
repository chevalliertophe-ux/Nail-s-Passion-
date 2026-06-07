from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import uuid
import secrets
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Literal
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Nail's Passion API")
api_router = APIRouter(prefix="/api")

# In-memory admin tokens (simple session store)
ADMIN_TOKENS: set = set()


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


# ============ MODELS ============
class Settings(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: "settings")
    salon_name: str = "Nail's Passion"
    tagline: str = "La beauté est notre passion"
    phone: str = "06 12 34 56 78"
    whatsapp: str = "+33612345678"
    instagram: str = "@nailspassion"
    instagram_url: str = "https://instagram.com/nailspassion"
    address: str = "123 Rue de la Beauté, 75000 Paris, France"
    hours_weekday: str = "Lundi - Samedi : 9h - 19h"
    hours_weekend: str = "Dimanche : Fermé"
    sumup_url: str = "https://book.sumup.com/"
    admin_pin: str = "1234"


class SettingsUpdate(BaseModel):
    salon_name: Optional[str] = None
    tagline: Optional[str] = None
    phone: Optional[str] = None
    whatsapp: Optional[str] = None
    instagram: Optional[str] = None
    instagram_url: Optional[str] = None
    address: Optional[str] = None
    hours_weekday: Optional[str] = None
    hours_weekend: Optional[str] = None
    sumup_url: Optional[str] = None
    admin_pin: Optional[str] = None


class Prestation(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str = ""
    price: float
    category: Literal["ongles", "soins", "extras"] = "ongles"
    icon: str = "sparkles"  # lucide icon name
    order: int = 0


class PrestationCreate(BaseModel):
    title: str
    description: str = ""
    price: float
    category: Literal["ongles", "soins", "extras"] = "ongles"
    icon: str = "sparkles"
    order: int = 0


class GalleryItem(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    image_url: str  # can be URL or base64 data URI
    category: Literal["classiques", "nail-art", "luxury"] = "classiques"
    caption: str = ""
    created_at: str = Field(default_factory=now_iso)


class GalleryCreate(BaseModel):
    image_url: str
    category: Literal["classiques", "nail-art", "luxury"] = "classiques"
    caption: str = ""


class Promotion(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str = ""
    discount: str = ""  # e.g. "-20%"
    active: bool = True
    created_at: str = Field(default_factory=now_iso)


class PromotionCreate(BaseModel):
    title: str
    description: str = ""
    discount: str = ""
    active: bool = True


class Booking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    client_phone: str
    client_email: str = ""
    prestation_id: str = ""
    prestation_title: str = ""
    date: str  # YYYY-MM-DD
    time: str  # HH:MM
    note: str = ""
    status: Literal["pending", "confirmed", "cancelled"] = "pending"
    created_at: str = Field(default_factory=now_iso)


class BookingCreate(BaseModel):
    client_name: str
    client_phone: str
    client_email: str = ""
    prestation_id: str = ""
    prestation_title: str = ""
    date: str
    time: str
    note: str = ""


class PinLogin(BaseModel):
    pin: str


# ============ AUTH HELPER ============
async def require_admin(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing token")
    token = authorization.split(" ", 1)[1]
    if token not in ADMIN_TOKENS:
        raise HTTPException(status_code=401, detail="Invalid token")
    return token


# ============ ROUTES ============
@api_router.get("/")
async def root():
    return {"message": "Nail's Passion API", "status": "ok"}


# ----- SETTINGS -----
@api_router.get("/settings", response_model=Settings)
async def get_settings():
    doc = await db.settings.find_one({"id": "settings"}, {"_id": 0})
    if not doc:
        s = Settings()
        await db.settings.insert_one(s.model_dump())
        return s
    return Settings(**doc)


@api_router.get("/settings/public")
async def get_public_settings():
    """Settings without admin_pin"""
    doc = await db.settings.find_one({"id": "settings"}, {"_id": 0, "admin_pin": 0})
    if not doc:
        s = Settings()
        await db.settings.insert_one(s.model_dump())
        d = s.model_dump()
        d.pop("admin_pin", None)
        return d
    return doc


@api_router.put("/settings", response_model=Settings)
async def update_settings(payload: SettingsUpdate, _=Depends(require_admin)):
    current = await db.settings.find_one({"id": "settings"}, {"_id": 0})
    if not current:
        current = Settings().model_dump()
    updates = {k: v for k, v in payload.model_dump().items() if v is not None}
    current.update(updates)
    await db.settings.update_one(
        {"id": "settings"}, {"$set": current}, upsert=True
    )
    return Settings(**current)


# ----- ADMIN AUTH -----
@api_router.post("/admin/login")
async def admin_login(payload: PinLogin):
    settings_doc = await db.settings.find_one({"id": "settings"}, {"_id": 0})
    pin = settings_doc["admin_pin"] if settings_doc else "1234"
    if payload.pin != pin:
        raise HTTPException(status_code=401, detail="Code PIN incorrect")
    token = secrets.token_urlsafe(32)
    ADMIN_TOKENS.add(token)
    return {"token": token}


@api_router.post("/admin/logout")
async def admin_logout(token: str = Depends(require_admin)):
    ADMIN_TOKENS.discard(token)
    return {"ok": True}


@api_router.get("/admin/me")
async def admin_me(_=Depends(require_admin)):
    return {"ok": True}


# ----- PRESTATIONS -----
@api_router.get("/prestations", response_model=List[Prestation])
async def list_prestations():
    docs = await db.prestations.find({}, {"_id": 0}).sort("order", 1).to_list(500)
    return [Prestation(**d) for d in docs]


@api_router.post("/prestations", response_model=Prestation)
async def create_prestation(payload: PrestationCreate, _=Depends(require_admin)):
    p = Prestation(**payload.model_dump())
    await db.prestations.insert_one(p.model_dump())
    return p


@api_router.put("/prestations/{pid}", response_model=Prestation)
async def update_prestation(pid: str, payload: PrestationCreate, _=Depends(require_admin)):
    updates = payload.model_dump()
    result = await db.prestations.update_one({"id": pid}, {"$set": updates})
    if result.matched_count == 0:
        raise HTTPException(404, "Prestation introuvable")
    doc = await db.prestations.find_one({"id": pid}, {"_id": 0})
    return Prestation(**doc)


@api_router.delete("/prestations/{pid}")
async def delete_prestation(pid: str, _=Depends(require_admin)):
    result = await db.prestations.delete_one({"id": pid})
    if result.deleted_count == 0:
        raise HTTPException(404, "Prestation introuvable")
    return {"ok": True}


# ----- GALLERY -----
@api_router.get("/gallery", response_model=List[GalleryItem])
async def list_gallery():
    docs = await db.gallery.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return [GalleryItem(**d) for d in docs]


@api_router.post("/gallery", response_model=GalleryItem)
async def create_gallery(payload: GalleryCreate, _=Depends(require_admin)):
    g = GalleryItem(**payload.model_dump())
    await db.gallery.insert_one(g.model_dump())
    return g


@api_router.delete("/gallery/{gid}")
async def delete_gallery(gid: str, _=Depends(require_admin)):
    result = await db.gallery.delete_one({"id": gid})
    if result.deleted_count == 0:
        raise HTTPException(404, "Image introuvable")
    return {"ok": True}


# ----- PROMOTIONS -----
@api_router.get("/promotions", response_model=List[Promotion])
async def list_promotions():
    docs = await db.promotions.find({}, {"_id": 0}).sort("created_at", -1).to_list(200)
    return [Promotion(**d) for d in docs]


@api_router.post("/promotions", response_model=Promotion)
async def create_promotion(payload: PromotionCreate, _=Depends(require_admin)):
    p = Promotion(**payload.model_dump())
    await db.promotions.insert_one(p.model_dump())
    return p


@api_router.put("/promotions/{pid}", response_model=Promotion)
async def update_promotion(pid: str, payload: PromotionCreate, _=Depends(require_admin)):
    updates = payload.model_dump()
    result = await db.promotions.update_one({"id": pid}, {"$set": updates})
    if result.matched_count == 0:
        raise HTTPException(404, "Promotion introuvable")
    doc = await db.promotions.find_one({"id": pid}, {"_id": 0})
    return Promotion(**doc)


@api_router.delete("/promotions/{pid}")
async def delete_promotion(pid: str, _=Depends(require_admin)):
    result = await db.promotions.delete_one({"id": pid})
    if result.deleted_count == 0:
        raise HTTPException(404, "Promotion introuvable")
    return {"ok": True}


# ----- BOOKINGS -----
@api_router.post("/bookings", response_model=Booking)
async def create_booking(payload: BookingCreate):
    b = Booking(**payload.model_dump())
    await db.bookings.insert_one(b.model_dump())
    return b


@api_router.get("/bookings", response_model=List[Booking])
async def list_bookings(_=Depends(require_admin)):
    docs = await db.bookings.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return [Booking(**d) for d in docs]


@api_router.put("/bookings/{bid}/status")
async def update_booking_status(bid: str, status: str, _=Depends(require_admin)):
    if status not in ("pending", "confirmed", "cancelled"):
        raise HTTPException(400, "Statut invalide")
    result = await db.bookings.update_one({"id": bid}, {"$set": {"status": status}})
    if result.matched_count == 0:
        raise HTTPException(404, "Réservation introuvable")
    return {"ok": True}


@api_router.delete("/bookings/{bid}")
async def delete_booking(bid: str, _=Depends(require_admin)):
    result = await db.bookings.delete_one({"id": bid})
    if result.deleted_count == 0:
        raise HTTPException(404, "Réservation introuvable")
    return {"ok": True}


# ----- SEED -----
@api_router.post("/seed")
async def seed_data():
    # Settings
    if not await db.settings.find_one({"id": "settings"}):
        await db.settings.insert_one(Settings().model_dump())

    # Prestations
    count = await db.prestations.count_documents({})
    if count == 0:
        default_prestations = [
            {"title": "Pose Gel", "description": "Finition élégante et longue tenue", "price": 25, "category": "ongles", "icon": "sparkles", "order": 1},
            {"title": "Nail Art", "description": "Designs premium & personnalisés", "price": 15, "category": "ongles", "icon": "palette", "order": 2},
            {"title": "Remplissage Gel", "description": "Entretien & renforcement", "price": 20, "category": "ongles", "icon": "refresh-cw", "order": 3},
            {"title": "Manucure Simple", "description": "Soin des mains + vernis", "price": 15, "category": "soins", "icon": "hand", "order": 4},
            {"title": "Gainage", "description": "Renforcement des ongles naturels", "price": 20, "category": "soins", "icon": "shield", "order": 5},
            {"title": "Dépose Gel", "description": "Dépose en douceur", "price": 10, "category": "extras", "icon": "minus-circle", "order": 6},
        ]
        for p in default_prestations:
            await db.prestations.insert_one(Prestation(**p).model_dump())

    # Gallery
    g_count = await db.gallery.count_documents({})
    if g_count == 0:
        default_gallery = [
            {"image_url": "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800", "category": "classiques"},
            {"image_url": "https://images.unsplash.com/photo-1599948128020-9a44505b696d?q=80&w=800", "category": "nail-art"},
            {"image_url": "https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=800", "category": "luxury"},
            {"image_url": "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=800", "category": "classiques"},
            {"image_url": "https://images.unsplash.com/photo-1604902396830-aca29e19b067?q=80&w=800", "category": "nail-art"},
            {"image_url": "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=800", "category": "luxury"},
            {"image_url": "https://images.unsplash.com/photo-1612831819939-2c2bb53e4d8a?q=80&w=800", "category": "nail-art"},
            {"image_url": "https://images.unsplash.com/photo-1632344004241-c1f4d51c0a86?q=80&w=800", "category": "luxury"},
            {"image_url": "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=800", "category": "classiques"},
        ]
        for g in default_gallery:
            await db.gallery.insert_one(GalleryItem(**g).model_dump())

    return {"ok": True, "seeded": True}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def startup_seed():
    try:
        if not await db.settings.find_one({"id": "settings"}):
            await db.settings.insert_one(Settings().model_dump())
        if await db.prestations.count_documents({}) == 0:
            await seed_data()
    except Exception as e:
        logger.error(f"Seed error: {e}")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
