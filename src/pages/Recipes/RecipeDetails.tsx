import { useEffect } from 'react';
import { apiDrinkId, apiFoodId } from '../../Services/API';

function RecipeDetails() {
  useEffect(() => {
    apiDrinkId(178319);
    apiFoodId(52771);
  }, []);

  return (<h2> Recipe Details</h2>);
}

export default RecipeDetails;
