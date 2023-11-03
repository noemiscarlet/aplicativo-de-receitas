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
  [ key: string ]: string,
  idDrink: string,
  strDrinkThumb: string,
  strDrink: string,

};

export type CategoryTypes = {
  strCategory: string
};

export type ContextSearch = {
  handleSearch: () => Promise<void>,
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
