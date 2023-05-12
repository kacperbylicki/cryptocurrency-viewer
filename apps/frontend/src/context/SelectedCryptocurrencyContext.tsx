import { ReactNode, createContext, useState } from 'react';
import { SelectedCryptocurrencyContextHandler } from '../types/contexts/selected-cryptocurrency-context.types';

interface SelectedCryptocurrencyProviderProps {
  children: ReactNode;
}
export const SelectedCryptocurrencyContext =
  createContext<SelectedCryptocurrencyContextHandler>(
    {} as SelectedCryptocurrencyContextHandler,
  );

export const SelectedCryptocurrencyProvider = ({
  children,
}: SelectedCryptocurrencyProviderProps) => {
  const [activeUuid, setActiveUuid] = useState<string>('Qwsogvtv82FCd');
  const [newsCategory, setNewsCategory] = useState<string>('Bitcoin');

  const handleSelectCryptocurrency = (value: string) => {
    const elements = value.split('//');
    setNewsCategory(elements[0]);
    setActiveUuid(elements[1]);
  };

  const contextData = {
    activeUuid,
    newsCategory,
    handleSelectCryptocurrency,
  };

  return (
    <SelectedCryptocurrencyContext.Provider value={contextData}>
      {children}
    </SelectedCryptocurrencyContext.Provider>
  );
};
