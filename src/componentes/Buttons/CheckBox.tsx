import { useEffect, useState } from 'react';

type CheckBoxType = {
  pathname: string
  arrayIngredients: any
  index: number
  ingredient: string
  check: any
};

export default function CheckBox(
  { index, ingredient, arrayIngredients, check, pathname }: CheckBoxType,
) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    const localStorageArray = localStorage.getItem('inProgressRecipes');
    const [, item, id] = pathname.split('/');
    if (localStorageArray) {
      const parsedLocalStorage = JSON.parse(localStorageArray);
      const itemArr = parsedLocalStorage[item][id];
      if (itemArr.includes(ingredient)) setIsChecked(true);
    }
  }, []);

  return (
    <div
      data-testid={ `${index}-ingredient-name-and-measure` }
    >
      <label
        className={ arrayIngredients.includes(ingredient) ? 'container' : 'checkIn' }
        data-testid={ `${index}-ingredient-step` }
        style={
           { textDecoration: isChecked ? 'line-through solid rgb(0, 0, 0)' : 'none' }
          }
      >
        <input
          checked={ arrayIngredients.includes(ingredient) }
          onChange={ () => {
            handleCheckboxChange();
            check(ingredient);
          } }
          type="checkbox"
        />
        <span>
          {ingredient}
        </span>
      </label>
    </div>
  );
}
