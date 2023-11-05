import { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
/* import clipboardCopy from 'clipboard-copy'; */
import { SearchDrinksById } from '../../Services/getDrink';
import { SearchMealsById } from '../../Services/getFood';
import { setMeals, setDrinks } from '../../Services/helperMealsDrinks';
import { CurrentRecipeType, DoneRecipesTypes } from '../../types/types';
// import ShareButton from '../../componentes/Buttons/ShareButton';
import FavoriteButton from '../../componentes/Buttons/FavoriteButton';
import CheckBox from '../../componentes/Buttons/CheckBox';

function RecipeInProgress() {
  const navigate = useNavigate();
  /*   const [linkCopy, setLinkCopy] = useState(false);
  const copy = clipboardCopy; */
  const [recipeInProgress, setProgress] = useState<CurrentRecipeType>({
    title: '',
    img: '',
    category: '',
    ingredients: [],
    instructions: '',
  });
  const [doneRecipe, setDoneRecipe] = useState<DoneRecipesTypes | any>({});
  const [arrayIngredients, setArrayIngredients] = useState<any>([]);
  const { idDaReceita } = useParams();
  const { pathname } = useLocation();

  const createArray = (start: number, end:number) => [...Array(end)
    .keys()].map((x) => ++x).slice(start - 1);
  const arrayNumbers = createArray(1, 20);

  // const arrayNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
  //   '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];

  useEffect(() => {
    async function reqApi() {
      if (pathname.includes('meals')) {
        const data = await SearchMealsById(idDaReceita);
        const ingredientsArray: string[] = [];
        arrayNumbers.forEach((ele) => {
          if (data[`strIngredient${ele}`] !== ''
              && data[`strIngredient${ele}`] !== undefined
              && data[`strIngredient${ele}`] !== null) {
            ingredientsArray.push(data[`strIngredient${ele}`]);
          }
        });

        const { strMeal, strMealThumb, strCategory,
          strInstructions, idMeal, strTags, strArea,

        } = data;

        setProgress({
          title: strMeal,
          img: strMealThumb,
          category: strCategory,
          instructions: strInstructions,
          ingredients: ingredientsArray,

        });

        setDoneRecipe({
          id: idMeal,
          type: 'meal',
          nationality: strArea,
          category: strCategory,
          name: strMeal,
          image: strMealThumb,
          doneDate: new Date().toISOString(),
          tags: strTags ? strTags.split(',') : [],
          alcoholicOrNot: '',

        });
      }
    }reqApi();
  }, [idDaReceita, pathname]);

  useEffect(() => {
    async function reqApiDrinks() {
      if (pathname.includes('drinks')) {
        const data = await SearchDrinksById(idDaReceita);
        const ingredientsArray: string[] = [];
        arrayNumbers.forEach((ele) => {
          if (data[`strIngredient${ele}`] !== null
          && data[`strIngredient${ele}`] !== undefined
          && data[`strIngredient${ele}`] !== '') {
            ingredientsArray.push(data[`strIngredient${ele}`]);
          }
        });

        const { strDrink, strDrinkThumb, strCategory,
          strInstructions, strAlcoholic, idDrink, strTags } = data;

        setProgress({
          title: strDrink,
          img: strDrinkThumb,
          category: strCategory,
          ingredients: ingredientsArray,
          instructions: strInstructions,
        });

        setDoneRecipe({
          id: idDrink,
          type: 'drink',
          nationality: '',
          category: strCategory,
          name: strDrink,
          image: strDrinkThumb,
          doneDate: new Date().toISOString(),
          tags: strTags ? strTags.split(',') : [],
          alcoholicOrNot: strAlcoholic,
        });
      }
    }reqApiDrinks();
  }, [arrayNumbers, idDaReceita, pathname]);

  const { category, img, ingredients, instructions, title } = recipeInProgress;

  useEffect(() => {
    if (pathname.includes('meals')) {
      if (localStorage.getItem('inProgressRecipes') === null) {
        localStorage
          .setItem('inProgressRecipes', JSON.stringify({
            meals: { [idDaReceita as string]: [] },
            drinks: {},
          }));
      }

      const allIngredients = JSON
        .parse(localStorage.getItem('inProgressRecipes') as string);
      const ingreAll = allIngredients.meals[idDaReceita as string];
      setArrayIngredients(ingreAll);
    }

    if (pathname.includes('drinks')) {
      if (localStorage.getItem('inProgressRecipes') === null) {
        localStorage
          .setItem('inProgressRecipes', JSON.stringify({
            meals: {},
            drinks: { [idDaReceita as string]: [] },
          }));
      }

      const allIngredients = JSON
        .parse(localStorage.getItem('inProgressRecipes') as string);
      const ingreAll = allIngredients.drinks[idDaReceita as string];
      setArrayIngredients(ingreAll);
    }
  }, [idDaReceita, pathname]);

  function check(ingredient: string) {
    if (pathname.includes('meals')) {
      setMeals({ ingredient, arrayIngredients, idDaReceita });
    }
    if (pathname.includes('drinks')) {
      setDrinks({ ingredient, arrayIngredients, idDaReceita });
    }
    if (arrayIngredients.includes(ingredient)) {
      setArrayIngredients(arrayIngredients.filter((elem: any) => elem !== ingredient));
    } else {
      setArrayIngredients([...arrayIngredients, ingredient]);
    }
  }

  function verification() {
    return arrayIngredients.length === ingredients.length;
  }

  function startRecipe() {
    const recipesInStorage = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    localStorage.setItem('doneRecipes', JSON
      .stringify([...recipesInStorage, doneRecipe]));

    // localStorage.setItem('doneRecipes', JSON
    //   .stringify([doneRecipe]));

    navigate('/done-recipes');
  }

  return (
    <div>
      <h1 data-testid="recipe-title">{title}</h1>
      <img
        data-testid="recipe-photo"
        src={ img }
        alt={ title }
      />

      <h3 data-testid="recipe-category">{category}</h3>
      {ingredients?.map((ingredient, index) => (
        <CheckBox
          arrayIngredients={ arrayIngredients }
          pathname={ pathname }
          index={ index }
          ingredient={ ingredient }
          check={ () => check(ingredient) }
          key={ index }
        />
      ))}
      <h3 data-testid="instructions">{instructions}</h3>
      <button
        disabled={ !verification() }
        data-testid="finish-recipe-btn"
        onClick={ startRecipe }
      >
        Finalizar receita

      </button>
      {/*  <ShareButton
        data-testid="'favorite-btn'"
      /> */}
      <FavoriteButton idDaReceita={ idDaReceita } pathName={ pathname } />
    </div>
  );
}

export default RecipeInProgress;
