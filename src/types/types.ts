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
  searchText: string,
  setSearchText: React.Dispatch<React.SetStateAction<string>>,
  searchType: string,
  setSearchType: React.Dispatch<React.SetStateAction<string>>,
  handleSearch: () => Promise<void>,
  resultsMealSearch: MealsCardType[],
  resultsDrinkSearch: DrinksCardType[],
};
