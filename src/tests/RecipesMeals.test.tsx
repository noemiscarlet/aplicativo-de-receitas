import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter, Route, useLocation } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Recipes from '../pages/Recipes/Recipes';
import renderWithRouter from './renderWithRouter';
import { searchAllCategory, searchCategory, searchFirstLetter, searchName } from '../services/searchAPI';
import { CategoryTypes, DrinksCardType, MealsCardType } from '../types/types';
import SearchProvider from '../context/SearchProvider';
import App from '../App';

const searchTopBtn = 'search-top-btn';
const execBtn = 'exec-search-btn';
const seachInputBtn = 'search-input';

const AllCategoryBtn = 'All-category-filter';
describe('testando recipes req 19-23 meals', async () => {
  const user = userEvent.setup();
  render(
    <BrowserRouter>
      <SearchProvider>
        <Recipes />
      </SearchProvider>
    </BrowserRouter>,
  );
  const mealsButton = screen.getByTestId('meals-bottom-btn');
  await user.click(mealsButton);
  const checkRecipes = async (fetch: any) => {
    const timer = setTimeout(() => {
      const mealsSlice = fetch.meals?.slice(0, 12);
      mealsSlice.forEach(async (meal:MealsCardType, i: number) => {
        const card = await screen.findByTestId(`${i}=recipe-card`);
        expect(card).toBeInTheDocument();
        expect(card).toHaveAttribute('href', `/meals${meal.idMeal}`);
      });
      mealsSlice.forEach(async (meal :MealsCardType, i:number) => {
        const img = await screen.findByTestId(`${i}-card-img`);
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', meal.strMealThumb);
        expect(img).toHaveAttribute('alt', meal.strMeal);
      });
      mealsSlice.forEach(async (element: MealsCardType, i:number) => {
        const mealName = await screen.findByTestId(`${i}-card-name`);
        expect(mealName).toBeInTheDocument();
        expect(mealName).toHaveTextContent(element.strMeal);
      });
      expect('[data-testid="12-recipe-card]').not.toBeInTheDocument();
      expect('[data-testid="12-card-img]').not.toBeInTheDocument();
      expect('[data-testid="12-card-name]').not.toBeInTheDocument();
    }, 4000);
    clearTimeout(timer);
  };
  const CategoryMealbuttons = [] as HTMLElement[];
  const fetchCategories = await searchAllCategory();
  const fetchSliceCategory = fetchCategories.meals?.slice(0, 5);
  fetchSliceCategory.forEach(async (category: CategoryTypes) => {
    const testid = await screen.findByTestId(`${category.strCategory}-category-filter`);
    CategoryMealbuttons.push(testid);
  });

  test('testa category button', () => {
    renderWithRouter(<Recipes />, { route: '/meals' });
    const categoryTimer = setTimeout(() => {
      CategoryMealbuttons.forEach((category) => {
        expect(category).toBeInTheDocument();
      });
    }, 4000);
    clearTimeout(categoryTimer);
  });
  test('testa category list', async () => {
    render(
      <BrowserRouter>
        <SearchProvider>
          <Recipes />
        </SearchProvider>
      </BrowserRouter>,
    );
    const categoryTimer = setTimeout(() => {
      CategoryMealbuttons.forEach(async (category) => {
        await user.click(category);
        const fetch = await searchCategory(`${category.innerHTML}`);
        checkRecipes(fetch);
      }, 3000);
      clearTimeout(categoryTimer);
    });
  });
  test('testa o recipes padrão meals', async () => {
    renderWithRouter(<Recipes />, { route: '/meals' });
    const fetchStd = await searchName('');
    checkRecipes(fetchStd);
  });
  test('testa All Category btn', async () => {
    render(
      <BrowserRouter>
        <SearchProvider>
          <Recipes />
        </SearchProvider>
      </BrowserRouter>,
    );
    const allCategoryBtn = await screen.findByTestId(AllCategoryBtn);
    await user.click(CategoryMealbuttons[0]);
    await user.click(allCategoryBtn);
    const fetchStd = await searchName('');
    checkRecipes(fetchStd);
  });
});
describe('testando recipes req 19-23 drinks', async () => {
  const user = userEvent.setup();
  render(
    <BrowserRouter>
      <SearchProvider>
        <Recipes />
      </SearchProvider>
    </BrowserRouter>,
  );

  window.location.pathname = '/drinks';

  const checkRecipes = async (fetch:any) => {
    const timer = setTimeout(() => {
      const drinksSlice = fetch.drinks.slice(0, 12);
      drinksSlice.forEach(async (drink:DrinksCardType, i: number) => {
        const card = await screen.findByTestId(`${i}=recipe-card`);
        expect(card).toBeInTheDocument();
        expect(card).toHaveAttribute('href', `/drinks/${drink.idDrink}`);
      });
      drinksSlice.forEach(async (drink :DrinksCardType, i:number) => {
        const img = await screen.findByTestId(`${i}-card-img`);
        expect(img).toHaveAttribute('src', drink.strDrinkThumb);
        expect(img).toHaveAttribute('alt', drink.strDrink);
        expect(img).toHaveAttribute('style', { width: '150px' });
      });
      drinksSlice.forEach(async (element: DrinksCardType, i:number) => {
        const drinkName = await screen.findByTestId(`${i}-card-name`);
        expect(drinkName).toBeInTheDocument();
        expect(drinkName).toHaveTextContent(element.strDrink);
      });
      expect('[data-testid="12-recipe-card]').not.toBeInTheDocument();
      expect('[data-testid="12-card-img]').not.toBeInTheDocument();
      expect('[data-testid="12-card-name]').not.toBeInTheDocument();
    }, 5000);
    clearTimeout(timer);
  };
  const CategoryDrinkbuttons = [] as HTMLElement[];
  const fetchCategories = await searchAllCategory();
  const fetchSliceCategory = fetchCategories.drinks?.slice(0, 5);
  const categoryBtnTimer = setTimeout(() => {
    fetchSliceCategory.forEach(async (category: CategoryTypes) => {
      const testid = await screen.findByTestId(`${category.strCategory}-category-filter`);
      CategoryDrinkbuttons.push(testid);
    });
  }, 4000);
  clearTimeout(categoryBtnTimer);
  test('testa category button', () => {
    render(
      <BrowserRouter>
        <SearchProvider>
          <Recipes />
        </SearchProvider>
      </BrowserRouter>,
    );
    const categoryTimer = setTimeout(() => {
      CategoryDrinkbuttons.forEach((category) => {
        expect(category).toBeInTheDocument();
      });
    }, 3000);
    clearTimeout(categoryTimer);
  });
  test('testa category list', async () => {
    render(
      <BrowserRouter>
        <SearchProvider>
          <Recipes />
        </SearchProvider>
      </BrowserRouter>,
    );
    const categoryTimer = setTimeout(() => {
      CategoryDrinkbuttons.forEach(async (category) => {
        await user.click(category);
        const fetch = await searchCategory(`${category.innerHTML}`);
        checkRecipes(fetch);
      });
    }, 3000);
    clearTimeout(categoryTimer);
  });
  test('testa o recipes padrão Drinks', async () => {
    render(
      <BrowserRouter>
        <SearchProvider>
          <Recipes />
        </SearchProvider>
      </BrowserRouter>,
    );
    const fetchStd = await searchName('');
    checkRecipes(fetchStd);
  });
  test('testa all category btn', async () => {
    render(
      <BrowserRouter>
        <SearchProvider>
          <Recipes />
        </SearchProvider>
      </BrowserRouter>,
    );
    const categoryTimer = setTimeout(async () => {
      const allCategoryBtn = await screen.findByTestId(AllCategoryBtn);
      await user.click(CategoryDrinkbuttons[0]);
      await user.click(allCategoryBtn);
      const fetchStd = await searchName('');
      checkRecipes(fetchStd);
    }, 3000);
    clearTimeout(categoryTimer);
  });
  test('testa todos alll category btn', async () => {
    render(
      <BrowserRouter>
        <SearchProvider>
          <Recipes />
        </SearchProvider>
      </BrowserRouter>,
    );
    const allCategoryBtn = await screen.findByTestId(AllCategoryBtn);
    CategoryDrinkbuttons.forEach(async (category) => {
      await user.click(category);
      await user.click(allCategoryBtn);
      const fetchStd = await searchName('');
      checkRecipes(fetchStd);
    });
  });
});
test('Compatibilidade com o searchbar First Letter', async () => {
  const user = userEvent.setup();
  render(
    <BrowserRouter>
      <SearchProvider>
        <App />
      </SearchProvider>
    </BrowserRouter>,
  );
  // window.location.pathname = '/meals';

  const searchTop = screen.getByTestId(searchTopBtn);
  await user.click(searchTop);
  const searchInput = await screen.findByTestId(seachInputBtn);
  await user.type(searchInput, 'l');
  const searchRadio = screen.getByTestId('first-letter-search-radio');
  await user.click(searchRadio);
  const execSerch = screen.getByTestId(execBtn);
  await user.click(execSerch);
  const fetch = await searchFirstLetter('l');
  const timer = setTimeout(() => {
    const mealsSlice = fetch.drinks?.slice(0, 12);
    mealsSlice.forEach(async (meal:DrinksCardType, i: number) => {
      const card = await screen.findByTestId(`${i}=recipe-card`);
      expect(card).toBeInTheDocument();
      expect(card).toHaveAttribute('href', `/meals${meal.idDrink}`);
    });
    mealsSlice.forEach(async (meal :DrinksCardType, i:number) => {
      const img = await screen.findByTestId(`${i}-card-img`);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', meal.strDrinkThumb);
      expect(img).toHaveAttribute('alt', meal.strDrink);
    });
    mealsSlice.forEach(async (element:DrinksCardType, i:number) => {
      const mealName = await screen.findByTestId(`${i}-card-name`);
      expect(mealName).toBeInTheDocument();
      expect(mealName).toHaveTextContent(element.strDrink);
    });
  }, 4000);
  clearTimeout(timer);
});
