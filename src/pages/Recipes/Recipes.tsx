import { useContext, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CategoryTypes, DrinksCardType, MealsCardType } from '../../types/types';
import { searchAllCategory, searchCategory } from '../../services/searchAPI';
import SearchContext from '../../context/SearchContext';
import { Footer } from '../../componentes/Footer/Footer';

type RecipeType = 'meals' | 'drinks';

export default function Recipes() {
  const location = useLocation();
  const { resultsMealSearch, resultsDrinkSearch } = useContext(SearchContext);
  const [recipeType, setRecipeType] = useState<RecipeType>();
  const [mealList, setMealList] = useState<MealsCardType[]>([]);
  const [drinkList, setDrinkList] = useState<DrinksCardType[]>([]);
  const [categoryList, setCategoryList] = useState<CategoryTypes []>([{
    strCategory: '',
  }]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryTypes>({
    strCategory: '',
  });
  useEffect(() => {
    if (location.pathname.includes('/meals')) {
      setRecipeType('meals');
    } else {
      setRecipeType('drinks');
    }
  }, [location.pathname]);
  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await searchAllCategory();
      if (recipeType === 'meals') {
        const recipe = resultsMealSearch?.slice(0, 12);
        console.log(recipe);
        setMealList(recipe);
        const category = data.meals?.slice(0, 5);
        setCategoryList(category);
      } else {
        const recipe = resultsDrinkSearch?.slice(0, 12);
        setDrinkList(recipe);
        const category = data.drinks?.slice(0, 5);
        setCategoryList(category);
      }
    };
    fetchRecipes();
  }, [recipeType, resultsDrinkSearch, resultsMealSearch]);

  const handleFilter = async (category: CategoryTypes) => {
    if (recipeType === 'meals') {
      if (category.strCategory === selectedCategory.strCategory) {
        const recipe = resultsMealSearch?.slice(0, 12);
        setMealList(recipe);
      } else {
        setSelectedCategory(category);
        const filterList = await searchCategory(category.strCategory);
        const filterMeals = filterList.meals?.slice(0, 12);
        setMealList(filterMeals);
      }
    } else if (category.strCategory === selectedCategory.strCategory) {
      const recipe = resultsDrinkSearch?.slice(0, 12);
      setDrinkList(recipe);
    } else {
      setSelectedCategory(category);
      const filterList = await searchCategory(category.strCategory);
      const filterDrinks = filterList.drinks?.slice(0, 12);
      setDrinkList(filterDrinks);
    }
  };
  if (recipeType === 'meals') {
    return (
      <div>
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
        </div>
        <div>
          { mealList?.map((recipe, i) => {
            return (
              <Link
                key={ recipe.idMeal }
                to={ `/meals/${recipe.idMeal}` }
                data-testid={ `${i}-recipe-card` }
              >
                <img
                  data-testid={ `${i}-card-img` }
                  src={ recipe.strMealThumb }
                  alt={ recipe.strMeal }
                  style={ { width: '150px' } }
                />
                <p data-testid={ `${i}-card-name` }>{recipe.strMeal}</p>
              </Link>
            );
          })}
        </div>
        <Footer />
      </div>
    );
  }

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
        {drinkList?.map((recipe, i) => {
          return (
            <Link
              key={ recipe.idDrink }
              to={ `/drinks/${recipe.idDrink}` }
              data-testid={ `${i}-recipe-card` }
            >
              <img
                data-testid={ `${i}-card-img` }
                src={ recipe.strDrinkThumb }
                alt={ recipe.strDrink }
                style={ { width: '150px' } }
              />
              <p data-testid={ `${i}-card-name` }>{recipe.strDrink}</p>
            </Link>

          );
        })}
      </div>
      <Footer />
    </div>
  );
}
