/**
 * API Configuration
 * Centralized API endpoint definitions
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 30000;

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const API_ENDPOINTS = {
  // Authentication
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
  },

  // Vehicle Module
  vehicles: {
    list: '/vehicles',
    create: '/vehicles',
    detail: (id: string) => `/vehicles/${id}`,
    update: (id: string) => `/vehicles/${id}`,
    delete: (id: string) => `/vehicles/${id}`,
  },

  // Building Module
  buildings: {
    list: '/buildings',
    create: '/buildings',
    detail: (id: string) => `/buildings/${id}`,
    update: (id: string) => `/buildings/${id}`,
    delete: (id: string) => `/buildings/${id}`,
  },

  // ATK Module
  atk: {
    requests: '/atk/requests',
    masterItems: '/atk/master',
    approval: '/atk/approval',
  },

  // ARK Module
  ark: {
    requests: '/ark/requests',
    masterItems: '/ark/master',
    approval: '/ark/approval',
  },

  // Asset Module
  assets: {
    list: '/assets',
    create: '/assets',
    detail: (id: string) => `/assets/${id}`,
    maintenance: '/assets/maintenance',
    mutations: '/assets/mutations',
  },

  // Insurance Module
  insurance: {
    policies: '/insurance/policies',
    claims: '/insurance/claims',
    providers: '/insurance/providers',
    reminders: '/insurance/reminders',
  },

  // Facility Module
  facility: {
    pods: '/facility/pods',
    lockers: '/facility/lockers',
    podRequests: '/facility/pods/requests',
    lockerRequests: '/facility/lockers/requests',
  },

  // Master Data
  master: {
    brands: '/master/brands',
    colors: '/master/colors',
    locations: '/master/locations',
    departments: '/master/departments',
    users: '/master/users',
    vendors: '/master/vendors',
  },

  // Utilities
  utilities: {
    upload: '/utilities/upload',
    download: (id: string) => `/utilities/download/${id}`,
    export: '/utilities/export',
  },
};

export default API_CONFIG;
