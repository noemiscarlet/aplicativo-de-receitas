import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import { fetchSearchName } from '../Mocks/fetch';
import SearchProvider from '../context/SearchProvider';
import { DrinksCardType } from '../types/types';
import * as search from '../services/searchAPI';
import Recipes from '../pages/Recipes/Recipes';

const searchTopBtn = 'search-top-btn';
const execBtn = 'exec-search-btn';
const seachInputBtn = 'search-input';
const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const EMAIL_VALUE = 'xablau@xablau.com';
const EMAIL_VALUE_NOT_OK = 'xablau';
const PASSWORD_VALUE = '1234567';
const PASSWORD_VALUE_NOT_OK = '1237';
const BTN_ENTER = 'login-submit-btn';
describe('searchBar', async () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    vi.spyOn(search, 'searchName').mockReturnValue(Promise.resolve(fetchSearchName));
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('Compatibilidade com o searchbar First Letter', async () => {
    const user = userEvent.setup();
    const mealsRoute = '/meals';
    render(
      <MemoryRouter initialEntries={ [mealsRoute] }>
        <SearchProvider>
          <App />
        </SearchProvider>
      </MemoryRouter>,
    );
    const searchTop = screen.getByRole('img', {
      name: /icone de pesquisa/i,
    });
    await user.click(searchTop);
    const searchInput = await screen.findByTestId(seachInputBtn);
    await user.type(searchInput, 'soup');
    const searchRadio = screen.getByTestId('name-search-radio');
    await user.click(searchRadio);
    const execSerch = screen.getByTestId(execBtn);
    await user.click(execSerch);
    const fetch = await search.searchName('');
    console.log('fetch', fetch);
    fetch.meals.forEach(async (meal:DrinksCardType, i: number) => {
      const card = await screen.findByTestId(`${i}-recipe-card`);
      expect(card).toBeInTheDocument();
      expect(card).toHaveAttribute('href', `/meals${meal.idDrink}`);
      const img = await screen.findByTestId(`${i}-card-img`);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', meal.strDrinkThumb);
      expect(img).toHaveAttribute('alt', meal.strDrink);
      const mealName = await screen.findByTestId(`${i}-card-name`);
      expect(mealName).toBeInTheDocument();
      expect(mealName).toHaveTextContent(meal.strDrink);
    });
  });
});
