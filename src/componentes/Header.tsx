import { useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [showInput, setShowInput] = useState(false);
  const location = useLocation();
  const notSearch = ['/meals', '/drinks'].includes(location.pathname);

  let titlePage = '';

  switch (location.pathname) {
    case '/meals':
      titlePage = 'Meals';
      break;
    case '/drinks':
      titlePage = 'Drinks';
      break;
    case '/profile':
      titlePage = 'Profile';
      break;
    case '/done-recipes':
      titlePage = 'Done Recipes';
      break;
    case '/favorite-recipes':
      titlePage = 'Favorite Recipes';
      break;
    default:
      titlePage = 'Not Found';
  }
  return (
    <header>
      <nav>
        <Link to="/profile">
          <img
            src={ profileIcon }
            alt="icone de perfil"
            data-testid="profile-top-btn"
          />
        </Link>
        {notSearch && (
          <button
            onClick={ () => setShowInput(!showInput) }
          >
            <img
              src={ searchIcon }
              alt="icone de pesquisa"
              data-testid="search-top-btn"
            />
          </button>
        )}
      </nav>
      <h1 data-testid="page-title">{titlePage}</h1>
      {showInput && <input
        type="text"
        name=""
        id=""
        data-testid="search-input"
      />}
    </header>
  );
}

export default Header;
