export interface FormData {
  email: string;
  password: string;
}

export type MealsCardType = {
  [ key: string ]: number | string,
  idMeal: number,
  strMealThumb: string,
  strMeal: string,
};

export type DrinksCardType = {
  [ key: string ]: number | string,
  idDrink: number,
  strDrinkThumb: string,
  strDrink: string,
};

export type CategoryTypes = {
  strCategory: string
};

export type ContextSearch = {
  handleSearch: (search: SearchState) => Promise<void>,
  resultsMealSearch: MealsCardType[],
  resultsDrinkSearch: DrinksCardType[],
};
export type SearchState = {
  searchText: string,
  searchType: string
};
