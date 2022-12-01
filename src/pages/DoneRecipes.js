import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';

class DoneRecipes extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header history={ history } />
      </div>
    );
  }
}

DoneRecipes.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default DoneRecipes;
