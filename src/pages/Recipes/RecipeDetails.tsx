import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiId } from '../../services/API';
import { DrinksCardType, MealsCardType } from '../../types/types';

function RecipeDetails() {
  const [idRecipe, setIdRecipe] = useState<string>('');
  const [APIReturnDrinks, setAPIReturnDrinks] = useState<DrinksCardType[]>([]);
  const [APIReturnMeals, setAPIReturnMeals] = useState<MealsCardType[]>([]);

  const { id } = useParams();
  useEffect(() => {
    if (typeof (id) !== 'undefined') {
      setIdRecipe(id);
      apiId(id).then((data) => {
        if (data.meals) setAPIReturnMeals(data.meals);
        if (data.drinks) setAPIReturnDrinks(data.drinks);
      });
    }
  }, [id]);

  return (
    <div>
      <div>
        {idRecipe}
        {
          APIReturnDrinks && APIReturnDrinks.map((item) => (
            <div key={ item.idDrink }>
              <h4>{ item.strDrink }</h4>
              <img src={ item.strDrinkThumb } alt="recipe" />
              <p>{item.strInstructions}</p>
            </div>
          ))
          }
        {
          APIReturnMeals && APIReturnMeals.map((item) => (
            <div key={ item.idMeal }>
              <h4>{ item.strMeal }</h4>
              <img src={ item.strMealThumb } alt="recipe" />
              <p>{item.strInstructions}</p>
            </div>
          ))
          }
      </div>
    </div>
  );
}

export default RecipeDetails;
