export interface FormData {
  email: string;
  password: string;
}

export type MealsCardType = {
  idMeal: number,
  strMealThumb: string,
  strMeal: string,
};

export type DrinksCardType = {
  idDrink: number,
  strDrinkThumb: string,
  strDrink: string,
};

export type CategoryTypes = {
  strCategory: string
};

export type ContextSearch = {
  resultsSearch: MealsCardType[] | DrinksCardType[],

};
