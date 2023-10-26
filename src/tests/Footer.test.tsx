import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Footer } from '../componentes/Footer/Footer';

describe('Footer', () => {
  test('Verifica imagem e label button Drink', () => {
    render(
      <Router>
        <Footer />
      </Router>,
    );

    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    const drinksImage = screen.getByAltText('Botão de drinks, responsavel por te levar até a aba de drinks');

    expect(drinksButton).toContainElement(drinksImage);
  });

  test('Verifica imagem e label button Meals', () => {
    render(
      <Router>
        <Footer />
      </Router>,
    );

    const mealsButton = screen.getByTestId('meals-bottom-btn');
    const mealsImage = screen.getByAltText('Botão de comidas, responsavel por te levar até a aba de drinks');

    expect(mealsButton).toContainElement(mealsImage);
  });
});
