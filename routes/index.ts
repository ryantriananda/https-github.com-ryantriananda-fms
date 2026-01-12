/**
 * Route Definitions
 * Centralized routing configuration
 */

export interface RouteConfig {
  path: string;
  label: string;
  icon?: string;
  children?: RouteConfig[];
  roles?: string[]; // Future: Role-based access control
}

export const ROUTES: Record<string, RouteConfig> = {
  // Dashboard
  dashboard: {
    path: '/dashboard',
    label: 'DASHBOARD',
    icon: 'LayoutDashboard',
  },

  // Gedung (Building)
  buildingManagement: {
    path: '/building',
    label: 'GEDUNG',
    icon: 'Building',
    children: [
      { path: '/building/list', label: 'Daftar Gedung' },
      { path: '/building/utility', label: 'Utility Monitoring' },
      { path: '/building/compliance', label: 'Compliance & Legal' },
    ],
  },

  // Kendaraan (Vehicle)
  vehicleManagement: {
    path: '/vehicle',
    label: 'KENDARAAN',
    icon: 'Car',
    children: [
      { path: '/vehicle/list', label: 'Daftar Kendaraan' },
      { path: '/vehicle/contracts', label: 'Kontrak Kendaraan' },
      { path: '/vehicle/service', label: 'Servis' },
      { path: '/vehicle/tax-kir', label: 'Pajak & KIR' },
      { path: '/vehicle/reminders', label: 'Reminder Pajak & KIR' },
      { path: '/vehicle/mutations', label: 'Mutasi' },
      { path: '/vehicle/sales', label: 'Penjualan' },
    ],
  },

  // Asset Umum
  assetManagement: {
    path: '/asset',
    label: 'ASSET UMUM',
    icon: 'Package',
    children: [
      { path: '/asset/hc', label: 'Asset HC' },
      { path: '/asset/it', label: 'Asset IT' },
      { path: '/asset/cs', label: 'Customer Service' },
      { path: '/asset/maintenance', label: 'Pemeliharaan Asset' },
      { path: '/asset/reminders', label: 'Reminder Pemeliharaan' },
      { path: '/asset/mutations', label: 'Mutasi Aset' },
      { path: '/asset/sales', label: 'Penjualan Aset' },
    ],
  },

  // Insurance
  insurance: {
    path: '/insurance',
    label: 'INSURANCE',
    icon: 'Shield',
    children: [
      { path: '/insurance/dashboard', label: 'Insurance Dashboard' },
      { path: '/insurance/policies', label: 'All Policies' },
      { path: '/insurance/claims', label: 'Insurance Claims' },
      { path: '/insurance/expiring', label: 'Expiring Soon' },
      { path: '/insurance/providers', label: 'Insurance Providers' },
    ],
  },

  // MODENA Pod
  modenaPod: {
    path: '/pod',
    label: 'MODENA POD',
    icon: 'Bed',
    children: [
      { path: '/pod/requests', label: 'Permintaan Pod' },
      { path: '/pod/approval', label: 'Persetujuan Pod' },
      { path: '/pod/master', label: 'Master MODENA Pod' },
      { path: '/pod/modena-pod', label: 'MODENA Pod' },
      { path: '/pod/tenant-pod', label: 'Tenant Pod' },
      { path: '/pod/census', label: 'Pod Census' },
    ],
  },

  // Loker
  locker: {
    path: '/locker',
    label: 'LOKER',
    icon: 'Lock',
    children: [
      { path: '/locker/list', label: 'Daftar Loker' },
      { path: '/locker/requests', label: 'Request Locker' },
      { path: '/locker/master', label: 'Master Loker' },
    ],
  },

  // ATK
  atk: {
    path: '/atk',
    label: 'ATK',
    icon: 'Pencil',
    children: [
      { path: '/atk/requests', label: 'Request ATK' },
      { path: '/atk/approval', label: 'Stationery Request Approval' },
      { path: '/atk/master', label: 'Master ATK' },
    ],
  },

  // Stock Opname
  stockOpname: {
    path: '/stock-opname',
    label: 'STOCK OPNAME',
    icon: 'ClipboardList',
    children: [
      { path: '/stock-opname/input', label: 'Input Stock Opname' },
      { path: '/stock-opname/approval', label: 'Stock Opname Approval' },
    ],
  },

  // Log Book
  logBook: {
    path: '/logbook',
    label: 'LOG BOOK',
    icon: 'BookOpen',
  },

  // Admin
  admin: {
    path: '/admin',
    label: 'ADMIN',
    icon: 'Settings',
    roles: ['admin', 'superadmin'],
    children: [
      { path: '/admin/timesheet', label: 'Timesheet' },
      { path: '/admin/vendors', label: 'Vendor' },
      { path: '/admin/users', label: 'User' },
      { path: '/admin/approval', label: 'Master Approval' },
    ],
  },
};

/**
 * Get route by path
 */
export const getRouteByPath = (path: string): RouteConfig | undefined => {
  for (const route of Object.values(ROUTES)) {
    if (route.path === path) return route;
    if (route.children) {
      const child = route.children.find(c => c.path === path);
      if (child) return child;
    }
  }
  return undefined;
};

/**
 * Get breadcrumbs for a path
 */
export const getBreadcrumbs = (path: string): string[] => {
  const breadcrumbs: string[] = ['Home'];
  
  for (const route of Object.values(ROUTES)) {
    if (route.path === path) {
      breadcrumbs.push(route.label);
      return breadcrumbs;
    }
    
    if (route.children) {
      const child = route.children.find(c => c.path === path);
      if (child) {
        breadcrumbs.push(route.label);
        breadcrumbs.push(child.label);
        return breadcrumbs;
      }
    }
  }
  
  return breadcrumbs;
};

export default ROUTES;
