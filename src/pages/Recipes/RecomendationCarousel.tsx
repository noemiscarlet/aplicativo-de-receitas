import { useLocation } from 'react-router-dom';
import { MealsCardType, DrinksCardType } from '../../types/types';

type RecomendationCarouselProps = {
  recomendation: MealsCardType[] | DrinksCardType[],
};

function RecomendationCarousel({ recomendation }: RecomendationCarouselProps) {
  const { pathname } = useLocation();

  return (
    <div className="carousel" style={ { overflowX: 'scroll', whiteSpace: 'nowrap' } }>
      { pathname.includes('/drinks')
        ? recomendation?.slice(0, 6).map(({ strMeal, strMealThumb }:any, index) => (
          <div
            key={ index }
            style={ { display: 'inline-block', width: '50%' } }
          >
            <h1
              data-testid={ `${index}-recommendation-title` }
            >
              { strMeal }
            </h1>
            <img
              data-testid={ `${index}-recommendation-card` }
              src={ strMealThumb }
              alt={ strMeal }
              style={
                { width: '90%', height: 'auto' }
              }
            />
          </div>
        ))

        : recomendation?.slice(0, 6).map(({ strDrink, strDrinkThumb }:any, index) => (
          <div
            key={ index }
            style={ { display: 'inline-block', width: '50%' } }
          >
            <h1 data-testid={ `${index}-recommendation-title` }>
              { strDrink }
            </h1>
            <img
              data-testid={ `${index}-recommendation-card` }
              style={
              { width: '90%', height: 'auto' }
            }
              src={ strDrinkThumb }
              alt={ strDrink }
            />
          </div>
        ))}
    </div>
  );
}

export default RecomendationCarousel;
