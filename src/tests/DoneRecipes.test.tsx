import { screen } from '@testing-library/dom';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const URL_DONERECIPES = '/done-recipes';
const NAME_DATA_IN = '0-horizontal-done-date';
const IMAGE_MEAL = 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg';
const IMAGE_DRINK = 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg';

describe('Testando o estado inicial da aplicação', () => {
  test('Teste se a página está sendo renderizada corretamente', () => {
    const doneRecipes = [
      {
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: IMAGE_MEAL,
        doneDate: '23/06/2020',
        tags: ['Pasta', 'Curry'],
      },
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: IMAGE_DRINK,
        doneDate: '23/06/2020',
        tags: [],
      },
    ];
    const doneRecipesJSON = JSON.stringify(doneRecipes);
    localStorage.setItem('doneRecipes', doneRecipesJSON);

    renderWithRouter(<App />, { route: URL_DONERECIPES });

    // testando se os botões All, Meals, Drinks estão visiveis na tela
    const titlePage = screen.getByRole('heading', { name: /done recipes/i });
    const btnAll = screen.getByRole('button', { name: /all/i });
    const btnMeals = screen.getByRole('button', { name: /meals/i });
    const btnDrinks = screen.getByRole('button', { name: /drinks/i });

    expect(titlePage).toBeInTheDocument();
    expect(btnAll).toBeInTheDocument();
    expect(btnMeals).toBeInTheDocument();
    expect(btnDrinks).toBeInTheDocument();

    // Verificando se a lista de receitas está sendo renderizada
    // Meal
    const imgMeals = screen.getByRole('img', { name: /spicy arrabiata penne/i });
    const nameMeals = screen.getByText(/spicy arrabiata penne/i);
    const dateIn = screen.getByTestId(NAME_DATA_IN);
    const nationality = screen.getByText(/italian - vegetarian/i);
    const nameTags = screen.getByText(/Pasta/i);

    expect(imgMeals).toHaveAttribute('src', IMAGE_MEAL);
    expect(nameMeals).toBeInTheDocument();
    expect(dateIn).toBeInTheDocument();
    expect(nationality).toBeInTheDocument();
    expect(nameTags).toBeInTheDocument();

    // Drink
    const imgDrink = screen.getByRole('img', { name: /aquamarine/i });
    const nameDrink = screen.getByText(/aquamarine/i);
    const alcoholic = screen.getByText(/alcoholic/i);
    const btnShare = screen.getAllByRole('button', { name: /botão de compartilhar/i });
    const nameCategoryDrink = screen.getByText(/cocktail/i);

    expect(nameCategoryDrink).toBeInTheDocument();
    btnShare.forEach((btnShares) => {
      expect(btnShares).toBeInTheDocument();
    });
    expect(imgDrink).toHaveAttribute('src', IMAGE_DRINK);
    expect(nameDrink).toBeInTheDocument();
    expect(alcoholic).toBeInTheDocument();
  });
});
describe('Teste se, ao clicar nos botões "All," "Meals," ou "Drinks," a lista de receitas é filtrada corretamente de acordo com o tipo selecionado.', () => {
  test('Teste o click no botão Meals', async () => {
    const { user } = renderWithRouter(<App />, { route: URL_DONERECIPES });

    const btnMeals = screen.getByRole('button', { name: /meals/i });

    await user.click(btnMeals);
    const imgMeals = screen.getByRole('img', { name: /spicy arrabiata penne/i });
    const nameMeals = screen.getByText(/spicy arrabiata penne/i);
    const dateIn = screen.getByTestId(NAME_DATA_IN);
    const nationality = screen.getByText(/italian - vegetarian/i);
    const nameTags = screen.getByText(/Pasta/i);
    const btnShareMeal = screen.getByRole('button', { name: /botão de compartilhar/i });

    expect(imgMeals).toHaveAttribute('src', IMAGE_MEAL);
    expect(nameMeals).toBeInTheDocument();
    expect(dateIn).toBeInTheDocument();
    expect(nationality).toBeInTheDocument();
    expect(nameTags).toBeInTheDocument();
    expect(btnShareMeal).toBeInTheDocument();

    // testando o botão de compartilhar Meal
    await user.click(btnShareMeal);
    const msgLinkCopied = screen.getByText(/link copied!/i);

    expect(msgLinkCopied).toBeInTheDocument();
  });
  test('Teste clicando no botão Drinks e All', async () => {
    const { user } = renderWithRouter(<App />, { route: URL_DONERECIPES });

    const btnDrinks = screen.getByRole('button', { name: /drinks/i });

    await user.click(btnDrinks);
    const imgDrink = screen.getByRole('img', { name: /aquamarine/i });
    const nameDrink = screen.getByText(/aquamarine/i);
    const alcoholic = screen.getByText(/alcoholic/i);
    const btnShareDrink = screen.getByRole('button', { name: /botão de compartilhar/i });
    const nameCategoryDrink = screen.getByText(/cocktail/i);

    expect(nameCategoryDrink).toBeInTheDocument();
    expect(imgDrink).toHaveAttribute('src', IMAGE_DRINK);
    expect(nameDrink).toBeInTheDocument();
    expect(alcoholic).toBeInTheDocument();
    expect(btnShareDrink).toBeInTheDocument();

    // Testando o botão de compartilhar Drink
    await user.click(btnShareDrink);

    const msgLinkCopied = screen.getByText(/link copied!/i);
    expect(msgLinkCopied).toBeInTheDocument();

    // clicando no botão All
    const btnAll = screen.getByRole('button', { name: /all/i });

    await user.click(btnAll);

    const imgMeals = screen.getByRole('img', { name: /spicy arrabiata penne/i });
    const nameMeals = screen.getByText(/spicy arrabiata penne/i);
    const dateIn = screen.getByTestId('0-horizontal-done-date');
    const nationality = screen.getByText(/italian - vegetarian/i);
    const nameTags = screen.getByText(/Pasta/i);

    const imgDrinks = screen.getByRole('img', { name: /aquamarine/i });
    const nameDrinks = screen.getByText(/aquamarine/i);
    const alcoholics = screen.getByText(/alcoholic/i);
    const btnShare = screen.getAllByRole('button', { name: /botão de compartilhar/i });
    const nameCategoryDrinks = screen.getByText(/cocktail/i);

    expect(imgMeals).toHaveAttribute('src', IMAGE_MEAL);
    expect(nameMeals).toBeInTheDocument();
    expect(dateIn).toBeInTheDocument();
    expect(nationality).toBeInTheDocument();
    expect(nameTags).toBeInTheDocument();

    expect(nameCategoryDrinks).toBeInTheDocument();
    btnShare.forEach((btnShares) => {
      expect(btnShares).toBeInTheDocument();
    });
    expect(imgDrinks).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    expect(nameDrinks).toBeInTheDocument();
    expect(alcoholics).toBeInTheDocument();
  });
});
