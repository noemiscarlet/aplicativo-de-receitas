import { useState } from 'react';
import SearchContext from './SearchContext';
import searchIngredient from '../services/searchIngredient';
import searchName from '../services/searchName';
import searchFirstLetter from '../services/searchFirstLetter';

type SearchProviderProps = {
  children: React.ReactNode;
};

function SearchProvider({ children }: SearchProviderProps) {
  // armazenar os valores dos input radio
  const [searchType, setSearchType] = useState('ingredient');
  // armazenar o valor do campo search input
  const [searchText, setSearchText] = useState('');
  const [resultsSearch, setResultsSearch] = useState([]);

  const handleSearch = async () => {
    let functionsSearch;

    if (searchType === 'ingredient') {
      functionsSearch = searchIngredient;
    } else if (searchType === 'nome') {
      functionsSearch = searchName;
    } else if (searchType === 'first-letter') {
      if (searchText.length !== 1) {
        window.alert('Your search must have only 1 (one) character');
        return;
      }
      functionsSearch = searchFirstLetter;
    }

    if (functionsSearch) {
      const results = await functionsSearch(searchText);
      setResultsSearch(results);
    }
  };

  const contextValue = {
    searchText,
    setSearchText,
    searchType,
    setSearchType,
    resultsSearch,
    handleSearch,
  };
  return (
    <SearchContext.Provider value={ contextValue }>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
