import { NavLink } from 'react-router-dom';
import './footer.css';

export function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <NavLink to="/drinks">
        <img
          src="../../../src/images/drinkIcon.svg"
          alt="Botão de drinks, responsavel por te levar até a aba de drinks"
          data-testid="drinks-bottom-btn"
        />
      </NavLink>
      <NavLink to="/meals">
        <img
          src="../../../src/images/mealIcon.svg"
          alt="Botão de comidas, responsavel por te levar até a aba de drinks"
          data-testid="meals-bottom-btn"
        />
      </NavLink>
    </footer>
  );
}
