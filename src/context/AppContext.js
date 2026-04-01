"use client";

import { createContext, useContext } from 'react';
import { useLocale, useTranslations } from 'next-intl';

const AppContext = createContext(); // Create the context

// Create a provider component that will wrap the app and provide the context values
export function AppProvider({ children }) {  // childran -> App.js 
  const locale = useLocale();
  const t = useTranslations('Navbar'); // key for translations

  const value = {
    locale,
    isRTL: locale === 'ar',
    t, 
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Custom Hook to use the AppContext
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context; 
  // return the context values (locale, isRTL, t) to be used in any component that calls this hook
};