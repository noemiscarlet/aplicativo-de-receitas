export function mealsOrDrinks() {
  let END_POINT = '';
  const END_POINT_MEALS = 'https://www.themealdb.com/api/json/v1/1/';
  const END_POINT_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/';

  switch (window.location.pathname) {
    case '/meals':
      END_POINT = END_POINT_MEALS;
      break;
    case '/drinks':
      END_POINT = END_POINT_DRINKS;
      break;
    default:
      return false;
  }
  return END_POINT;
}

export async function searchIngredient(ingrediente: string) {
  const END_POINT = mealsOrDrinks();
  try {
    const response = await
    fetch(`${END_POINT}filter.php?i=${ingrediente}`);
    const data = await response.json();
    console.log('meu data', data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function searchFirstLetter(primeiraletra: string) {
  const END_POINT = mealsOrDrinks();
  try {
    const response = await
    fetch(`${END_POINT}search.php?f=${primeiraletra}`);
    const data = await response.json();
    console.log('meu data', data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function searchName(nome: string) {
  const END_POINT = mealsOrDrinks();
  try {
    const response = await
    fetch(`${END_POINT}search.php?s=${nome}`);
    const data = await response.json();
    console.log('meu data', data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function searchCategory(category: string) {
  const END_POINT = mealsOrDrinks();
  try {
    const response = await
    fetch(`${END_POINT}filter.php?c=${category}`);
    const data = await response.json();
    console.log('meu data', data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function searchAllCategory() {
  const END_POINT = mealsOrDrinks();
  const response = await fetch(`${END_POINT}list.php?c=list`);
  const data = await response.json();
  console.log('meu data', data);
  return data;
}
