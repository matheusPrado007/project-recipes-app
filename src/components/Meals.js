import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDrinksAndFoods } from '../redux/actions';
import { getMealsApi } from '../Services/getAPI';
import Header from './Header';
import Footer from './Footer';

class Meals extends Component {
  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = async () => {
    const { dispatch } = this.props;
    const requestMealsApi = await getMealsApi();
    const result = requestMealsApi.meals;
    const twelve = 12;
    dispatch(getDrinksAndFoods(result.slice(0, twelve)));
  };

  render() {
    const { foodsAndDrinks } = this.props;
    console.log(foodsAndDrinks);
    const { history } = this.props;
    return (
      <div>
        <Header history={ history } />
        {
          foodsAndDrinks.map((meal, index) => {
            const { strMeal, strMealThumb } = meal;
            return (
              <div
                key={ index }
                data-testid={ `${index}-recipe-card` }
              >

                <img
                  data-testid={ `${index}-card-img` }
                  src={ strMealThumb }
                  alt="IMG"
                  width="80px"
                />

                <h2 data-testid={ `${index}-card-name` }>
                  {strMeal}
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
});

Meals.propTypes = {
  dispatch: PropTypes.func.isRequired,
  foodsAndDrinks: PropTypes.shape({
    map: PropTypes.func,
    slice: PropTypes.func,
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
export default connect(mapStateToProps)(Meals);
