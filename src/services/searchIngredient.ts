async function searchIngredient(ingrediente: string) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
    const data = await response.json();
    return data.meals;
  } catch (err) {
    console.error(err);
  }
}

export default searchIngredient;
