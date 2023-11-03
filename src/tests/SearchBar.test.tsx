import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { fetchSearchName } from '../Mocks/fetch';
import SearchProvider from '../context/SearchProvider';
import { MealsCardType } from '../types/types';
import * as search from '../services/searchAPI';
import { soup } from '../Mocks/FetchSearchName';

const execBtn = 'exec-search-btn';
const seachInputBtn = 'search-input';
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
    const fetch = { meals: soup };
    fetch.meals.forEach(async (meal:MealsCardType, i: number) => {
      const card = await screen.findByTestId(`${i}-recipe-card`);
      expect(card).toBeInTheDocument();
      expect(card).toHaveAttribute('href', `/meals${meal.idMeal}`);
      const img = await screen.findByTestId(`${i}-card-img`);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', meal.strMealThumb);
      expect(img).toHaveAttribute('alt', meal.strMeal);
      const mealName = await screen.findByTestId(`${i}-card-name`);
      expect(mealName).toBeInTheDocument();
      expect(mealName).toHaveTextContent(meal.strMeal);
    });
  });
});
