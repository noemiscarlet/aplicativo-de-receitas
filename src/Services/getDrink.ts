export async function DrinksFetch() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data.drinks;
}

// 30-1-2
const ID_API = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

export async function SearchDrinksById(id:string | undefined) {
  const response = await fetch(`${ID_API}${id}`);
  const data = await response.json();
  return data.drinks[0];
}
