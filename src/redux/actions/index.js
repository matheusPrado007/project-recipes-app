export const GET_DRINKS_AND_FOODS = 'GET_DRINKS_AND_FOODS';
export const GET_CATEG_DRINKS_AND_FOODS = 'GET_CATEG_DRINKS_AND_FOODS';

export function getDrinksAndFoods(drinksAndFoods) {
  return {
    type: GET_DRINKS_AND_FOODS,
    payload: drinksAndFoods,
  };
}

export function getCategDrinksAndFoods(categDrinksAndFoods) {
  return {
    type: GET_CATEG_DRINKS_AND_FOODS,
    payload: categDrinksAndFoods,
  };
}
