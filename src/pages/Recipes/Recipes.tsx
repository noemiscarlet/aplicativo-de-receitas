import { useContext } from 'react';
import SearchContext from '../../context/SearchContext';
import { Footer } from '../../componentes/Footer/Footer';

export default function Meals() {
  const { resultsMealSearch } = useContext(SearchContext);
  return (
    <ul>
      {resultsMealSearch?.map((infoSearch) => (
        <li key={ infoSearch.idMeal }>
          <img
            src={ infoSearch.strMealThumb }
            alt={ infoSearch.strMeal }
            style={ { width: '150px' } }
          />
          {infoSearch.strMeal}
        </li>
      ))}
    </ul>
    <Footer />
  );
}
