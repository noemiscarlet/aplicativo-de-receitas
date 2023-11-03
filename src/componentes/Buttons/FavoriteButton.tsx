import { useEffect, useState } from 'react';
import { SearchDrinksById } from '../../Services/getDrink';
import { SearchMealsById } from '../../Services/getFood';
import favButton from '../../images/blackHeartIcon.svg';
import buttonNotFav from '../../images/whiteHeartIcon.svg';
import { FavoriteRecipesTypes, RecipeType, ButtonPropsType } from '../../types/types';

function FavoriteButton({ idDaReceita, pathName, id = false }
:ButtonPropsType) {
  const [favoriteButton, setFavoriteButton] = useState<true | false>();
  const [recipe, setRecipe] = useState({} as RecipeType);
  const [favRecipes, setFavRecipes] = useState<FavoriteRecipesTypes[]>([]);

  useEffect(() => {
    let verifyLocalStorage = localStorage.getItem('favoriteRecipes') || '[]';
    if (JSON.parse(verifyLocalStorage) === null) {
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([]));
    }
    verifyLocalStorage = localStorage.getItem('favoriteRecipes') || '[]';
    const getFavoritesRecipes = JSON.parse(verifyLocalStorage);
    setFavRecipes(getFavoritesRecipes);

    async function getRecipe() {
      if (pathName.includes('/meals')) {
        const getRecipeApi = await SearchMealsById(idDaReceita);
        const { strArea, strCategory, strMeal, strMealThumb } = getRecipeApi;
        setRecipe({
          id: idDaReceita,
          type: 'meal',
          nationality: strArea,
          category: strCategory,
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb,
        });
      }
      if (pathName.includes('/drinks')) {
        const getRecipeApi = await SearchDrinksById(idDaReceita);
        const { strCategory, strDrink,
          strDrinkThumb, strAlcoholic } = getRecipeApi;
        setRecipe({
          id: idDaReceita,
          type: 'drink',
          nationality: '',
          category: strCategory,
          alcoholicOrNot: strAlcoholic,
          name: strDrink,
          image: strDrinkThumb,
        });
      }
      const favoritos = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
      const favoriteVerifier = favoritos.some((item: any) => item.id === idDaReceita);
      setFavoriteButton(favoriteVerifier);
    }

    getRecipe();
  }, [idDaReceita, pathName]);

  function setFavorite() {
    if (!favoriteButton) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        [...favRecipes, recipe],
      ));
      const getFavoritesRecipes = JSON.parse(
        localStorage.getItem('favoriteRecipes') || '[]',
      );
      setFavRecipes(getFavoritesRecipes);
      setFavoriteButton(!favoriteButton);
    } else {
      const removeItem = favRecipes.filter((item:any) => item.id !== idDaReceita);
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        removeItem,
      ));

      setFavRecipes(removeItem);
      setFavoriteButton(!favoriteButton);
    }
  }

  return (
    <div>

      {id ? (
        <button
          onClick={ setFavorite }
        >
          { favoriteButton
            ? <img data-testid={ id } src={ favButton } alt="" />
            : <img data-testid={ id } src={ buttonNotFav } alt="" />}
          Favoritar
        </button>
      )
        : (
          <button
            onClick={ setFavorite }
          >
            { favoriteButton
              ? <img data-testid="favorite-btn" src={ favButton } alt="" />
              : <img data-testid="favorite-btn" src={ buttonNotFav } alt="" />}
            Favoritar
          </button>)}
    </div>
  );
}
export default FavoriteButton;
