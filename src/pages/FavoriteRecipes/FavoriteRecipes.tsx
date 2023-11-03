import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

type CategoryRecipeType = 'meal' | 'drink' | 'all';

type RecipeType = 'meal' | 'drink';

type Recipe = {
  id: number;
  name: string;
  type: RecipeType;
  image: string;
  category: string;
  nationality: string;
  alcoholicOrNot: string;
};

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [filter, setFilter] = useState<CategoryRecipeType>();
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const getFavoriteRecipes = () => {
      const storedFavoriteRecipes = localStorage.getItem('favoriteRecipes');
      if (storedFavoriteRecipes) {
        const favoritedRecipes = JSON.parse(storedFavoriteRecipes);
        setFavoriteRecipes(favoritedRecipes);
      }
    };
    getFavoriteRecipes();
    setFilter('all');
  }, []);

  const handleFilterChange = (selectedFilter: CategoryRecipeType) => {
    setFilter(selectedFilter);
  };

  const removeFavoriteRecipe = (index: number) => {
    const storedFavoriteRecipes = localStorage.getItem('favoriteRecipes');
    if (storedFavoriteRecipes) {
      const favoritedRecipes = JSON.parse(storedFavoriteRecipes);
      favoritedRecipes.splice(index, 1);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoritedRecipes));
      setFavoriteRecipes(favoritedRecipes);
    }
  };

  const copyFavoriteRecipeLink = (url: string) => {
    navigator.clipboard.writeText(url)
      .then(() => {
        setLinkCopied(true);
        window.alert('Link copied!');
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
      });
  };

  const filteredRecipes = filter === 'all'
    ? favoriteRecipes
    : favoriteRecipes.filter((recipe) => recipe.type === filter);

  return (
    <div>
      <div>
        <button
          onClick={ () => handleFilterChange('all') }
          data-testid="filter-by-all-btn"
        >
          ALL
        </button>
        <button
          onClick={ () => handleFilterChange('meal') }
          data-testid="filter-by-meal-btn"
        >
          meals
        </button>
        <button
          onClick={ () => handleFilterChange('drink') }
          data-testid="filter-by-drink-btn"
        >
          drinks
        </button>
      </div>
      {filteredRecipes.map((recipe, index) => (
        <div key={ recipe.id }>
          <Link
            to={ `/${recipe.type}s/${recipe.id}` }
            key={ recipe.id }
          >
            <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
              style={ { width: '150px' } }
            />
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {
                recipe.type === 'meal'
                  ? `${recipe.nationality} - ${recipe.category}`
                  : `${recipe.alcoholicOrNot}`
              }
          </p>
          <button onClick={ () => copyFavoriteRecipeLink(`http://localhost:3000/${recipe.type}s/${recipe.id}`) }>
            {linkCopied ? 'Link copied!' : (
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="Share"
              />
            )}
          </button>
          <button onClick={ () => removeFavoriteRecipe(index) }>
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt="Favorite"
            />
          </button>
        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipes;
