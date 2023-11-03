export type LinkCopyType = Record<string, boolean>;

export type DataType = {
  data:MealsCardType[] | DrinksCardType[],
};
export type MealsCardType = {
  [ key: string ]: number | string,
  idMeal: number,
  strMealThumb: string,
  strMeal: string,
};

export type CategoryTypes = {
  strCategory: string
};

export type DrinksCardType = {
  [ key: string ]: number | string,
  idDrink: number,
  strDrinkThumb: string,
  strDrink: string,
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

export interface FormData {
  email: string;
  password: string;
}

export type CurrentRecipeType = {
  img: string,
  title: string,
  category: string,
  ingredients: string[],
  instructions: string,
  video?: string | null,
  alcoholic?: string | null,
};

export type InProgressRecipesTypes = {
  meals: {
    id:string,
  },
  drinks:{
    id:string
  },
};

export type DoneRecipesTypes = {
  id: string,
  type: string,
  nationality: string,
  category: string,
  alcoholicOrNot: string,
  name: string,
  image: string,
  doneDate: string,
  tags: string[],

};

export type FavoriteRecipesTypes = {
  id: string,
  type: string,
  nationality: string,
  category: string,
  alcoholicOrNot: string,
  name: string,
  image: string,
};

export type RecipeType = {
  id: string | undefined
  type: string,
  nationality: string,
  category: string,
  alcoholicOrNot: string,
  name: string,
  image: string,
};

export type ButtonPropsType = {
  idDaReceita: string | undefined,
  pathName:string,
  id?: string | boolean
};
