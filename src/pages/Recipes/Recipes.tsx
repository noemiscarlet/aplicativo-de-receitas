import { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { CategoryTypes, DrinksCardType, MealsCardType } from '../../types/types';
import { searchAllCategory, searchCategory, searchName } from '../../services/searchAPI';
import SearchContext from '../../context/SearchContext';
import { Footer } from '../../componentes/Footer/Footer';

type RecipeType = 'Meal' | 'Drink';
type ListType = DrinksCardType[] | MealsCardType [];

export default function Recipes() {
  const location = useLocation();
  const { resultsMealSearch, resultsDrinkSearch } = useContext(SearchContext);
  const [recipeType, setRecipeType] = useState<RecipeType>('Meal');
  const [list, setList] = useState<ListType>([]);
  const [categoryList, setCategoryList] = useState<CategoryTypes []>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryTypes>({
    strCategory: '',
  });
  useEffect(() => {
    if (location.pathname.includes('/meals')) {
      setRecipeType('Meal');
    } else {
      setRecipeType('Drink');
    }
  }, [location.pathname]);
  const recipeCheck = (recipe: MealsCardType | DrinksCardType) => {
    if (recipeType === 'Meal') {
      return `/meals/${recipe[`id${recipeType}`]}`;
    }
    return `/drinks/${recipe[`id${recipeType}`]}`;
  };
  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await searchAllCategory();
      if (recipeType === 'Meal') {
        const recipe = resultsMealSearch?.slice(0, 12);
        setList(recipe);
        const category = data.meals?.slice(0, 5);
        setCategoryList(category);
      } else {
        const recipe = resultsDrinkSearch?.slice(0, 12);
        setList(recipe);
        const category = data.drinks?.slice(0, 5);
        setCategoryList(category);
      }
    };
    fetchRecipes();
  }, [recipeType, resultsDrinkSearch, resultsMealSearch]);

  const handleFilter = async (category: CategoryTypes) => {
    if (recipeType === 'Meal') {
      if (category.strCategory === selectedCategory.strCategory) {
        const recipe = resultsMealSearch?.slice(0, 12);
        setList(recipe);
        setSelectedCategory({ strCategory: '' });
      } else {
        setSelectedCategory(category);
        const filterList = await searchCategory(category.strCategory);
        const filterMeals = filterList.meals?.slice(0, 12);
        setList(filterMeals);
      }
    } else if (category.strCategory === selectedCategory.strCategory) {
      const recipe = resultsDrinkSearch?.slice(0, 12);
      setList(recipe);
      setSelectedCategory({ strCategory: '' });
    } else {
      setSelectedCategory(category);
      const filterList = await searchCategory(category.strCategory);
      const filterDrinks = filterList.drinks?.slice(0, 12);
      setList(filterDrinks);
    }
  };

  return (
    <div>
      {categoryList?.map((category) => {
        return (
          <button
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ () => handleFilter(category) }
            key={ category.strCategory }
          >
            {category.strCategory}

          </button>
        );
      })}
      <button
        data-testid="All-category-filter"
        onClick={ () => handleFilter(selectedCategory) }
      >
        All Category
      </button>
      <div>
        {list?.map((recipe, i) => {
          return (
            <Link
              key={ recipe[`id${recipeType}`] }
              to={ recipeCheck(recipe) }
              data-testid={ `${i}-recipe-card` }
            >
              <img
                data-testid={ `${i}-card-img` }
                src={ recipe[`str${recipeType}Thumb`] as string }
                alt={ recipe[`str${recipeType}`] as string }
                style={ { width: '150px' } }
              />
              <p
                data-testid={ `${i}-card-name` }
              >
                {recipe[`str${recipeType}`] as string}

              </p>
            </Link>

          );
        })}
      </div>
      <Footer />
    </div>
  );
}
