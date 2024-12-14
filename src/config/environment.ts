export const environment = {
  alfresco: {
    host: import.meta.env.VITE_ALFRESCO_HOST || 'http://localhost:8080',
    username: import.meta.env.VITE_ALFRESCO_USERNAME || 'admin',
    password: import.meta.env.VITE_ALFRESCO_PASSWORD || 'admin',
  },
};