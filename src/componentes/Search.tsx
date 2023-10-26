import { FormEvent, useState } from 'react';

type SearchProps = {
  searchText: string,
};

function Search({ searchText }: SearchProps) {
  // armazenar os valores dos input radio
  const [searchType, setSearchType] = useState({
    searchText,
    searchRadio: '',
  });
  const nameRadio = 'searchRadio';
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setSearchType({
      ...searchType,
      [name]: value,
    });
  };

  return (
    <form>
      <label
        htmlFor="search-ingredient"
      >
        <input
          type="radio"
          name={ nameRadio }
          value="ingredient"
          onChange={ (event) => handleChange(event) }
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
          onChange={ (event) => handleChange(event) }
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
          onChange={ (event) => handleChange(event) }
          data-testid="first-letter-search-radio"
        />
        First letter
      </label>
      <button
        type="submit"
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </form>
  );
}

export default Search;
