import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import App from '../App';
import { fetchCategoriesDrinks, fetchDefaultDrinks, fetchCategoryListDrinks } from '../Mocks/fetch';
import { ordinaryDrinkFetch } from '../Mocks/fetchCategory';
import { drinksFetch } from '../Mocks/fetchdefault';
import SearchProvider from '../context/SearchProvider';
import Recipes from '../pages/Recipes/Recipes';
import { DrinksCardType, CategoryTypes } from '../types/types';
import renderWithRouter from './renderWithRouter';
import * as search from '../services/searchAPI';

const drinksRoute = '/drinks';
const AllCategoryBtn = 'All-category-filter';
const checkRecipes = async (fetch: any) => {
  const mealsSlice = fetch.drinks?.slice(0, 12);
  mealsSlice.forEach(async (drink:DrinksCardType, i: number) => {
    const card = await screen.findByTestId(`${i}-recipe-card`);
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute('href', `/drinks/${drink.idDrink}`);
  });
  expect(screen.queryByTestId('12-recipe-card')).toBeNull();
};
describe('testando recipes req 19-23 drinks', async () => {
  beforeEach(() => {
    vi.spyOn(search, 'searchAllCategory').mockReturnValue(Promise.resolve(fetchCategoriesDrinks));
    vi.spyOn(search, 'searchName').mockReturnValue(Promise.resolve(fetchDefaultDrinks));
    vi.spyOn(search, 'searchCategory').mockReturnValue(Promise.resolve(fetchCategoryListDrinks[0]));
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('category', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={ [drinksRoute] }>
        <SearchProvider>
          <App />
        </SearchProvider>
      </MemoryRouter>,
    );
    const Categories = await search.searchAllCategory();
    const fetchSliceCategory = Categories.drinks?.slice(0, 5);
    test('testa category button', async () => {
      renderWithRouter(<Recipes />, { route: '/drinks' });
      fetchSliceCategory.forEach(async (category: CategoryTypes) => {
        const testid = await screen.findByTestId(`${category.strCategory}-category-filter`);
        expect(testid).toBeInTheDocument();
        expect(testid).toHaveTextContent(category.strCategory);
      });
      test('testa All Category btn', async () => {
        render(
          <MemoryRouter initialEntries={ [drinksRoute] }>
            <SearchProvider>
              <App />
            </SearchProvider>
          </MemoryRouter>,
        );
        const ordinaryButton = await screen.findByTestId(`${fetchSliceCategory[0].strCategory}-category-filter`);
        const allCategoryBtn = await screen.findByTestId(AllCategoryBtn);
        await user.click(ordinaryButton);
        await user.click(allCategoryBtn);
        const fetchStd = { drinks: drinksFetch };
        checkRecipes(fetchStd);
      });
      test('testa category list', async () => {
        render(
          <MemoryRouter initialEntries={ [drinksRoute] }>
            <SearchProvider>
              <App />
            </SearchProvider>
          </MemoryRouter>,
        );
        const ordinaryButton = await screen.findByTestId(`${fetchSliceCategory[0].strCategory}-category-filter`);
        await user.click(ordinaryButton);
        const fetchOrdinary = { drinks: ordinaryDrinkFetch };
        checkRecipes(fetchOrdinary);
        const fetchStd = { drinks: drinksFetch };
        checkRecipes(fetchStd);
      });
    });
  });
  test('testa o recipes padrão drinks', async () => {
    render(
      <MemoryRouter initialEntries={ [drinksRoute] }>
        <SearchProvider>
          <App />
        </SearchProvider>
      </MemoryRouter>,
    );
    const drink = { drinks: drinksFetch };
    const fetchStd = await search.searchName('');
    checkRecipes(fetchStd);
    const img = await screen.findByTestId('0-card-img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', drink.drinks[0].strDrinkThumb);
    expect(img).toHaveAttribute('alt', drink.drinks[0].strDrink);
    const mealName = await screen.findByTestId('0-card-name');
    expect(mealName).toBeInTheDocument();
    expect(mealName).toHaveTextContent(drink.drinks[0].strDrink);
  });
});
