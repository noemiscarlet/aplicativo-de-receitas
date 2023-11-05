/* import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import FavoriteRecipes from '../pages/Recipes/FavoriteRecipes';

const NAME_TEST_ID = '0-horizontal-name';
const NAME_TEST_ID1 = '1-horizontal-name';

describe('FavoriteRecipes', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should render "Favorite Recipes" title', () => {
    render(
      <BrowserRouter>
        <FavoriteRecipes />
      </BrowserRouter>,
    );
    expect(screen.getByText('Favorite Recipes')).toBeInTheDocument();
  });

  test('should render filter buttons', () => {
    render(
      <BrowserRouter>
        <FavoriteRecipes />
      </BrowserRouter>,
    );
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /meals/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /drinks/i })).toBeInTheDocument();
  });

  test('should filter recipes by "all"', () => {
    const recipe1 = { id: 1, name: 'Recipe 1', type: 'meal', image: '', category: '', nationality: '', alcoholicOrNot: '' };
    const recipe2 = { id: 2, name: 'Recipe 2', type: 'drink', image: '', category: '', nationality: '', alcoholicOrNot: '' };
    localStorage.setItem('favoriteRecipes', JSON.stringify([recipe1, recipe2]));

    render(
      <BrowserRouter>
        <FavoriteRecipes />
      </BrowserRouter>,
    );
    expect(screen.getByTestId(NAME_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(NAME_TEST_ID1)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('filter-by-all-btn'));
    expect(screen.getByTestId(NAME_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(NAME_TEST_ID1)).toBeInTheDocument();
  });

  test('should filter recipes by "meal"', () => {
    const recipe1 = { id: 1, name: 'Recipe 1', type: 'meal', image: '', category: '', nationality: '', alcoholicOrNot: '' };
    const recipe2 = { id: 2, name: 'Recipe 2', type: 'drink', image: '', category: '', nationality: '', alcoholicOrNot: '' };
    localStorage.setItem('favoriteRecipes', JSON.stringify([recipe1, recipe2]));

    render(
      <BrowserRouter>
        <FavoriteRecipes />
      </BrowserRouter>,
    );
    expect(screen.getByTestId(NAME_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(NAME_TEST_ID1)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('filter-by-meal-btn'));
    expect(screen.getByTestId(NAME_TEST_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(NAME_TEST_ID1)).not.toBeInTheDocument();
  });

  test('should filter recipes by "drink"', () => {
    const recipe1 = { id: 1, name: 'Recipe 1', type: 'meal', image: '', category: '', nationality: '', alcoholicOrNot: '' };
    const recipe2 = { id: 2, name: 'Recipe 2', type: 'drink', image: '', category: '', nationality: '', alcoholicOrNot: '' };
    localStorage.setItem('favoriteRecipes', JSON.stringify([recipe1, recipe2]));

    render(
      <BrowserRouter>
        <FavoriteRecipes />
      </BrowserRouter>,
    );
    expect(screen.getByTestId(NAME_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(NAME_TEST_ID1)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('filter-by-drink-btn'));
    expect(screen.queryByTestId(NAME_TEST_ID1)).not.toBeInTheDocument();
    expect(screen.getByTestId(NAME_TEST_ID)).toBeInTheDocument();
  });
});
 */