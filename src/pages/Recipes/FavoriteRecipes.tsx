import clipboardCopy from 'clipboard-copy';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import favButton from '../../images/blackHeartIcon.svg';
import share from '../../images/shareIcon.svg';
import { DoneRecipesTypes, LinkCopyType } from '../../types/types';

function FavoriteRecipes() {
  const [linkCopy, setLinkCopy] = useState<LinkCopyType>({});
  const copy = clipboardCopy;
  const [valor, setValor] = useState<DoneRecipesTypes[] >([]);
  const [renderRecipes, setRenderRecipes] = useState<DoneRecipesTypes[]>([]);

  useEffect(() => {
    const verifyLocalStorage = localStorage.getItem('favoriteRecipes') || '[]';
    const valorRecuperado = JSON.parse(verifyLocalStorage);
    setValor(valorRecuperado);
    setRenderRecipes(valorRecuperado);
    const copyLinkObj = valorRecuperado
      .reduce((acc: any, curr:any) => {
        return { ...acc, [curr.id]: false };
      }, {});
    setLinkCopy(copyLinkObj);
    console.log('loop');
  }, []);
  async function CopyMessage(url: string, id: string) {
    setLinkCopy({ ...linkCopy, [id]: true });
    const { protocol, host } = window.location;
    await copy(`${protocol}//${host}${url}`);
    setTimeout(() => {
      setLinkCopy({ ...linkCopy, [id]: false });
    }, 3000);
  }

  function removeFavorite(recipe:any) {
    const removeItem = valor.filter((item:any) => item !== recipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(
      removeItem,
    ));

    setValor(removeItem);
    setRenderRecipes(removeItem);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeItem));
  }

  function filterDrinks() {
    const filterDrink = valor.filter((item) => item.type === 'drink');
    setRenderRecipes(filterDrink);
  }

  function filterMeal() {
    const filter = valor.filter((item) => item.type === 'meal');
    setRenderRecipes(filter);
  }

  return (
    <div>
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => setRenderRecipes(valor) }
      >
        All

      </button>
      <button data-testid="filter-by-meal-btn" onClick={ filterMeal }>Meals</button>
      <button data-testid="filter-by-drink-btn" onClick={ filterDrinks }>Drinks</button>
      {renderRecipes.map((item, index) => (
        <div key={ index }>
          <Link to={ `/${item.type}s/${item.id}` }>
            <img
              className="favoriteimg"
              data-testid={ `${index}-horizontal-image` }
              src={ item.image }
              alt={ item.name }
            />
          </Link>
          <Link to={ `/${item.type}s/${item.id}` }>
            <h1 data-testid={ `${index}-horizontal-name` }>{item.name}</h1>
          </Link>
          <h3 data-testid={ `${index}-horizontal-top-text` }>{item.category}</h3>

          <button
            type="button"
            onClick={
              () => CopyMessage(`/${item.type}s/${item.id}`, `${item.id}`)
}
          >
            {linkCopy[item.id] && <h3>Link copied!</h3>}
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ share }
              alt="compartilhar"
            />
          </button>
          <button
            onClick={ () => removeFavorite(item) }
          >
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ favButton }
              alt=""
            />
            Favoritar
          </button>
          <h3 data-testid={ `${index}-horizontal-top-text` }>
            {item.nationality}
            {' '}
            -
            {' '}
            {item.category}
          </h3>
          { item.alcoholicOrNot && (
            <h3 data-testid={ `${index}-horizontal-top-text` }>{item.alcoholicOrNot}</h3>
          )}
        </div>
      ))}
    </div>
  );
}
export default FavoriteRecipes;
