export const BASE_URL: Readonly<string> = import.meta.env.PROD
  ? import.meta.env.VITE_BASE_URL
  : 'http://www.omdbapi.com/';
