import { act, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { MEALSMOCK, RECOMMENDED_MOCK } from './testMocks/mocks';

const drinksMockData = { drinks: MEALSMOCK.drinks };
const mealsMockData = { meals: MEALSMOCK.meals };

const RECOMMENDED_DRINK_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const RECOMMENDED_MEAL_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const MOCKED_DRINK_ENDPOINT = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997';
const MOCKED_MEAL_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977';
const MOCKED_MEAL_ROUTE = '/meals/52977';
const MOCKED_DRINK_ROUTE = '/drinks/15997';

const START_RECIPE_BTN = 'start-recipe-btn';
const FAVORITE_BTN = 'favorite-btn';
const SHARE_BTN = 'share-btn';
const RECIPE_TITLE = 'recipe-title';
const RECIPE_CATEGORY = 'recipe-category';
const INSTRUCTIONS = 'instructions';
const VIDEO = 'video';
const INGREDIENT_NAME_AND_MEASURE = '5-ingredient-name-and-measure';

beforeEach(() => {
  const MOCK = (url: string) => Promise.resolve({
    status: 200,
    ok: true,
    json: () => {
      switch (url) {
        case MOCKED_DRINK_ENDPOINT:
          return Promise.resolve(drinksMockData);
        case RECOMMENDED_DRINK_ENDPOINT:
          return Promise.resolve(RECOMMENDED_MOCK.drinks);
        case MOCKED_MEAL_ENDPOINT:
          return Promise.resolve(mealsMockData);
        case RECOMMENDED_MEAL_ENDPOINT:
          return Promise.resolve(RECOMMENDED_MOCK.meals);
        default:
          return Promise.resolve();
      }
    },
  });

  global.fetch = vi.fn().mockImplementation(MOCK);
});

it('1 - Tests the API', async () => {
  await act(async () => {
    renderWithRouter(<App />, { route: MOCKED_MEAL_ROUTE });
  });

  expect(window.location.pathname).toBe(MOCKED_MEAL_ROUTE);

  expect(fetch).toHaveBeenCalledTimes(2);
});

it('2 - Tests the Favorite button', async () => {
  await act(async () => {
    renderWithRouter(<App />, { route: MOCKED_MEAL_ROUTE });
  });

  const favoriteBtn = screen.getByTestId(FAVORITE_BTN);
  userEvent.click(favoriteBtn);
});

it('3 - Tests the Share button', async () => {
  await act(async () => {
    renderWithRouter(<App />, { route: MOCKED_MEAL_ROUTE });
  });

  const shareBtn = screen.getByTestId(SHARE_BTN);
  userEvent.click(shareBtn);
});

it('4 - Tests the Start Recipe Button', async () => {
  await act(async () => {
    renderWithRouter(<App />, { route: MOCKED_MEAL_ROUTE });
  });

  const startRecipeBtn = screen.getByTestId(START_RECIPE_BTN);
  userEvent.click(startRecipeBtn);
});

it('5 - All elements are rendered correctly', async () => {
  await act(async () => {
    renderWithRouter(<App />, { route: MOCKED_MEAL_ROUTE });
  });

  const recipeTitle = screen.getByTestId(RECIPE_TITLE);
  const recipeCategory = screen.getByTestId(RECIPE_CATEGORY);
  const shareBtn = screen.getByTestId(SHARE_BTN);
  const favoriteBtn = screen.getByTestId(FAVORITE_BTN);
  const instructions = screen.getByTestId(INSTRUCTIONS);
  const startRecipeBtn = screen.getByTestId(START_RECIPE_BTN);
  const video = screen.getByTestId(VIDEO);
  const ingredient = screen.getByTestId(INGREDIENT_NAME_AND_MEASURE);

  expect(recipeTitle).toBeInTheDocument();
  expect(recipeCategory).toBeInTheDocument();
  expect(shareBtn).toBeInTheDocument();
  expect(favoriteBtn).toBeInTheDocument();
  expect(instructions).toBeInTheDocument();
  expect(startRecipeBtn).toBeInTheDocument();
  expect(video).toBeInTheDocument();

  expect(ingredient).toBeInTheDocument();
});

it('6 - All ingredients are rendered for the selected meal', async () => {
  await act(async () => {
    renderWithRouter(<App />, { route: MOCKED_MEAL_ROUTE });
  });

  const allIngredients = screen.getAllByTestId(/ingredient-name-and-measure/i);
  expect(allIngredients.length).toBeGreaterThanOrEqual(6);
});

it('7 - All ingredients are rendered for the selected drink', async () => {
  await act(async () => {
    renderWithRouter(<App />, { route: MOCKED_DRINK_ROUTE });
  });

  const allIngredients = screen.getAllByTestId(/ingredient-name-and-measure/i);
  expect(allIngredients.length).toBeGreaterThanOrEqual(3);
});
