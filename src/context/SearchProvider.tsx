import { useState } from 'react';
import SearchContext from './SearchContext';

type SearchProviderProps = {
  children: React.ReactNode;
};

function SearchProvider({ children }: SearchProviderProps) {
  const [resultsSearch, setResultsSearch] = useState([]);

  const contextValue = {
    resultsSearch,
  };
  return (
    <SearchContext.Provider value={ contextValue }>
      {children}
    </SearchContext.Provider>
  );
}
