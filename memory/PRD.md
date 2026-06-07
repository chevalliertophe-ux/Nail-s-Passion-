# Nail's Passion — PRD

## Problem Statement
Reprendre projet GitHub Flutter d'application mobile pour salon d'onglerie "Nail's Passion".
Le client a fourni des maquettes avec 7 écrans (luxury dark theme + rose néon + or). Le projet GitHub original était en Flutter mais incomplet. Choix retenu : **refaire en React PWA mobile-first** identique aux maquettes pour avoir un preview live et une livraison rapide.

## Tech Stack
- **Frontend**: React 19, Tailwind, React Router, Axios, Lucide icons
- **Backend**: FastAPI + Motor (Mongo async) + Pydantic
- **DB**: MongoDB (auto-seed sur startup)
- **Fonts**: Great Vibes (script), Outfit (body), Playfair Display (italic)

## Personas
- **Cliente** : visite l'app, consulte prestations/galerie, contacte (tel/WhatsApp/Insta), réserve un RDV.
- **Admin (gérante)** : entre via PIN 1234, gère infos, prestations, galerie, horaires, promotions, valide les RDV.

## Core Requirements
1. UI identique aux maquettes (7 écrans + booking)
2. Navigation bottom tab (5 onglets)
3. Admin protégé par PIN
4. Galerie : upload sans Firebase (base64 dans Mongo OU URL)
5. Réservations clients validées par admin
6. Bouton externe vers agenda SumUp

## Implemented (07/06/2026)
### Frontend (React PWA)
- ✅ `/welcome` — Splash screen avec logo & CTAs
- ✅ `/` — Home (Bienvenue, hero circulaire, quick icons, services)
- ✅ `/galerie` — Grid 3 colonnes + filtres + upload admin (URL/base64)
- ✅ `/prestations` — Liste avec filtres (Toutes/Ongles/Soins/Extras)
- ✅ `/contact` — Tel / WhatsApp / Instagram / Adresse / Horaires (deep links natifs)
- ✅ `/profil` — Profil + accès admin
- ✅ `/admin` — Pavé PIN 4 chiffres
- ✅ `/admin/panel` — Menu principal admin
- ✅ `/admin/infos` — Édition infos & PIN
- ✅ `/admin/prestations` — CRUD prestations (modal)
- ✅ `/admin/horaires` — Édition horaires
- ✅ `/admin/promotions` — CRUD promotions
- ✅ `/admin/bookings` — Validation/annulation RDV (3 onglets pending/confirmed/cancelled)
- ✅ `/reserver` — Formulaire réservation client + bouton SumUp externe

### Backend (FastAPI)
- ✅ Auth admin PIN → token Bearer (in-memory)
- ✅ CRUD complet : `settings`, `prestations`, `gallery`, `promotions`, `bookings`
- ✅ Auto-seed (6 prestations, 9 photos galerie) au démarrage
- ✅ Endpoint public `/api/settings/public` (sans PIN)
- ✅ Réservation publique (sans auth) + validation admin

### Tests
- ✅ 19/19 tests pytest backend
- ✅ Tous les 7 écrans validés par testing agent

## Backlog (Phase 2)
- **P1 — Notifications email** via SendGrid (confirmation au client quand admin valide RDV)
- **P1 — Notifications in-app** (badge sur tab "Profil" pour bookings en attente)
- **P2 — Comptes clients** (inscription/connexion pour historique RDV)
- **P2 — Date/time picker stylé** (remplacer input natifs par calendrier shadcn dark+pink)
- **P2 — JWT signé** + PIN hashé bcrypt (sécurité production)
- **P2 — Manifest PWA + service worker** pour installation sur écran d'accueil
- **P2 — Wrap Capacitor** pour APK Android + iOS App Store
- **P3 — Vraies photos** : remplacer images stock par photos du salon (via admin upload)
- **P3 — Avis clients** sur les prestations
- **P3 — Programme fidélité** (carte de tampons digitale)

## Notes
- Admin PIN par défaut : **1234** (modifiable via `/admin/infos`)
- SumUp URL : placeholder (`https://book.sumup.com/`), à remplacer par la vraie URL du salon
- Coordonnées : placeholders (06 12 34 56 78, @nailspassion, etc.) — à mettre à jour
