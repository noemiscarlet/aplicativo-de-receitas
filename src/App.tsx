import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Recipes from './pages/Recipes/Recipes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './componentes/Layout';
import Profile from './pages/Profile/Profile';
import RecipeDetails from './pages/Recipes/RecipeDetails';
import DoneRecipes from './pages/Recipes/DoneRecipes';
import FavoriteRecipes from './pages/Recipes/FavoriteRecipes';
import RecipeInProgress from './pages/Recipes/RecipeInProgress';

function App() {
  return (
    <div className="recipesAppMain">
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route element={ <Layout /> }>
          <Route path="/meals" element={ <Recipes /> } />
          <Route path="/drinks" element={ <Recipes /> } />
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/done-recipes" element={ <DoneRecipes /> } />
          <Route path="favorite-recipes" element={ <FavoriteRecipes /> } />
        </Route>
        <Route path="/meals/:idDaReceita" element={ <RecipeDetails /> } />
        <Route path="/drinks/:idDaReceita" element={ <RecipeDetails /> } />
        <Route
          path="/meals/:idDaReceita/in-progress"
          element={ <RecipeInProgress /> }
        />
        <Route
          path="/drinks/:idDaReceita/in-progress"
          element={ <RecipeInProgress /> }
        />
      </Routes>
    </div>
  );
}

export default App;
