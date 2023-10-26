import { useLocation, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Search from './Search';
import SearchContext from '../context/SearchContext';

function Header() {
  const { searchText, setSearchText } = useContext(SearchContext);
  const [showInput, setShowInput] = useState(false);
  // const [searchText, setSearchText] = useState('');
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
      {showInput && (
        <div>
          <input
            type="text"
            name=""
            id=""
            value={ searchText }
            onChange={ (e) => setSearchText(e.target.value) }
            data-testid="search-input"
          />
        </div>
      )}
      <Search />
    </header>
  );
}

export default Header;
