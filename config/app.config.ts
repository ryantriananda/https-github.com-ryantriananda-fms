/**
 * Application Configuration
 * General app settings and constants
 */

export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'MODENA FMS',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  environment: import.meta.env.VITE_APP_ENVIRONMENT || 'development',
  
  // Feature flags
  features: {
    mockData: import.meta.env.VITE_ENABLE_MOCK_DATA === 'true',
    debugMode: import.meta.env.VITE_ENABLE_DEBUG_MODE === 'true',
    authentication: import.meta.env.VITE_AUTH_ENABLED === 'true',
  },

  // Pagination
  pagination: {
    defaultPageSize: Number(import.meta.env.VITE_DEFAULT_PAGE_SIZE) || 50,
    maxPageSize: Number(import.meta.env.VITE_MAX_PAGE_SIZE) || 100,
    pageSizeOptions: [10, 25, 50, 100],
  },

  // Date/Time
  datetime: {
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    datetimeFormat: 'DD/MM/YYYY HH:mm',
    locale: 'id-ID',
  },

  // File Upload
  upload: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    allowedDocTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    allowedExcelTypes: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  },

  // Storage
  storage: {
    prefix: import.meta.env.VITE_STORAGE_PREFIX || 'modena_fms_',
    tokenKey: import.meta.env.VITE_AUTH_TOKEN_KEY || 'modena_fms_token',
  },

  // UI
  ui: {
    sidebarCollapsedWidth: 90,
    sidebarExpandedWidth: 280,
    topBarHeight: 72,
    animationDuration: 300,
  },
};

export default APP_CONFIG;
