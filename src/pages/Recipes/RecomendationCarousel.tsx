import { useLocation } from 'react-router-dom';
import { MealsCardType, DrinksCardType } from '../../types/types';

type RecomendationCarouselProps = {
  recomendation: MealsCardType[] | DrinksCardType[],
};

function RecomendationCarousel({ recomendation }: RecomendationCarouselProps) {
  const { pathname } = useLocation();

  return (
    <div className="carousel">
      { pathname.includes('/meals')
        ? recomendation?.slice(0, 6).map(({ strDrink, strDrinkThumb }:any, index) => (
          <div
            data-testid={ `${index}-recommendation-card` }
            key={ index }
          >
            <h1
              data-testid={ `${index}-recommendation-title` }
            >
              { strDrink }
            </h1>
            <img
              src={ strDrinkThumb }
              alt={ strDrink }
            />
          </div>
        ))

        : recomendation?.slice(0, 6).map(({ strMeal, strMealThumb }:any, index) => (
          <div
            data-testid={ `${index}-recommendation-card` }
            key={ index }
          >
            <h1 data-testid={ `${index}-recommendation-title` }>
              { strMeal }
            </h1>
            <img src={ strMealThumb } alt={ strMeal } />
          </div>
        ))}
    </div>
  );
}

export default RecomendationCarousel;
