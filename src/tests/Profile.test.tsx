import { screen } from '@testing-library/dom';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando a página profile', () => {
/*   test('Teste os elementos visiveis no Profile', () => {
    renderWithRouter(<App />, { route: '/profile' });

    const nameUser = screen.getByRole('heading', { level: 3 });
    expect(nameUser).toBeInTheDocument();

    const btnDoneRecipes = screen.getByRole('button', { name: /done recipes/i });
    expect(btnDoneRecipes).toBeInTheDocument();

    const btnFavoriteRecipes = screen.getByRole('button', { name: /favorite recipes/i });
    expect(btnFavoriteRecipes).toBeInTheDocument();

    const btnLogout = screen.getByRole('button', { name: /logout/i });
    expect(btnLogout).toBeInTheDocument();
  }); */
  test('Se ao clicar no botão Done Recipes, navega até a página Done Recipes', async () => {
    const { user } = renderWithRouter(<App />, { route: '/profile' });

    const btnDoneRecipes = screen.getByRole('button', { name: /done recipes/i });
    await user.click(btnDoneRecipes);

    const titleDoneRecipes = screen.getByRole('heading', { name: /done recipes/i });
    expect(titleDoneRecipes).toBeInTheDocument();
  });
  /*   test('Se ao clicar no botão Favorites Recipes, navega para a página Favorites recipes', async () => {
    const { user } = renderWithRouter(<App />, { route: '/profile' });

    const btnFavoriteRecipes = screen.getByRole('button', { name: /favorite recipes/i });
    await user.click(btnFavoriteRecipes);
    const titleFavorite = screen.getByText(/favorite recipes/i);
    expect(titleFavorite).toBeInTheDocument();
  }); */
  test('Se ao clicar botão Logout ele redireciona para a tela de Login', async () => {
    const { user } = renderWithRouter(<App />, { route: '/profile' });

    const btnLogout = screen.getByRole('button', { name: /logout/i });
    await user.click(btnLogout);

    const inputLogin = screen.getByText(/email/i);
    expect(inputLogin).toBeInTheDocument();
  });
  test('Se o email armazenado no localStorage é exibido na tela', async () => {
    const emailLocal = { email: 'usuario@teste.com' };
    localStorage.setItem('user', JSON.stringify(emailLocal));

    const { user } = renderWithRouter(<App />, { route: '/profile' });

    const emailUser = screen.getByText(/usuario@teste\.com/i);
    expect(emailUser).toBeInTheDocument();

    const btnLogout = screen.getByRole('button', { name: /logout/i });
    await user.click(btnLogout);

    localStorage.clear();

    const inputLogin = screen.getByText(/email/i);
    expect(inputLogin).toBeInTheDocument();
  });
});
