import { useLocation, Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import SearchContext from '../context/SearchContext';

function Header() {
  const { searchText, setSearchText } = useContext(SearchContext);
  const [showInput, setShowInput] = useState(false);
  // const [searchText, setSearchText] = useState('');
  const location = useLocation();
  const notSearch = ['/meals', '/drinks'].includes(location.pathname);

  let titlePage = '';
  useEffect(() => {
    setShowInput(false);
  }, [location.pathname]);

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
    default:
      titlePage = 'Favorite Recipes';
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
          <SearchBar />
        </div>
      )}
    </header>
  );
}

export default Header;
