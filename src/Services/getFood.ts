export async function MealsFetch() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data.meals;
}

// 30-1-2
const ID_API = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

export async function SearchMealsById(id:string | undefined) {
  const response = await fetch(`${ID_API}${id}`);
  const data = await response.json();
  return data.meals[0];
}
