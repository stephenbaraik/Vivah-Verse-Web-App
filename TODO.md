# File Structure Refactoring TODO

## Phase 1: Create Directory Structure
- [x] Create src/ directory
- [x] Create src/components/ subdirectories (common, layout, auth, booking, dashboard, planning, vendor, blog, landing, tools)
- [x] Create src/hooks/
- [x] Create src/contexts/
- [x] Create src/utils/
- [x] Create src/assets/
- [x] Create src/styles/
- [x] Create src/types/
- [x] Create src/constants/

## Phase 2: Move Core Files
- [x] Move types.ts → src/types/index.ts
- [x] Move constants.ts → src/constants/index.ts
- [x] Move blogData.ts → src/constants/blogData.ts
- [x] Move index.tsx → src/main.tsx
- [x] Move App.tsx → src/App.tsx

## Phase 3: Organize Components
- [x] Move src/components/common/ (GlassCard)
- [x] Move src/components/layout/ (Navbar, Footer)
- [x] Move src/components/auth/ (AuthScreen)
- [x] Move src/components/booking/ (VenueList, VenueDetails, BookingSuccess, PaymentScreen)
- [x] Move src/components/dashboard/ (Dashboard, GuestManager, BudgetTracker, WeddingChecklist)
- [x] Move src/components/planning/ (AIOnboarding, WeddingPlannerAI, PackageSelection, EmiCalculator)
- [x] Move src/components/vendor/ (VendorForm, VendorDashboard, VendorServiceList)
- [x] Move src/components/blog/ (Blog, BlogPost)
- [x] Move src/components/landing/ (Hero, AboutUs, ContactUs, Team, Problem, Solution, BusinessModel, Sustainability, TargetAudience, CurrentStage)
- [x] Move src/components/tools/ (ShagunWallet, CrisisControl, LegalAid, InspirationBoard, MicroServices)

## Phase 4: Update Import Paths
- [x] Update all component imports
- [x] Update App.tsx imports
- [x] Update main.tsx imports
- [x] Update service imports

## Phase 5: Cleanup Root
- [x] Verify root-level files
- [x] Update index.html entry point
- [x] Test build

## ✅ COMPLETED
- Build successful: dist/index.html (5.78 kB), dist/assets/index-*.js (372.43 kB)

