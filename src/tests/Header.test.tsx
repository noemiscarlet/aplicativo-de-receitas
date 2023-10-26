import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando o Componente Header', () => {
  test('Testa os elementos visiveis no campo header', () => {
    renderWithRouter(<App />, { route: '/meals' });

    const titlePage = screen.getByRole('heading', { name: /meals/i });
    const iconProfile = screen.getByRole('img', { name: /icone de perfil/i });
    const buttonSearch = screen.getByRole('img', { name: /icone de pesquisa/i });
    expect(buttonSearch).toBeInTheDocument();
    expect(titlePage).toBeInTheDocument();
    expect(iconProfile).toBeInTheDocument();
  });
  test('Testa os direcionamentos dos icones', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const buttonSearch = screen.getByRole('button', { name: 'icone de pesquisa' });
    await user.click(buttonSearch);

    const inputSearch = screen.getByTestId('search-input');

    expect(inputSearch).toBeInTheDocument();
    const iconProfile = screen.getByRole('img', { name: /icone de perfil/i });

    await user.click(iconProfile);
    const titleProfile = screen.getByRole('heading', { name: /profile/i });

    expect(titleProfile).toBeInTheDocument();
  });
  test('Teste o compomente Header na tela Drinks', () => {
    renderWithRouter(<App />, { route: '/drinks' });

    const titleDrink = screen.getByRole('heading', { name: /drinks/i });
    expect(titleDrink).toBeInTheDocument();
  });
  test('Teste o compomente Header na tela Done Recipes', () => {
    renderWithRouter(<App />, { route: '/done-recipes' });

    const titleDrink = screen.getByRole('heading', { name: /done recipes/i });
    expect(titleDrink).toBeInTheDocument();
  });
  test('Teste o compomente Header na tela Favorite Recipes', () => {
    renderWithRouter(<App />, { route: '/favorite-recipes' });

    const titleDrink = screen.getByRole('heading', { name: /favorite recipes/i });
    expect(titleDrink).toBeInTheDocument();
  });
  test('Teste o compomente Header na tela Profile', () => {
    renderWithRouter(<App />, { route: '/profile' });

    const titleDrink = screen.getByRole('heading', { name: /profile/i });
    const imgProfile = screen.getByRole('img', { name: /icone de perfil/i });
    expect(titleDrink).toBeInTheDocument();
    expect(imgProfile).toBeInTheDocument();
  });
  test('Teste o compomente Header na tela Profile', () => {
    renderWithRouter(<App />, { route: '/*' });

    const titleDrink = screen.getByRole('heading', { name: /not found/i });
    expect(titleDrink).toBeInTheDocument();
  });
});
