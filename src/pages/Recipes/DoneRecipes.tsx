import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';

type DoneRecipes = {
  id: string,
  type: string,
  nationality: string,
  category: string,
  alcoholicOrNot: string,
  name: string,
  image: string,
  doneDate: string,
  tags: Array<string>,
};

type Filter = 'all' | 'meal' | 'drink';

function DoneRecipes() {
  // estado para armazenar os dados recebidos pelo localStorage
  const [recipesMade, setRecipesMade] = useState<DoneRecipes[]>([]);
  const [copyStates, setCopyStates] = useState(Array(recipesMade.length).fill(false));
  const [filterType, setFiltertype] = useState<Filter>('all');

  useEffect(() => {
    const localStorageBase = localStorage.getItem('doneRecipes');
    if (localStorageBase) {
      const recipeData = JSON.parse(localStorageBase);
      setRecipesMade(recipeData);
    }
  }, []);

  const handleShareClick = async (recipeId:string, index: any) => {
    const recipeDetailsUrl = `http://localhost:3000/meals/${recipeId}`;
    await navigator.clipboard.writeText(recipeDetailsUrl);

    const newCopyState = [...copyStates];
    newCopyState[index] = true;
    setCopyStates(newCopyState);
  };

  const handleFilterClick = (typeSelect: Filter) => {
    setFiltertype(typeSelect);
  };
  const filterDone = filterType === 'all'
    ? recipesMade
    : recipesMade.filter((done) => done.type === filterType);
  return (
    <>
      <div>
        <button
          onClick={ () => handleFilterClick('all') }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          onClick={ () => handleFilterClick('meal') }
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          onClick={ () => handleFilterClick('drink') }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      {filterDone.map((dados, index) => (
        <div key={ dados.id }>
          <Link
            to={ `/${dados.type}s/${dados.id}` }
          >
            <img
              src={ dados.image }
              alt={ dados.name }
              data-testid={ `${index}-horizontal-image` }
              style={ { width: '200px' } }
            />
            <p data-testid={ `${index}-horizontal-name` }>{dados.name}</p>
          </Link>
          <p
            data-testid={ `${index}-horizontal-done-date` }
          >
            {`Done in: ${dados.doneDate}`}
          </p>
          {dados.tags.map((tag, tagIndex) => (
            <p
              key={ tagIndex }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </p>
          ))}
          {dados.type === 'drink' ? (
            <>
              <p data-testid={ `${index}-horizontal-top-text` }>{dados.category}</p>
              <p data-testid={ `${index}-horizontal-top-text` }>{dados.alcoholicOrNot}</p>
              <button
                onClick={ () => handleShareClick(dados.id, index) }
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="botão de compartilhar"
                />
              </button>
              {copyStates[index] && <p>Link copied!</p>}
            </>
          ) : (
            <>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${dados.nationality} - ${dados.category}`}
              </p>
              <button
                onClick={ () => handleShareClick(dados.id, index) }
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="botão de compartilhar"
                />
              </button>
              {copyStates[index] && <p>Link copied!</p>}
            </>
          )}
        </div>
      ))}
    </>
  );
}

export default DoneRecipes;
