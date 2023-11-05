/* import '@testing-library/jest-dom/extend-expect';
import { vi } from 'vitest';
import Recipes from '../pages/Recipes/Recipes';
import renderWithRouter from './renderWithRouter';

import {
  mealsOrDrinks,
  searchIngredient,
  searchFirstLetter,
  searchName,
  searchCategory,
  searchAllCategory,
} from '../services/searchAPI';

const FUNCTION_NOT_IMPLEMENTED = 'Function not implemented.';
const FETCH_ERROR = 'fetch error';
const ERROR_ON_FETCH = 'should log an error if fetch fails';

describe('mealsOrDrinks', () => {
  test('should return meals endpoint if url includes /meals', () => {
    renderWithRouter(<Recipes />, { route: '/meals' });
    expect(mealsOrDrinks()).toBe('https://www.themealdb.com/api/json/v1/1/');
  });

  test('should return drinks endpoint if url does not include /meals', () => {
    renderWithRouter(<Recipes />, { route: '/drinks' });
    expect(mealsOrDrinks()).toBe('https://www.thecocktaildb.com/api/json/v1/1/');
  });
});

test('1 - Checks if fetch occurs with the right endpoint and an ingredient', async () => {
  renderWithRouter(<Recipes />, { route: '/meals' });
  const ingredient = 'chicken';
  const mockResponse = { data: 'mockData' };
  vi.spyOn(window, 'fetch').mockResolvedValueOnce({
    json: vi.fn().mockResolvedValueOnce(mockResponse),
    headers: new Headers({}),
    ok: false,
    redirected: false,
    status: 200,
    statusText: '',
    type: 'error',
    url: '',
    clone(): Response {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    body: null,
    bodyUsed: false,
    arrayBuffer(): Promise<ArrayBuffer> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    blob(): Promise<Blob> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    formData(): Promise<FormData> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    text(): Promise<string> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
  });

  await searchIngredient(ingredient);

  expect(window.fetch).toHaveBeenCalledWith(
    'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken',
  );
});

test('2 - Checks if the fetch returns the right ammount of data', async () => {
  const ingredient = 'chicken';
  const mockResponse = { data: 'mockData' };
  vi.spyOn(window, 'fetch').mockResolvedValueOnce({
    json: vi.fn().mockResolvedValueOnce(mockResponse),
    headers: new Headers({}),
    ok: false,
    redirected: false,
    status: 0,
    statusText: '',
    type: 'error',
    url: '',
    clone(): Response {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    body: null,
    bodyUsed: false,
    arrayBuffer(): Promise<ArrayBuffer> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    blob(): Promise<Blob> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    formData(): Promise<FormData> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    text(): Promise<string> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
  });

  const data = await searchIngredient(ingredient);

  expect(data).toBe(mockResponse);
});

it(ERROR_ON_FETCH, async () => {
  const ingredient = 'chicken';
  const mockError = new Error(FETCH_ERROR);
  vi.spyOn(window, 'fetch').mockRejectedValueOnce(mockError);
  console.log = vi.fn();

  await searchIngredient(ingredient);

  expect(console.log).toHaveBeenCalledWith(mockError);
});

test('3 - Checks if fetch occurs with the right endpoint (meals) and first letter', async () => {
  renderWithRouter(<Recipes />, { route: '/meals' });
  const firstLetter = 'a';
  const mockResponse = { data: 'mockData' };
  vi.spyOn(window, 'fetch').mockResolvedValueOnce({
    json: vi.fn().mockResolvedValueOnce(mockResponse),
    headers: new Headers({}),
    ok: false,
    redirected: false,
    status: 0,
    statusText: '',
    type: 'error',
    url: '',
    clone(): Response {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    body: null,
    bodyUsed: false,
    arrayBuffer(): Promise<ArrayBuffer> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    blob(): Promise<Blob> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    formData(): Promise<FormData> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    text(): Promise<string> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
  });

  await searchFirstLetter(firstLetter);

  expect(window.fetch).toHaveBeenCalledWith(
    'https://www.themealdb.com/api/json/v1/1/search.php?f=a',
  );
});

test('4 - Checks fetch return', async () => {
  const firstLetter = 'a';
  const mockResponse = { data: 'mockData' };
  vi.spyOn(window, 'fetch').mockResolvedValueOnce({
    json: vi.fn().mockResolvedValueOnce(mockResponse),
    headers: new Headers({}),
    ok: false,
    redirected: false,
    status: 0,
    statusText: '',
    type: 'error',
    url: '',
    clone(): Response {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    body: null,
    bodyUsed: false,
    arrayBuffer(): Promise<ArrayBuffer> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    blob(): Promise<Blob> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    formData(): Promise<FormData> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    text(): Promise<string> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
  });

  const data = await searchFirstLetter(firstLetter);

  expect(data).toBe(mockResponse);
});

it(ERROR_ON_FETCH, async () => {
  const firstLetter = 'a';
  const mockError = new Error(FETCH_ERROR);
  vi.spyOn(window, 'fetch').mockRejectedValueOnce(mockError);
  console.log = vi.fn();

  await searchFirstLetter(firstLetter);

  expect(console.log).toHaveBeenCalledWith(mockError);
});

test('5 - Checks if fetch occurs with the right endpoint and a name', async () => {
  renderWithRouter(<Recipes />, { route: '/drinks' });
  const name = 'vodka';
  const mockResponse = { data: 'mockData' };
  vi.spyOn(window, 'fetch').mockResolvedValueOnce({
    json: vi.fn().mockResolvedValueOnce(mockResponse),
    headers: new Headers({}),
    ok: false,
    redirected: false,
    status: 200,
    statusText: '',
    type: 'error',
    url: '',
    clone(): Response {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    body: null,
    bodyUsed: false,
    arrayBuffer(): Promise<ArrayBuffer> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    blob(): Promise<Blob> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    formData(): Promise<FormData> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    text(): Promise<string> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
  });

  await searchName(name);

  expect(window.fetch).toHaveBeenCalledWith(
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=vodka',
  );
});

test('6 - Checks fetched data', async () => {
  const name = 'vodka';
  const mockResponse = { data: 'mockData' };
  vi.spyOn(window, 'fetch').mockResolvedValueOnce({
    json: vi.fn().mockResolvedValueOnce(mockResponse),
    headers: new Headers({}),
    ok: false,
    redirected: false,
    status: 0,
    statusText: '',
    type: 'error',
    url: '',
    clone(): Response {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    body: null,
    bodyUsed: false,
    arrayBuffer(): Promise<ArrayBuffer> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    blob(): Promise<Blob> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    formData(): Promise<FormData> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    text(): Promise<string> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
  });

  const data = await searchName(name);

  expect(data).toBe(mockResponse);
});

it(ERROR_ON_FETCH, async () => {
  const name = 'chicken';
  const mockError = new Error(FETCH_ERROR);
  vi.spyOn(window, 'fetch').mockRejectedValueOnce(mockError);
  console.log = vi.fn();

  await searchName(name);

  expect(console.log).toHaveBeenCalledWith(mockError);
});

test('Checks if fetch occurs with the right endpoint and a category', async () => {
  renderWithRouter(<Recipes />, { route: '/meals' });
  const category = 'chicken';
  const mockResponse = { data: 'mockData' };
  vi.spyOn(window, 'fetch').mockResolvedValueOnce({
    json: vi.fn().mockResolvedValueOnce(mockResponse),
    headers: new Headers({}),
    ok: false,
    redirected: false,
    status: 0,
    statusText: '',
    type: 'error',
    url: '',
    clone(): Response {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    body: null,
    bodyUsed: false,
    arrayBuffer(): Promise<ArrayBuffer> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    blob(): Promise<Blob> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    formData(): Promise<FormData> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    text(): Promise<string> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
  });

  await searchCategory(category);

  expect(window.fetch).toHaveBeenCalledWith(
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=chicken',
  );
});

test('7 - Checks data returned from fetch', async () => {
  const category = 'chicken';
  const mockResponse = { data: 'mockData' };
  vi.spyOn(window, 'fetch').mockResolvedValueOnce({
    json: vi.fn().mockResolvedValueOnce(mockResponse),
    headers: new Headers({}),
    ok: false,
    redirected: false,
    status: 0,
    statusText: '',
    type: 'error',
    url: '',
    clone(): Response {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    body: null,
    bodyUsed: false,
    arrayBuffer(): Promise<ArrayBuffer> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    blob(): Promise<Blob> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    formData(): Promise<FormData> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    text(): Promise<string> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
  });

  const data = await searchCategory(category);

  expect(data).toBe(mockResponse);
});

it(ERROR_ON_FETCH, async () => {
  const category = 'chicken';
  const mockError = new Error(FETCH_ERROR);
  vi.spyOn(window, 'fetch').mockRejectedValueOnce(mockError);
  console.log = vi.fn();

  await searchCategory(category);

  expect(console.log).toHaveBeenCalledWith(mockError);
});

test('Checks if fetch occurs with the right endpoint', async () => {
  renderWithRouter(<Recipes />, { route: '/meals' });
  const mockResponse = { data: 'mockData' };
  vi.spyOn(window, 'fetch').mockResolvedValueOnce({
    json: vi.fn().mockResolvedValueOnce(mockResponse),
    headers: new Headers({}),
    ok: false,
    redirected: false,
    status: 0,
    statusText: '',
    type: 'error',
    url: '',
    clone(): Response {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    body: null,
    bodyUsed: false,
    arrayBuffer(): Promise<ArrayBuffer> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    blob(): Promise<Blob> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    formData(): Promise<FormData> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    text(): Promise<string> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
  });

  await searchAllCategory();

  expect(window.fetch).toHaveBeenCalledWith(
    'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
  );
});

test('Check fetched data', async () => {
  const mockResponse = { data: 'mockData' };
  vi.spyOn(window, 'fetch').mockResolvedValueOnce({
    json: vi.fn().mockResolvedValueOnce(mockResponse),
    headers: new Headers({}),
    ok: false,
    redirected: false,
    status: 0,
    statusText: '',
    type: 'error',
    url: '',
    clone(): Response {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    body: null,
    bodyUsed: false,
    arrayBuffer(): Promise<ArrayBuffer> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    blob(): Promise<Blob> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    formData(): Promise<FormData> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
    text(): Promise<string> {
      throw new Error(FUNCTION_NOT_IMPLEMENTED);
    },
  });

  const data = await searchAllCategory();

  expect(data).toBe(mockResponse);
});
 */
