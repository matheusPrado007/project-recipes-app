import { GET_DRINKS_AND_FOODS, GET_CATEG_DRINKS_AND_FOODS } from '../actions';

const INITIAL_STATE = {
  foodsAndDrinks: [],
  getCategories: [],
};

const drinksAndFoods = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_DRINKS_AND_FOODS:
    return { ...state, foodsAndDrinks: action.payload };

  case GET_CATEG_DRINKS_AND_FOODS:
    return { ...state, getCategories: action.payload };

  default:
    return state;
  }
};
export default drinksAndFoods;
