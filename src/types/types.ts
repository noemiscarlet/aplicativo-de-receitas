export interface FormData {
  email: string;
  password: string;
}

export type MealsCardType = {
  [ key: string ]: string,
  idMeal: string,
  strMealThumb: string,
  strMeal: string,
};

export type DrinksCardType = {
  [ key: string ]: number | string,
  idDrink: number,
  strDrinkThumb: string,
  strDrink: string,
  strInstructions: string,
};

export type CategoryTypes = {
  strCategory: string
};

export type ContextSearch = {
  handleSearch: (search: SearchState) => Promise<void>,
  resultsMealSearch: MealsCardType[],
  resultsDrinkSearch: DrinksCardType[],
  setSearchType: React.Dispatch<React.SetStateAction<string>>,
  searchType: string,
  searchText: string,
  setSearchText: React.Dispatch<React.SetStateAction<string>>,
};
export type SearchState = {
  searchText: string,
  searchType: string
};
