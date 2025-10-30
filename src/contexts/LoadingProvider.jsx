import React, { useCallback, useState } from 'react';
import { LoadingContext } from './LoadingContext.js';

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = useCallback(() => setIsLoading(true), []);
  const hideLoading = useCallback(() => setIsLoading(false), []);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded shadow-lg flex flex-col items-center">
            <div className="loader mb-3" />
            <div className="text-lg font-medium">Loading…</div>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
