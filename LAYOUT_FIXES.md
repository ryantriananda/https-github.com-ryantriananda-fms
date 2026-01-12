# Layout Fixes - Full Page Form Implementation

## 🎯 Problem Statement

When converting modals to full-page forms, the layout needs to hide the Sidebar and TopBar to provide a true full-screen experience (similar to standalone form pages).

## ✅ Solution: Full Page Form Pattern

### Implementation Steps

#### 1. Create Page Component (instead of Modal)

```typescript
// pages/VehicleFormPage.tsx
interface VehicleFormPageProps {
  onBack: () => void;
  onSave: (data: Partial<VehicleRecord>) => void;
  initialData?: VehicleRecord;
  mode: 'create' | 'edit' | 'view';
  // ... other props
}

export const VehicleFormPage = (props: VehicleFormPageProps) => {
  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Own header with back button */}
      <header>...</header>
      
      {/* Form content */}
      <main className="flex-1 overflow-y-auto">
        {/* Tabs, forms, etc */}
      </main>
    </div>
  );
};
```

#### 2. Add Page Mode State to App.tsx

```typescript
// State for controlling page/list mode
const [vehiclePageMode, setVehiclePageMode] = useState<'list' | 'form'>('list');
const [selectedVehicleData, setSelectedVehicleData] = useState<VehicleRecord | null>(null);
const [vehicleFormMode, setVehicleFormMode] = useState<'create' | 'edit' | 'view'>('create');
```

#### 3. Add Handler Functions

```typescript
const handleOpenVehicleForm = (mode: 'create' | 'edit' | 'view', data?: VehicleRecord) => {
  console.log('🚗 Opening Vehicle Form:', mode);
  setVehicleFormMode(mode);
  setSelectedVehicleData(data || null);
  setVehiclePageMode('form');
  console.log('🚗 Vehicle Page Mode set to: form');
};

const handleCloseVehicleForm = () => {
  console.log('🚗 Closing Vehicle Form');
  setVehiclePageMode('list');
  setSelectedVehicleData(null);
};

const handleSaveVehicle = (data: Partial<VehicleRecord>) => {
  console.log('💾 Saving Vehicle:', data);
  // Save logic here
  handleCloseVehicleForm();
};
```

#### 4. Update Route Case with Mode Switching

```typescript
case 'Daftar Kendaraan':
  // Check if in form mode
  if (vehiclePageMode === 'form') {
    return (
      <VehicleFormPage 
        onBack={handleCloseVehicleForm}
        onSave={handleSaveVehicle}
        initialData={selectedVehicleData || undefined}
        mode={vehicleFormMode}
        // ... other props
      />
    );
  }

  // Otherwise show list
  return (
    <>
      <FilterBar 
        onAddClick={() => handleOpenVehicleForm('create')} 
        customAddLabel="Request Vehicle"
      />
      <VehicleTable 
        data={vehicles} 
        onView={(i) => handleOpenVehicleForm('view', i)} 
        onEdit={(i) => handleOpenVehicleForm('edit', i)} 
      />
    </>
  );
```

#### 5. **CRITICAL**: Hide Sidebar and TopBar

```typescript
// In main App return statement:

return (
  <div className="flex h-screen bg-[#FBFBFB] font-sans text-black overflow-hidden">
    {/* ⚠️ CONDITIONAL SIDEBAR - Hide when in form mode */}
    {buildingPageMode !== 'form' && vehiclePageMode !== 'form' && (
      <Sidebar 
        activeItem={activeItem} 
        onNavigate={handleNavigate} 
        // ... other props
      />
    )}
    
    {/* ⚠️ CONDITIONAL MARGIN - Remove when in form mode */}
    <div className={`flex-1 flex flex-col transition-all duration-300 ${
      buildingPageMode === 'form' || vehiclePageMode === 'form' 
        ? '' 
        : isSidebarCollapsed ? 'lg:ml-[90px]' : 'lg:ml-[280px]'
    }`}>
      
      {/* ⚠️ CONDITIONAL TOPBAR - Hide when in form mode */}
      {buildingPageMode !== 'form' && vehiclePageMode !== 'form' && (
        <TopBar 
          breadcrumbs={['Home', activeItem]} 
          // ... other props
        />
      )}
      
      {/* ⚠️ CONDITIONAL PADDING - Remove when in form mode */}
      <main className={`flex-1 flex flex-col ${
        buildingPageMode === 'form' || vehiclePageMode === 'form' 
          ? 'p-0 overflow-hidden' 
          : 'p-8 overflow-y-auto custom-scrollbar'
      }`}>
        {renderContent()}
      </main>
    </div>
  </div>
);
```

## 🔍 Key Points

### ✅ DO's
- **Always** check page mode in conditional rendering
- **Hide** Sidebar when `pageMode === 'form'`
- **Hide** TopBar when `pageMode === 'form'`
- **Remove** main container padding when `pageMode === 'form'`
- **Remove** margin-left when `pageMode === 'form'`
- Add console logs for debugging state changes

### ❌ DON'Ts
- Don't render form page inside `renderContent()` without mode check
- Don't forget to update ALL three conditionals (Sidebar, TopBar, main)
- Don't keep modal component if converting to full page
- Don't use modal state management for page forms

## 🔄 Migration Checklist

Converting existing modal to full page form:

- [ ] Create new page component in `pages/` folder
- [ ] Add `pageMode` state variable
- [ ] Add `selectedData` state variable
- [ ] Add `formMode` state variable
- [ ] Create handler functions (open, close, save)
- [ ] Update route case with mode switching
- [ ] Add page mode check to Sidebar conditional
- [ ] Add page mode check to TopBar conditional
- [ ] Add page mode check to main padding conditional
- [ ] Add page mode check to container margin conditional
- [ ] Remove old modal component
- [ ] Test: Click "Add" button → Full page appears
- [ ] Test: Click "Back" → Returns to list
- [ ] Test: Sidebar hidden when form open
- [ ] Test: TopBar hidden when form open

## 📝 Example: Complete Working Implementation

See `VehicleFormPage` and `BuildingFormPage` for reference implementations.

### Files Changed
- `pages/VehicleFormPage.tsx` - Created
- `App.tsx` - Updated (lines 242-244, 305-324, 1006-1039, 1462-1485)

### Git History
```bash
git log --oneline --grep="VehicleFormPage"
```

## 🐛 Common Issues

### Issue: Form still shows in modal
**Cause**: Old modal component still rendered in App.tsx  
**Fix**: Remove or comment out modal component

### Issue: Sidebar still visible
**Cause**: Forgot to add page mode check to Sidebar conditional  
**Fix**: Wrap Sidebar in conditional: `{pageMode !== 'form' && <Sidebar />}`

### Issue: TopBar still visible
**Cause**: Forgot to add page mode check to TopBar conditional  
**Fix**: Wrap TopBar in conditional: `{pageMode !== 'form' && <TopBar />}`

### Issue: Padding around form
**Cause**: Main container still has padding  
**Fix**: Update main className: `${pageMode === 'form' ? 'p-0' : 'p-8'}`

### Issue: Form not full width
**Cause**: Container still has margin-left from sidebar  
**Fix**: Update container className: `${pageMode === 'form' ? '' : 'lg:ml-[280px]'}`

---

## ✅ Verification

After implementing:
1. Click "Add" button
2. Verify NO Sidebar visible
3. Verify NO TopBar visible
4. Verify NO padding around form
5. Verify form is full screen
6. Click "Back" button
7. Verify Sidebar returns
8. Verify TopBar returns
9. Verify list view displays correctly

---

*Last Updated: January 2026*
*Tested with: Vehicle Module, Building Module*
