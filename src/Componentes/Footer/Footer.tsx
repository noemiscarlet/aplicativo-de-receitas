import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer>
      <Link to="/drinks">
        <button data-testid="drinks-bottom-btn">
          <img
            src="../../../src/images/drinkIcon.svg"
            alt="Botão de drinks, responsavel por te levar até a aba de drinks"
          />
        </button>
      </Link>
      <Link to="/meals">
        <button data-testid="meals-bottom-btn">
          <img
            src="../../../src/images/mealIcon.svg"
            alt="Botão de comidas, responsavel por te levar até a aba de drinks"
          />
        </button>
      </Link>
    </footer>
  );
}
