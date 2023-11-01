import { mealsOrDrinks } from '../services/searchAPI';

// id 178319
export const apiId = async (idDrink:string) => {
  const END_POINT = mealsOrDrinks();
  const URL = `${END_POINT}lookup.php?i=${idDrink}`;
  const response = await fetch(URL);
  const apiResponse = await response.json();

  console.log(apiResponse);

  return apiResponse;
};
