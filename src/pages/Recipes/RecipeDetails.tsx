import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiId } from '../../Services/API';

function RecipeDetails() {
  const { id } = useParams();
  useEffect(() => {
    if (typeof (id) !== 'undefined') {
      apiId(id);
    }
  }, []);

  return (<h2> Recipe Details</h2>);
}

export default RecipeDetails;
