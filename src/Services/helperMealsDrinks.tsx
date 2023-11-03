export function setMeals(param: any) {
  const { ingredient, arrayIngredients, idDaReceita } = param;
  const allIngredients = JSON.parse(localStorage.getItem('inProgressRecipes') as string);
  if (arrayIngredients.includes(ingredient)) {
    const ingrRemaker = allIngredients.meals[idDaReceita]
      .filter((ele: string) => ele !== ingredient);
    const meals = {
      [idDaReceita]: ingrRemaker,
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      drinks: { ...allIngredients.drinks },
      meals,
    }));
  }
  if (!arrayIngredients.includes(ingredient)) {
    const meals = {
      [idDaReceita]: [...allIngredients.meals[idDaReceita], ingredient],
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      drinks: { ...allIngredients.drinks },
      meals,
    }));
  }
}

export function setDrinks(param: any) {
  const { ingredient, arrayIngredients, idDaReceita } = param;
  const allIngredients = JSON.parse(localStorage.getItem('inProgressRecipes') as string);
  if (arrayIngredients.includes(ingredient)) {
    const ingrRemaker = allIngredients.drinks[idDaReceita]
      .filter((ele: string) => ele !== ingredient);
    const drinks = {
      [idDaReceita]: ingrRemaker,
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      meals: { ...allIngredients.mals },
      drinks,
    }));
  }
  if (!arrayIngredients.includes(ingredient)) {
    const drinks = {
      [idDaReceita]: [...allIngredients.drinks[idDaReceita], ingredient],
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      meals: { ...allIngredients.meals },
      drinks,
    }));
  }
}
