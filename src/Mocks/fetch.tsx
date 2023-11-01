import { soup } from './FetchSearchName';
import { beefFetch,
  breakfast,
  chicken,
  cocktail,
  cocoa, dessert, goat, ordinaryDrinkFetch, other, shake } from './fetchCategory';
import { drinksFetch, mealsFetch } from './fetchdefault';

export const fetchCategoriesMeals = {
  meals: [
    { strCategory: 'Beef' },
    { strCategory: 'Breakfast' },
    { strCategory: 'Chicken' },
    { strCategory: 'Dessert' },
    { strCategory: 'Goat' },
    { strCategory: 'Lamb' }] };
export const fetchCategoriesDrinks = { drinks: [
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
  }] };

export const fetchDefaultDrinks = {
  drinks: drinksFetch,
};
export const fetchDefaultMeals = { meals: mealsFetch };

export const fetchCategoryListMeals = [{ meals: beefFetch },
  { meals: breakfast }, { meals: chicken }, { meals: dessert }, { meals: goat }];

export const fetchCategoryListDrinks = [{ drinks: ordinaryDrinkFetch },
  { drinks: cocktail }, { drinks: shake }, { drinks: other }, { drinks: cocoa }];

export const fetchSearchName = { meals: soup };
