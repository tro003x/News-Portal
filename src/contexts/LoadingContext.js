import { createContext } from 'react';

export const LoadingContext = createContext({
  isLoading: false,
  showLoading: () => {},
  hideLoading: () => {},
});

export default LoadingContext;
