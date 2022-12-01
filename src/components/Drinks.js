import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDrinksAndFoods } from '../redux/actions';
import { getDrinksApi } from '../Services/getAPI';
import Header from './Header';
import Footer from './Footer';

class Recipes extends Component {
  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = async () => {
    const { dispatch } = this.props;
    const requestDrinksApi = await getDrinksApi();
    const result = requestDrinksApi.drinks;
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
});

Recipes.propTypes = {
  dispatch: PropTypes.func.isRequired,
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
