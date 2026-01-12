# MODENA FMS - Architecture Documentation

## 📐 Project Structure

```
modena-fms-ui/
├── components/          # Reusable UI components (Modals, Tables, Forms)
├── config/             # Configuration files (API endpoints, constants)
├── contexts/           # React Context providers for state management
├── layouts/            # Layout components (MainLayout, AuthLayout)
├── pages/              # Full page components (BuildingFormPage, VehicleFormPage)
├── routes/             # Route definitions and navigation config
├── App.tsx             # Main application component
├── constants.ts        # Global constants and mock data
├── types.ts            # TypeScript type definitions
└── index.tsx           # Application entry point
```

## 🏗️ Architecture Overview

### Component Hierarchy

1. **App.tsx** - Root component with state management and routing
2. **Layouts** - Reusable layout wrappers (Sidebar, TopBar)
3. **Pages** - Full page views with complex logic
4. **Components** - Smaller, reusable UI pieces

### State Management Strategy

- **Local State**: React useState for component-specific state
- **Lifted State**: Props drilling for parent-child communication
- **Context API**: For deeply nested component trees (future enhancement)

### Routing Pattern

Currently using **state-based routing**:
- `activeItem` state determines which view to render
- `handleNavigate()` function switches between views
- Full page forms use mode switching (e.g., `vehiclePageMode: 'list' | 'form'`)

### Module Structure

Each business module follows this pattern:
```
Module (e.g., Vehicle, Building, Asset)
├── List View (Table + FilterBar)
├── Form View (Full Page or Modal)
├── Detail View (View mode)
└── Sub-modules (Contracts, Services, etc.)
```

## 🎨 Design Patterns

### Full Page Forms

Components like `VehicleFormPage` and `BuildingFormPage`:
- Hide Sidebar and TopBar when active
- Remove main container padding
- Provide own navigation (Back button)
- Manage internal tab switching

### Modal Forms

Traditional modals for quick edits:
- Overlay on current view
- Smaller, focused forms
- Used for sub-entities (contracts, services)

### Data Flow

```
User Action → Handler Function → State Update → UI Re-render
```

Example:
```typescript
handleOpenVehicleForm('create') 
  → setVehiclePageMode('form')
  → VehicleFormPage renders full screen
```

## 📦 Tech Stack

- **React 19.2.3** - UI framework
- **TypeScript** - Type safety
- **Vite 6.4.1** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 🔄 Future Enhancements

- [ ] Implement React Router for proper routing
- [ ] Add Context API for global state
- [ ] Separate API layer (services/)
- [ ] Add unit tests (tests/)
- [ ] Implement error boundaries
- [ ] Add loading states and skeletons

## 📝 Conventions

### Naming
- **Components**: PascalCase (e.g., `VehicleFormPage.tsx`)
- **Functions**: camelCase (e.g., `handleSaveVehicle`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MOCK_VEHICLE_DATA`)
- **Types**: PascalCase (e.g., `VehicleRecord`)

### File Organization
- One component per file
- Co-locate related types with components
- Keep mock data in `constants.ts`
- Use barrel exports (`index.ts`) when needed

---

*Last Updated: January 2026*
