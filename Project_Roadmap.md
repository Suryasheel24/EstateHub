# EstateHub — Project Roadmap & Memory

## Project Overview
- **Name:** EstateHub
- **Platform:** B2C Real Estate Property Discovery & Booking Platform
- **Core User Flow:** HOME → SEARCH → RESULTS → PROPERTY DETAILS → CHECKOUT → REVIEW → CONFIRMATION
- **Stack:** Angular (Standalone), TypeScript, SCSS, Bootstrap 5, Reactive Forms, RxJS

---

## Status Dashboard
- **CURRENT PHASE:** Milestone 6 Complete — Full MVP Flow Operational
- **CURRENT TASK:** Smoke Testing & Handover
- **LAST COMPLETED:** Milestone 6 deliverables (BookingStateService, BookingStepperComponent, Checkout, Review, Confirmation views) & End-to-end booking state
- **NEXT TASK:** Phase 17/18 Polish & Smoke Testing
- **BLOCKERS:** None

---

## Milestone Progress
- [x] **M1: Foundation & Models** (Routes, SCSS tokens, Models, PropertyService mock)
- [x] **M2: Design System & Shared Components** (Navbar, Footer, Form elements, PropertyCard)
- [x] **M3: Home Page & Discovery** (Hero, SearchController with query param dispatch)
- [x] **M4: Property Results & Filters** (/properties with query params, sorting, filtering, pagination)
- [x] **M5: Property Details** (/property/:id with gallery, specs, amenities, Book Now CTA)
- [x] **M6: Booking Pipeline** (/checkout/:id, /review/:id, /confirmation/:id + BookingStateService)
- [x] **M7: UI/UX Overhaul & Micro-Animations** (Glassmorphism, High-contrast dark hero, Luxury typography stack, High-res architectural assets)
- [x] **M8: Aesthetic Repair & Grid Stabilization** (Calm neutral palette, Teal accents, Grid layout fixes, Header/Footer synchronization)
- [x] **M9: BookingGo Visual Design Sync** (Amber accents, Mint-Sage backgrounds, 4:5 vertical destination cards, overlay navbar)

---

## Architecture & Conventions
1. **Components:** Standalone components with standard input/output signals where suitable.
2. **State Management:** Service-with-Subject pattern (`BookingStateService`) for lightweight state retention across the booking funnel, backed by `sessionStorage`.
3. **Data Flow:** Typed models strictly enforced. Currency localized to INR (₹) formatting.
4. **URL Routing:** RESTful, parameter-driven routes for filterable states.

## Important Architectural & UI Decisions
- **Typography:** `Plus Jakarta Sans` for display headers, `Inter` for body text, and `JetBrains Mono` for code snippets.
- **Design System:** Centralized `_theme.scss` tokens for colors (Navy/Amber), radii, and elevation shadows.
- **Micro-Animations:** Implemented in `_animations.scss` with `.eh-property-card` (elevation/zoom), `.eh-segmented-switch`, and `.eh-input-field` (glow focus rings) globally wired via `@extend`.
