import { GET_DRINKS_AND_FOODS } from '../actions';

const INITIAL_STATE = {
  foodsAndDrinks: [],
};

const drinksAndFoods = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_DRINKS_AND_FOODS:
    return { ...state, foodsAndDrinks: action.payload };
  default:
    return state;
  }
};
export default drinksAndFoods;
