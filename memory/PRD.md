# Nail's Passion — PRD

## Problem Statement
Reprendre projet GitHub Flutter d'application mobile pour salon d'onglerie "Nail's Passion".
Le client a fourni des maquettes avec 7 écrans (luxury dark theme + rose néon + or). Le code GitHub original était basique (5 fichiers Dart, admin non fonctionnel). Choix retenu : **refaire en React PWA mobile-first** identique aux maquettes.

## Tech Stack
- **Frontend**: React 19, Tailwind, React Router, Axios, Lucide icons
- **Backend**: FastAPI + Motor (Mongo async) + Pydantic
- **DB**: MongoDB (auto-seed sur startup)
- **Fonts**: Great Vibes (script), Outfit (body), Playfair Display (italic)

## Personas
- **Cliente** : visite l'app, consulte prestations/galerie, contacte (tel/WhatsApp/Insta), réserve, consulte sa fidélité.
- **Admin (gérante)** : accès caché (5 taps sur logo) + PIN 1234. Gère absolument tout.

## Core Requirements
1. ✅ UI identique aux maquettes (7 écrans + booking + fidélité)
2. ✅ Navigation bottom tab (5 onglets : Accueil, Galerie, Prestations, Contact, Profil)
3. ✅ Admin caché protégé par PIN (5 taps sur le logo "Nail's Passion")
4. ✅ Galerie : upload sans Firebase (base64 ou URL)
5. ✅ Réservations clients validées par admin
6. ✅ Bouton vers agenda SumUp : `https://sumupbookings.com/nails-passion`
7. ✅ Gestion de **toutes les photos** depuis admin (splash, hero, cards, prestations)
8. ✅ Programme fidélité (auto-incrément à chaque RDV confirmé, récompense au seuil)
9. ✅ Changement de thème (sombre / rosé clair)

## Implemented Timeline

### 07/06/2026 — Phase 1 (MVP)
- 7 écrans pixel-proches des maquettes (Splash, Home, Galerie, Prestations, Contact, Admin PIN, Admin Panel)
- Admin panel : infos, prestations CRUD, horaires, promotions CRUD, bookings validation
- Booking interne + bouton SumUp externe
- Backend FastAPI auto-seedé, auth Bearer token
- ✅ Tests : 19/19 backend, 100% frontend

### 07/06/2026 — Phase 2 (Demande utilisateur)
- ✅ **SumUp URL** : `https://sumupbookings.com/nails-passion`
- ✅ **Admin caché** : 5 taps sur "Nail's Passion" → PIN (suppression du bouton cloche, remplacé par 🎁 fidélité)
- ✅ **Gestion images** : nouvelle page `/admin/images` (splash, hero, 2 cards d'accueil) + champ image_url sur chaque prestation (URL ou upload base64)
- ✅ **Programme fidélité** : 
  - Track visites par numéro de téléphone (auto-incrément quand admin confirme un RDV)
  - Page client `/fidelite` (saisie numéro → progress bar + récompense débloquée)
  - Page admin `/admin/loyalty` (config seuil/récompense + top clientes)
- ✅ **Thème** : toggle dark ↔ rosé clair (admin persist en DB, visiteur en localStorage)
- ✅ Tests : 27/27 backend, 100% frontend, aucune régression

## Backlog

### P1
- 📧 **Notifications email** SendGrid : confirmation client quand admin valide
- 🔔 **Badge in-app** sur l'onglet Profil quand bookings en attente
- 📱 **PWA manifest + service worker** pour installation iOS/Android

### P2
- 📅 Date/time picker stylé (remplacer inputs natifs par calendrier shadcn)
- 🔒 PIN hashé bcrypt + JWT signé (sécurité prod)
- 👤 Comptes clients (inscription/connexion pour historique RDV + fidélité auto-liée)
- 📲 Wrap Capacitor → APK Android + bundle iOS
- 🔍 Recherche/filtre dans /admin/loyalty (quand liste grandit)
- 🧹 Gating `GET /api/settings` derrière require_admin (PIN actuellement exposé)

### P3
- 📸 Vraies photos du salon (placeholder Unsplash actuellement)
- ⭐ Avis clientes
- 🎁 Coupons promo générés à la récompense fidélité
- 📊 Dashboard stats admin (CA estimé, RDV par mois, etc.)

## Credentials
- **Admin PIN** : `1234` (modifiable via `/admin/infos`)
- **Accès admin** : 5 taps sur "Nail's Passion" sur l'écran d'accueil

## URLs importantes
- App : https://app-builder-demo-109.preview.emergentagent.com/
- SumUp : https://sumupbookings.com/nails-passion
- Splash : `/welcome` • Accueil : `/` • Fidélité : `/fidelite` • Admin caché : (5 taps logo)
