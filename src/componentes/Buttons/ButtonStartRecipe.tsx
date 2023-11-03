import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { InProgressRecipesTypes } from '../../types/types';

function ButtonStartRecipe() {
  const { pathname } = useLocation();
  const { idDaReceita }:any = useParams();
  const start: string = 'Start Recipe';
  const go: string = 'Continue Recipe';
  const [startOrContinue, setStartOrContinue] = useState(start);
  const [inProgressRecipes, setInProgressRecipes] = useState(
    {} as InProgressRecipesTypes,
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes') === null) {
      localStorage
        .setItem('inProgressRecipes', JSON.stringify({
          meals: { [idDaReceita]: [] },
          drinks: { [idDaReceita]: [] },
        }));
    }

    const getInProgressRecipes = JSON
      .parse(localStorage.getItem('inProgressRecipes') as string);

    setInProgressRecipes(getInProgressRecipes);
    function requestIdApi() {
      if (pathname.includes('/meals')) {
        const inProgressRecipesIds = Object.keys(getInProgressRecipes.meals);
        const continueOrStart = inProgressRecipesIds?.includes(idDaReceita)
          ? go
          : start;
        setStartOrContinue(continueOrStart);
      }
      if (pathname.includes('/drinks')) {
        const inProgressRecipesIds = Object.keys(getInProgressRecipes.drinks);
        const continueOrStart = inProgressRecipesIds?.includes(idDaReceita)
          ? go
          : start;
        setStartOrContinue(continueOrStart);
      }
    }
    requestIdApi();
  }, [idDaReceita, pathname]);
  function Navigate() {
    if (pathname.includes('/meals') && startOrContinue === start) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: { ...inProgressRecipes.meals, [idDaReceita]: [] },
        drinks: { ...inProgressRecipes.drinks },
      }));
      return navigate(`/meals/${idDaReceita}/in-progress`);
    } if (pathname.includes('/meals') && startOrContinue === go) {
      return navigate(`/meals/${idDaReceita}/in-progress`);
    }

    if (pathname.includes('/drinks') && startOrContinue === start) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: { ...inProgressRecipes.meals },
        drinks: { ...inProgressRecipes.drinks, [idDaReceita]: [] },
      }));
      return navigate(`/drinks/${idDaReceita}/in-progress`);
    }
    if (pathname.includes('/drinks') && startOrContinue === go) {
      return navigate(`/drinks/${idDaReceita}/in-progress`);
    }
  }
  return (
    <div>
      <div>
        <button
          type="button"
          onClick={ Navigate }
          className="position"
          data-testid="start-recipe-btn"
        >
          {startOrContinue}
        </button>
      </div>
    </div>
  );
}
export default ButtonStartRecipe;
