import { createContext } from 'react';

// Provides pagination info from pages (like CategoryNews) to layout components (like AdsColumn)
// Shape: { paginationInfo: { page: number, totalPages: number }, setPaginationInfo: fn }
export const PaginationContext = createContext({
  paginationInfo: { page: 1, totalPages: 1 },
  setPaginationInfo: undefined,
});
