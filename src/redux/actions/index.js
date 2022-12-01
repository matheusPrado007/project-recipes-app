export const GET_DRINKS_AND_FOODS = 'GET_DRINKS_AND_FOODS';

export function getDrinksAndFoods(drinksAndFoods) {
  return {
    type: GET_DRINKS_AND_FOODS,
    payload: drinksAndFoods,
  };
}
