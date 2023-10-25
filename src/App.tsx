import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Recipes from './pages/Recipes/Recipes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="recipesAppMain">
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/meals" element={ <Recipes /> } />
      </Routes>
    </div>
  );
}

export default App;
