import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDrinksAndFoods, getCategDrinksAndFoods } from '../redux/actions';
import { getDrinksApi, getCategoriesDrinks } from '../Services/getAPI';
import Header from './Header';
import Footer from './Footer';


class Recipes extends Component {
  componentDidMount() {
    this.fetchApi();
    this.drinksCategoriesApi();
  }

  fetchApi = async () => {
    const { dispatch } = this.props;
    const requestDrinksApi = await getDrinksApi();
    const result = requestDrinksApi.drinks;
    const twelve = 12;
    dispatch(getDrinksAndFoods(result.slice(0, twelve)));
  };

  drinksCategoriesApi = async () => {
    const { dispatch } = this.props;
    const requestDrinksApi = await getCategoriesDrinks();
    const result = requestDrinksApi.drinks;
    const five = 5;
    dispatch(getCategDrinksAndFoods(result.slice(0, five)));
  };

  render() {
    const { foodsAndDrinks, getCategories } = this.props;
     const { history } = this.props;
    return (
      <div>
        <Header history={ history } />
        Drink
        {
          getCategories.map((drink, index) => {
            const { strCategory } = drink;
            return (
              <button
                type="button"
                key={ index }
                data-testid={ `${strCategory}-category-filter` }
              >
                { strCategory }
              </button>
            );
          })
        }
        {
          foodsAndDrinks.map((drink, index) => {
            const { strDrink, strDrinkThumb } = drink;
            return (
              <div
                key={ index }
                data-testid={ `${index}-recipe-card` }
              >

                <img
                  data-testid={ `${index}-card-img` }
                  src={ strDrinkThumb }
                  alt="IMG"
                  width="80px"
                />

                <h2 data-testid={ `${index}-card-name` }>
                  {strDrink}
                </h2>
              </div>
            );
          })
        }
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  foodsAndDrinks: state.drinksAndFoods.foodsAndDrinks,
  getCategories: state.drinksAndFoods.getCategories,
});

Recipes.propTypes = {
  dispatch: PropTypes.func.isRequired,
  getCategories: PropTypes.shape({
    map: PropTypes.func,
    slice: PropTypes.func,
  }).isRequired,
  foodsAndDrinks: PropTypes.shape({
    map: PropTypes.func,
    slice: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
export default connect(mapStateToProps)(Recipes);
