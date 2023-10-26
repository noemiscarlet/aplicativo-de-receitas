async function searchName(nome: string) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`);
    const data = await response.json();
    return data.meals;
  } catch (err) {
    console.error(err);
  }
}

export default searchName;
