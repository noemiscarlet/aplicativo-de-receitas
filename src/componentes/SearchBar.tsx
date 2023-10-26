import { useContext } from 'react';
import SearchContext from '../context/SearchContext';

function SearchBar() {
  const { searchType, setSearchType, handleSearch } = useContext(SearchContext);
  const nameRadio = 'searchRadio';

  return (
    <div>
      <label
        htmlFor="search-ingredient"
      >
        <input
          type="radio"
          name={ nameRadio }
          value="ingredient"
          checked={ searchType === 'ingredient' }
          onChange={ () => setSearchType('ingredient') }
          id="search-ingredient"
          data-testid="ingredient-search-radio"
        />
        Ingredient
      </label>
      <label
        htmlFor="search-name"
      >
        <input
          type="radio"
          name={ nameRadio }
          value="nome"
          checked={ searchType === 'nome' }
          onChange={ () => setSearchType('nome') }
          id="search-name"
          data-testid="name-search-radio"
        />
        Name
      </label>
      <label
        htmlFor="search-first"
      >
        <input
          type="radio"
          name={ nameRadio }
          id="search-first"
          value="first-letter"
          checked={ searchType === 'first-letter' }
          onChange={ () => setSearchType('first-letter') }
          data-testid="first-letter-search-radio"
        />
        First letter
      </label>
      <button
        data-testid="exec-search-btn"
        onClick={ handleSearch }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
