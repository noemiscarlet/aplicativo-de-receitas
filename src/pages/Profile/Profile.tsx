import { Link, useNavigate } from 'react-router-dom';
import { Footer } from '../../componentes/Footer/Footer';

export default function Profile() {
  const navigate = useNavigate();
  const userJSON = localStorage.getItem('user');
  let emailUser;

  if (userJSON !== null) {
    const userObject = JSON.parse(userJSON);
    emailUser = userObject.email;
  } else {
    emailUser = false;
  }
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };
  return (
    <div>
      <div>
        <h3 data-testid="profile-email">{emailUser}</h3>
      </div>
      <div>
        <Link to="/done-recipes">
          <button data-testid="profile-done-btn">Done Recipes</button>
        </Link>
        <Link to="/favorite-recipes">
          <button data-testid="profile-favorite-btn">Favorite Recipes</button>
        </Link>
        <button
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}
