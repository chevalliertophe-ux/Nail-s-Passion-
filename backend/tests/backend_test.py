"""Backend API tests for Nail's Passion."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://app-builder-demo-109.preview.emergentagent.com").rstrip("/")
# Fallback: read frontend .env if env not set
if not BASE_URL or "BACKEND" in BASE_URL.upper() and "http" not in BASE_URL:
    with open("/app/frontend/.env") as f:
        for line in f:
            if line.startswith("REACT_APP_BACKEND_URL="):
                BASE_URL = line.split("=", 1)[1].strip().rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="session")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="session")
def admin_token(session):
    r = session.post(f"{API}/admin/login", json={"pin": "1234"})
    assert r.status_code == 200, f"Login failed: {r.status_code} {r.text}"
    return r.json()["token"]


@pytest.fixture(scope="session")
def admin_session(admin_token):
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json", "Authorization": f"Bearer {admin_token}"})
    return s


# ---- Public endpoints ----
class TestPublic:
    def test_root(self, session):
        r = session.get(f"{API}/")
        assert r.status_code == 200
        assert r.json().get("status") == "ok"

    def test_public_settings_no_pin(self, session):
        r = session.get(f"{API}/settings/public")
        assert r.status_code == 200
        data = r.json()
        assert "admin_pin" not in data
        assert "salon_name" in data

    def test_prestations_seeded(self, session):
        r = session.get(f"{API}/prestations")
        assert r.status_code == 200
        data = r.json()
        assert len(data) >= 6
        titles = {d["title"]: d["price"] for d in data}
        expected = {"Pose Gel": 25, "Nail Art": 15, "Remplissage Gel": 20,
                    "Manucure Simple": 15, "Gainage": 20, "Dépose Gel": 10}
        for t, price in expected.items():
            assert t in titles, f"Missing prestation {t}"
            assert titles[t] == price

    def test_gallery_seeded(self, session):
        r = session.get(f"{API}/gallery")
        assert r.status_code == 200
        assert len(r.json()) >= 9


# ---- Admin auth ----
class TestAdminAuth:
    def test_login_correct_pin(self, session):
        r = session.post(f"{API}/admin/login", json={"pin": "1234"})
        assert r.status_code == 200
        assert isinstance(r.json()["token"], str)

    def test_login_wrong_pin(self, session):
        r = session.post(f"{API}/admin/login", json={"pin": "9999"})
        assert r.status_code == 401

    def test_me_without_token(self, session):
        r = session.get(f"{API}/admin/me")
        assert r.status_code == 401

    def test_me_with_token(self, admin_session):
        r = admin_session.get(f"{API}/admin/me")
        assert r.status_code == 200
        assert r.json().get("ok") is True


# ---- Settings update ----
class TestSettings:
    def test_update_settings(self, admin_session, session):
        new_phone = "06 99 99 99 99"
        new_insta = "@test_insta_TEST"
        r = admin_session.put(f"{API}/settings", json={"phone": new_phone, "instagram": new_insta})
        assert r.status_code == 200
        data = r.json()
        assert data["phone"] == new_phone
        assert data["instagram"] == new_insta
        # Verify via GET
        r2 = session.get(f"{API}/settings/public")
        assert r2.json()["phone"] == new_phone

    def test_update_settings_no_auth(self, session):
        r = session.put(f"{API}/settings", json={"phone": "x"})
        assert r.status_code == 401


# ---- Prestations CRUD ----
class TestPrestations:
    def test_crud(self, admin_session, session):
        # Create
        payload = {"title": "TEST_Prestation", "description": "test", "price": 99.0,
                   "category": "extras", "icon": "sparkles", "order": 99}
        r = admin_session.post(f"{API}/prestations", json=payload)
        assert r.status_code == 200
        pid = r.json()["id"]
        assert r.json()["title"] == "TEST_Prestation"

        # Verify in GET
        r = session.get(f"{API}/prestations")
        assert any(p["id"] == pid for p in r.json())

        # Update
        update = {"title": "TEST_Updated", "description": "u", "price": 50.0,
                  "category": "extras", "icon": "sparkles", "order": 99}
        r = admin_session.put(f"{API}/prestations/{pid}", json=update)
        assert r.status_code == 200
        assert r.json()["title"] == "TEST_Updated"
        assert r.json()["price"] == 50.0

        # Delete
        r = admin_session.delete(f"{API}/prestations/{pid}")
        assert r.status_code == 200

        # Verify deleted
        r = session.get(f"{API}/prestations")
        assert not any(p["id"] == pid for p in r.json())

    def test_create_no_auth(self, session):
        r = session.post(f"{API}/prestations", json={"title": "x", "price": 1})
        assert r.status_code == 401


# ---- Gallery CRUD ----
class TestGallery:
    def test_crud(self, admin_session, session):
        payload = {"image_url": "https://example.com/TEST.jpg", "category": "luxury", "caption": "TEST"}
        r = admin_session.post(f"{API}/gallery", json=payload)
        assert r.status_code == 200
        gid = r.json()["id"]
        assert r.json()["image_url"] == payload["image_url"]

        r = session.get(f"{API}/gallery")
        assert any(g["id"] == gid for g in r.json())

        r = admin_session.delete(f"{API}/gallery/{gid}")
        assert r.status_code == 200


# ---- Promotions CRUD ----
class TestPromotions:
    def test_crud(self, admin_session):
        payload = {"title": "TEST_Promo", "description": "d", "discount": "-20%", "active": True}
        r = admin_session.post(f"{API}/promotions", json=payload)
        assert r.status_code == 200
        pid = r.json()["id"]

        update = {"title": "TEST_Promo2", "description": "d", "discount": "-30%", "active": False}
        r = admin_session.put(f"{API}/promotions/{pid}", json=update)
        assert r.status_code == 200
        assert r.json()["discount"] == "-30%"

        r = admin_session.delete(f"{API}/promotions/{pid}")
        assert r.status_code == 200


# ---- Bookings ----
class TestBookings:
    def test_create_no_auth(self, session):
        payload = {"client_name": "TEST_Client", "client_phone": "0600000000",
                   "prestation_id": "p1", "prestation_title": "Pose Gel",
                   "date": "2026-02-01", "time": "10:00"}
        r = session.post(f"{API}/bookings", json=payload)
        assert r.status_code == 200
        data = r.json()
        assert data["client_name"] == "TEST_Client"
        assert data["status"] == "pending"
        return data["id"]

    def test_list_requires_auth(self, session):
        r = session.get(f"{API}/bookings")
        assert r.status_code == 401

    def test_list_with_auth(self, admin_session):
        r = admin_session.get(f"{API}/bookings")
        assert r.status_code == 200
        assert isinstance(r.json(), list)

    def test_status_update(self, admin_session, session):
        # Create one
        r = session.post(f"{API}/bookings", json={
            "client_name": "TEST_StatusUpdate", "client_phone": "0611111111",
            "prestation_title": "Nail Art", "date": "2026-02-02", "time": "11:00"})
        assert r.status_code == 200
        bid = r.json()["id"]

        # Update status
        r = admin_session.put(f"{API}/bookings/{bid}/status", params={"status": "confirmed"})
        assert r.status_code == 200

        # Verify
        r = admin_session.get(f"{API}/bookings")
        booking = next((b for b in r.json() if b["id"] == bid), None)
        assert booking is not None
        assert booking["status"] == "confirmed"

        # Cleanup
        admin_session.delete(f"{API}/bookings/{bid}")

    def test_status_invalid(self, admin_session, session):
        r = session.post(f"{API}/bookings", json={
            "client_name": "TEST_X", "client_phone": "06", "date": "2026-02-03", "time": "12:00"})
        bid = r.json()["id"]
        r = admin_session.put(f"{API}/bookings/{bid}/status", params={"status": "invalid"})
        assert r.status_code == 400
        admin_session.delete(f"{API}/bookings/{bid}")
