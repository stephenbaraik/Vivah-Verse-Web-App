# TODO - Remove Unused Components

## Task: Remove extra components that aren't in use on the web app

### Unused Components Removed:
1. [x] Remove `src/components/planning/WeddingManager.tsx`
2. [x] Remove `src/components/planning/PackageComparison.tsx`
3. [x] Remove `src/components/tools/EmiCalculatorWidget.tsx`
4. [x] Update App.tsx to remove unused imports and add inline VendorServiceList
5. [x] Clean up AppView enum in types/index.ts (removed VENDOR_PORTAL and VENDOR_DASHBOARD)
6. [x] Build verification - Success

### Summary:
- Removed 3 unused component files (~17.6KB of unused code)
- Fixed missing vendor components by inlining VendorServiceList
- Removed unused Team import from App.tsx (was only used in AboutUs.tsx)
- Removed unused VENDOR_PORTAL and VENDOR_DASHBOARD from AppView enum
- Build completed successfully with 1737 modules transformed

### Status:
- [x] Started
- [x] Components removed
- [x] App.tsx updated
- [x] Types cleaned up
- [x] Build verified
- [x] Completed
