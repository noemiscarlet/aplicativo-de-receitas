// id 178319
export const apiDrinkId = async (idDrink:number) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
  try {
    const response = await fetch(URL);
    const apiResponse = await response.json();

    console.log(apiResponse);

    return apiResponse;
  } catch (error) {
    return [];
  }
};

// id 52771
export const apiFoodId = async (idFood:number) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idFood}`;
  try {
    const response = await fetch(URL);
    const apiResponse = await response.json();

    console.log(apiResponse);

    return apiResponse;
  } catch (error) {
    return [];
  }
};
