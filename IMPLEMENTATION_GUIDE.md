# MODENA FMS - Implementation Guide

## 🚀 Getting Started

### Prerequisites
```bash
Node.js >= 18.x
npm >= 9.x
```

### Installation
```bash
# Clone repository
git clone <repository-url>
cd modena-fms-ui

# Install dependencies
npm install

# Run development server
npm run dev
```

### Environment Setup
Create `.env` file:
```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=MODENA FMS
```

## 📋 Implementation Checklist

### Adding a New Module

#### 1. Define Types
```typescript
// types.ts
export interface NewModuleRecord {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  // ... other fields
}
```

#### 2. Create Mock Data
```typescript
// constants.ts
export const MOCK_NEW_MODULE_DATA: NewModuleRecord[] = [
  { id: '1', name: 'Sample', status: 'Active', createdAt: '2026-01-01' }
];
```

#### 3. Create Table Component
```typescript
// components/NewModuleTable.tsx
interface Props {
  data: NewModuleRecord[];
  onView?: (item: NewModuleRecord) => void;
  onEdit?: (item: NewModuleRecord) => void;
  onDelete?: (id: string) => void;
}

export const NewModuleTable = ({ data, onView, onEdit, onDelete }: Props) => {
  // Table implementation
};
```

#### 4. Create Modal/Form Component
```typescript
// components/NewModuleModal.tsx
interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<NewModuleRecord>) => void;
  initialData?: NewModuleRecord;
  mode: 'create' | 'edit' | 'view';
}

export const NewModuleModal = ({ isOpen, onClose, onSave, initialData, mode }: Props) => {
  // Modal implementation
};
```

#### 5. Add to App.tsx

**a. Add State**
```typescript
const [newModuleData, setNewModuleData] = useState<NewModuleRecord[]>(MOCK_NEW_MODULE_DATA);
```

**b. Add to Sidebar Menu**
```typescript
// Update MENU_ITEMS or navigation array
```

**c. Add Route Case**
```typescript
case 'New Module':
  return (
    <>
      <FilterBar 
        tabs={['SEMUA', 'ACTIVE', 'INACTIVE']} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onAddClick={() => openModal('NEW_MODULE', 'create')} 
        customAddLabel="Add New"
      />
      <NewModuleTable 
        data={newModuleData} 
        onView={(i) => openModal('NEW_MODULE', 'view', i)} 
        onEdit={(i) => openModal('NEW_MODULE', 'edit', i)} 
      />
    </>
  );
```

**d. Add Modal**
```typescript
<NewModuleModal 
  isOpen={modalState.isOpen && modalState.type === 'NEW_MODULE'} 
  onClose={closeModal} 
  onSave={() => closeModal()} 
  initialData={modalState.data} 
  mode={modalState.mode as any} 
/>
```

### Converting Modal to Full Page

#### 1. Create Page Component
```typescript
// pages/NewModuleFormPage.tsx
interface Props {
  onBack: () => void;
  onSave: (data: Partial<NewModuleRecord>) => void;
  initialData?: NewModuleRecord;
  mode: 'create' | 'edit' | 'view';
}

export const NewModuleFormPage = ({ onBack, onSave, initialData, mode }: Props) => {
  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="px-8 py-6 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold">
            {mode === 'create' ? 'New Record' : mode === 'edit' ? 'Edit Record' : 'View Record'}
          </h1>
          <button onClick={() => onSave(formData)} className="btn-primary">
            Save
          </button>
        </div>
      </div>
      
      {/* Form Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Your form fields */}
      </div>
    </div>
  );
};
```

#### 2. Add Page State to App.tsx
```typescript
const [newModulePageMode, setNewModulePageMode] = useState<'list' | 'form'>('list');
const [selectedNewModuleData, setSelectedNewModuleData] = useState<NewModuleRecord | null>(null);
const [newModuleFormMode, setNewModuleFormMode] = useState<'create' | 'edit' | 'view'>('create');
```

#### 3. Add Handlers
```typescript
const handleOpenNewModuleForm = (mode: 'create' | 'edit' | 'view', data?: NewModuleRecord) => {
  setNewModuleFormMode(mode);
  setSelectedNewModuleData(data || null);
  setNewModulePageMode('form');
};

const handleCloseNewModuleForm = () => {
  setNewModulePageMode('list');
  setSelectedNewModuleData(null);
};

const handleSaveNewModule = (data: Partial<NewModuleRecord>) => {
  // Save logic
  handleCloseNewModuleForm();
};
```

#### 4. Update Route Case
```typescript
case 'New Module':
  if (newModulePageMode === 'form') {
    return (
      <NewModuleFormPage 
        onBack={handleCloseNewModuleForm}
        onSave={handleSaveNewModule}
        initialData={selectedNewModuleData || undefined}
        mode={newModuleFormMode}
      />
    );
  }
  
  return (
    <>
      <FilterBar 
        onAddClick={() => handleOpenNewModuleForm('create')} 
      />
      <NewModuleTable 
        onView={(i) => handleOpenNewModuleForm('view', i)} 
        onEdit={(i) => handleOpenNewModuleForm('edit', i)} 
      />
    </>
  );
```

#### 5. Update Layout Conditional
```typescript
// Hide Sidebar and TopBar
{buildingPageMode !== 'form' && vehiclePageMode !== 'form' && newModulePageMode !== 'form' && (
  <Sidebar ... />
)}

// Update main class
<main className={`flex-1 flex flex-col ${
  buildingPageMode === 'form' || vehiclePageMode === 'form' || newModulePageMode === 'form' 
    ? 'p-0 overflow-hidden' 
    : 'p-8 overflow-y-auto custom-scrollbar'
}`}>
```

## 🎨 Styling Guidelines

### Tailwind Classes
```typescript
// Buttons
'px-6 py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider'

// Cards
'bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm'

// Inputs
'w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black'

// Tables
'min-w-full divide-y divide-gray-200'
```

### Color Palette
- Primary: Black (`#000000`)
- Background: Off-white (`#FBFBFB`)
- Success: Green (`#10B981`)
- Warning: Orange (`#F97316`)
- Error: Red (`#EF4444`)

## 🐛 Debugging Tips

### Console Logging
```typescript
// Use emoji markers for visibility
console.log('🚗 Opening Vehicle Form:', mode);
console.log('✅ Data saved:', data);
console.log('❌ Error:', error);
```

### React DevTools
- Install React DevTools extension
- Inspect component props and state
- Track re-renders with Profiler

### Vite HMR Issues
```bash
# If changes don't reflect:
1. Check browser console for errors
2. Hard refresh (Ctrl + Shift + R)
3. Restart dev server
```

## 📚 Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)

---

*Last Updated: January 2026*
