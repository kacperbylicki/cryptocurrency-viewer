import { LoaderContextHandler } from '../types/contexts/loader-context.types';
import { ReactNode, createContext, useState } from 'react';

interface LoaderProviderProps {
  children: ReactNode;
}
export const LoaderContext = createContext<LoaderContextHandler>(
  {} as LoaderContextHandler,
);

export const LoaderProvider = ({ children }: LoaderProviderProps) => {
  const [activeLoader, setActiveLoader] = useState(false);

  const contextData = {
    activeLoader,
    setActiveLoader,
  };

  return (
    <LoaderContext.Provider value={contextData}>
      {children}
    </LoaderContext.Provider>
  );
};
