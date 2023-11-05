import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { DrinksFetch } from '../../Services/getDrink';
import { MealsFetch } from '../../Services/getFood';
import ButtonStartRecipe from '../../componentes/Buttons/ButtonStartRecipe';
import FavoriteButton from '../../componentes/Buttons/FavoriteButton';
// import ShareButton from '../../componentes/Buttons/ShareButton';
import RecomendationCarousel from './RecomendationCarousel';
import { DrinksCardType, MealsCardType } from '../../types/types';
import ShareButton from '../../componentes/Buttons/ShareButton';

function RecipeDetails() {
  const { idDaReceita } = useParams();
  const { pathname } = useLocation();
  const [recomendation, setRecomendation] = useState<MealsCardType[]
  | DrinksCardType[]>([]);
  console.log(recomendation);
  type CurrentRecipeType = {
    img: string,
    title: string,
    category: string,
    ingredients: string[],
    instructions: string,
    video?: string | null,
    alcoholic?: string | null,
  };

  const [currentRecipe, setCurrentRecipe] = useState<CurrentRecipeType>({
    img: '',
    title: '',
    category: '',
    ingredients: [],
    instructions: '',
  });

  const arrayNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];

  useEffect(() => {
    const reqApiRecipe = async () => {
      if (pathname.includes('drink')) {
        setRecomendation(await MealsFetch());
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDaReceita}`);
        const data = await response.json();
        const ingredientsArray: string[] = [];
        arrayNumbers.forEach((ele) => {
          if (data.drinks[0][`strIngredient${ele}`] !== null
                && data.drinks[0][`strIngredient${ele}`] !== undefined) {
            const ing = `${data.drinks[0][`strMeasure${ele}`]}
                ${data.drinks[0][`strIngredient${ele}`]}`;
            ingredientsArray.push(ing);
          }
        });
        setCurrentRecipe({
          img: data.drinks[0].strDrinkThumb,
          title: data.drinks[0].strDrink,
          category: '',
          ingredients: ingredientsArray,
          instructions: data.drinks[0].strInstructions,
          alcoholic: data.drinks[0].strAlcoholic,
        });
      }

      if (pathname.includes('meals')) {
        setRecomendation(await DrinksFetch());
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idDaReceita}`);
        const data = await response.json();
        console.log(data.meals[0]);
        const ingredientsArray: string[] = [];
        arrayNumbers.forEach((ele) => {
          if (data.meals[0][`strIngredient${ele}`] !== ''
              && data.meals[0][`strIngredient${ele}`] !== undefined) {
            const ing = `${data.meals[0][`strMeasure${ele}`]}
              ${data.meals[0][`strIngredient${ele}`]}`;
            ingredientsArray.push(ing);
          }
        });
        setCurrentRecipe({
          img: data.meals[0].strMealThumb,
          title: data.meals[0].strMeal,
          category: data.meals[0].strCategory,
          ingredients: ingredientsArray,
          instructions: data.meals[0].strInstructions,
          video: data.meals[0].strYoutube,
        });
      }
    };
    reqApiRecipe();
  }, []);

  const {
    img, title, ingredients, category, instructions, video, alcoholic } = currentRecipe;

  return (
    <div>
      <div>
        {ingredients?.map((ingredient, index) => (
          <div
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {ingredient}
          </div>
        ))}
        { currentRecipe && (
          <div>
            <img
              data-testid="recipe-photo"
              src={ img }
              alt={ title }
            />
            <h3 data-testid="recipe-title">{title}</h3>
            <h3 data-testid="instructions">{instructions}</h3>
            {alcoholic && <h3 data-testid="recipe-category">{alcoholic}</h3>}
            <h3 data-testid="recipe-category">{category}</h3>
            {video
          && <iframe
            data-testid="video"
            src={ video }
            title="YouTube video player"
            width="500"
            height="300"
            frameBorder="0"
          />}
          </div>
        )}
        <RecomendationCarousel recomendation={ recomendation } />
        {/* <ShareButton /> */}
        <ShareButton textToCopy={ `http://localhost:3000${pathname}` } />
        <FavoriteButton pathName={ pathname } idDaReceita={ idDaReceita } />
      </div>
      <div>
        <ButtonStartRecipe />
      </div>
    </div>

  );
}

export default RecipeDetails;
