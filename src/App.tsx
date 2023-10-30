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
        <Route path="/meals/:id" element={ <RecipeDetails /> } />
        <Route path="/drinks/:id" element={ <RecipeDetails /> } />
        {/* <Route path="/meals/:id-da-receita" element={ <RecipeDetails /> } /> */}
        {/* <Route path="/meals/:id-da-receita/in-progress" element={ <Recipes /> } /> */}
        {/* <Route path="/drinks/:id-da-receita" element={ <Drinks /> } /> */}
        {/* <Route path="/drinks/:id-da-receita/in-progress" element={ <Drinks /> } /> */}
      </Routes>
    </div>
  );
}

export default App;
