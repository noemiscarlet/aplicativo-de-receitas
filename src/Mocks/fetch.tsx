import { beefFetch, ordinaryDrinkFetch } from './fetchCategory';
import { drinksFetch, mealsFetch } from './fetchdefault';

export const fetchCategories = (url:string) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
      return Promise.resolve({ meals: [
        { strCategory: 'Beef' },
        { strCategory: 'Breakfast' },
        { strCategory: 'Chicken' },
        { strCategory: 'Dessert' },
        { strCategory: 'Goat' },
        { strCategory: 'Lamb' }] });
    }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
      return Promise.resolve({
        drinks: [
          {
            strCategory: 'Ordinary Drink',
          },
          {
            strCategory: 'Cocktail',
          },
          {
            strCategory: 'Shake',
          },
          {
            strCategory: 'Other/Unknown',
          },
          {
            strCategory: 'Cocoa',
          },
          {
            strCategory: 'Shot',
          }] });
    }
  } });

export const fetchdefaut = (url:string) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
      return Promise.resolve({ drinks: drinksFetch });
    }

    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
      return Promise.resolve({ meals: mealsFetch });
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef') { return Promise.resolve({ meals: beefFetch }); }
  } });
export const fetchCategoryList = (url:string) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef') { return Promise.resolve({ meals: beefFetch }); }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink') { return Promise.resolve({ drinks: ordinaryDrinkFetch }); }
  },
});
