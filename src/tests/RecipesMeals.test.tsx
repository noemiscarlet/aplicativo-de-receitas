/* import { render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { CategoryTypes, MealsCardType } from '../types/types';
import SearchProvider from '../context/SearchProvider';
import App from '../App';
import { fetchCategoriesMeals, fetchCategoryListMeals, fetchDefaultMeals } from '../Mocks/fetch';
import * as search from '../services/searchAPI';
import { mealsFetch } from '../Mocks/fetchdefault';
import { beefFetch } from '../Mocks/fetchCategory';

const mealsRoute = '/meals';

const AllCategoryBtn = 'All-category-filter';
const footerBtn = 'meals-bottom-btn';
const Category = async () => {
  const Categories = await search.searchAllCategory();
  return Categories.meals?.slice(0, 5);
};
const checkRecipes = async (fetch: any) => {
  const mealsSlice = fetch.meals?.slice(0, 12);
  mealsSlice.forEach(async (meal:MealsCardType, i: number) => {
    const card = await screen.findByTestId(`${i}-recipe-card`);
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute('href', `/meals/${meal.idMeal}`);
  });
  expect(screen.queryByTestId('12-recipe-card')).toBeNull();
};
describe('testando recipes req 19-23 meals', async () => {
  beforeEach(() => {
    vi.spyOn(search, 'searchAllCategory').mockReturnValue(Promise.resolve(fetchCategoriesMeals));
    vi.spyOn(search, 'searchName').mockReturnValue(Promise.resolve(fetchDefaultMeals));
    vi.spyOn(search, 'searchCategory').mockReturnValue(Promise.resolve(fetchCategoryListMeals[0]));
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('testa category button', async () => {
    render(
      <MemoryRouter initialEntries={ [mealsRoute] }>
        <SearchProvider>
          <App />
        </SearchProvider>
      </MemoryRouter>,
    );
    const user = userEvent.setup();
    const mealsButton = screen.getByTestId(footerBtn);
    await user.click(mealsButton);
    const Categories = await search.searchAllCategory();
    Categories.meals?.slice(0, 5);
    const fetchSliceCategory = await Category();
    fetchSliceCategory.forEach(async (category: CategoryTypes) => {
      const testid = await screen.findByTestId(`${category.strCategory}-category-filter`);
      expect(testid).toBeInTheDocument();
      expect(testid).toHaveTextContent(category.strCategory);
    });
  });
  test('testa All Category btn', async () => {
    render(
      <MemoryRouter initialEntries={ [mealsRoute] }>
        <SearchProvider>
          <App />
        </SearchProvider>
      </MemoryRouter>,
    );
    const user = userEvent.setup();
    const mealsButton = screen.getByTestId(footerBtn);
    await user.click(mealsButton);
    const fetchSliceCategory = await Category();
    const beefButton = await screen.findByTestId(`${fetchSliceCategory[0].strCategory}-category-filter`);
    const allCategoryBtn = await screen.findByTestId(AllCategoryBtn);
    await user.click(beefButton);
    await user.click(allCategoryBtn);
    const fetchStd = { meals: mealsFetch };
    checkRecipes(fetchStd);
  });
  test('testa category beef', async () => {
    render(
      <MemoryRouter initialEntries={ [mealsRoute] }>
        <SearchProvider>
          <App />
        </SearchProvider>
      </MemoryRouter>,
    );
    const user = userEvent.setup();
    const mealsButton = screen.getByTestId(footerBtn);
    await user.click(mealsButton);
    const fetchSliceCategory = await Category();
    const beefButton = await screen.findByTestId(`${fetchSliceCategory[0].strCategory}-category-filter`);
    await user.click(beefButton);
    const fetchBeef = { meals: beefFetch };
    checkRecipes(fetchBeef);
    await user.click(beefButton);
    const fetchStd = { meals: mealsFetch };
    checkRecipes(fetchStd);
  });
  test('testa todos alll category btn', async () => {
    render(
      <MemoryRouter initialEntries={ [mealsRoute] }>
        <SearchProvider>
          <App />
        </SearchProvider>
      </MemoryRouter>,
    );
    const user = userEvent.setup();
    const mealsButton = screen.getByTestId(footerBtn);
    await user.click(mealsButton);
    const allCategoryBtn = await screen.findByTestId(AllCategoryBtn);
    const fetchSliceCategory = await Category();
    fetchSliceCategory.forEach(async (category:CategoryTypes) => {
      const btn = await screen.findByTestId(`${category.strCategory}-category-filter`);
      await user.click(btn);
      await user.click(allCategoryBtn);
      const fetchStd = { meals: mealsFetch };
      checkRecipes(fetchStd);
    });
  });
  test('testa o recipes padrão meals', async () => {
    render(
      <MemoryRouter initialEntries={ [mealsRoute] }>
        <SearchProvider>
          <App />
        </SearchProvider>
      </MemoryRouter>,
    );
    const user = userEvent.setup();
    const mealsButton = screen.getByTestId(footerBtn);
    await user.click(mealsButton);
    const fetchStd = { meals: mealsFetch as MealsCardType[] };
    checkRecipes(fetchStd);
    const img = await screen.findByTestId('0-card-img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', fetchStd.meals[0].strMealThumb);
    expect(img).toHaveAttribute('alt', fetchStd.meals[0].strMeal);
    const mealName = await screen.findByTestId('0-card-name');
    expect(mealName).toBeInTheDocument();
    expect(mealName).toHaveTextContent(fetchStd.meals[0].strMeal);
  });
});
 */