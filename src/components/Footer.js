import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../css/Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer data-testid="footer" className="footer">
        <Link to="/drinks">
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            alt="drink-icon"
          />
        </Link>

        <Link to="/meals">
          <img
            data-testid="meals-bottom-btn"
            src={ mealIcon }
            alt="drink-icon"
          />
        </Link>
      </footer>
    );
  }
}

export default Footer;
