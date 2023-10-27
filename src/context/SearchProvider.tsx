import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchContext from './SearchContext';
import { searchFirstLetter,
  searchIngredient,
  searchName } from '../services/searchAPI';

type SearchProviderProps = {
  children: React.ReactNode;
};

function SearchProvider({ children }: SearchProviderProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchType, setSearchType] = useState('ingredient');
  const [searchText, setSearchText] = useState('');
  const [resultsMealSearch, setResultsMealSearch] = useState([]);
  const [resultsDrinkSearch, setResultsDrinkSearch] = useState([]);

  useEffect(() => {
    const fechEmptyNames = async () => {
      if (pathname === ('/meals')) {
        const recipeStd = await searchName('');
        const recipeslice = recipeStd.meals?.slice(0, 12);
        setResultsMealSearch(recipeslice);
      } else if (pathname === ('/drinks')) {
        const recipeStd = await searchName('');
        const recipeslice = recipeStd.drinks?.slice(0, 12);
        setResultsDrinkSearch(recipeslice);
      }
    };
    fechEmptyNames();
  }, [pathname]);

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
    verifyLocation(functionsSearch);
  };
  const nenhum = "Sorry, we haven't found any recipes for these filters.";

  const verifyLocation = async (functionsSearch: any) => {
    try {
      if (functionsSearch) {
        const results = await functionsSearch(searchText);
        if (window.location.pathname === '/meals') {
          console.log('meu results', results);
          setResultsMealSearch(results.meals);
          if (results.meals.length === 1) {
            navigate(`/meals/${results.meals[0].idMeal}`);
          }
        } else if (window.location.pathname === '/drinks') {
          setResultsDrinkSearch(results.drinks);
          if (results.drinks.length === 1) {
            navigate(`/drinks/${results.drinks[0].idDrink}`);
          }
        }
      }
    } catch (err) {
      window.alert(nenhum);
    }
  };
  const contextValue = {
    searchText,
    setSearchText,
    searchType,
    setSearchType,
    resultsMealSearch,
    resultsDrinkSearch,
    handleSearch,
  };
  return (
    <SearchContext.Provider value={ contextValue }>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
