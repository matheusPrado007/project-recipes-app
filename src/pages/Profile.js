import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Profile extends Component {
  render() {
    const { history } = this.props;
    const getLocalStorage = JSON.parse(localStorage.getItem('user'));
    return (
      <div>
        <Header history={ history } />
        <Footer />
        <main>
          <p data-testid="profile-email">
            { getLocalStorage.email }
            E-mail
          </p>
          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Done Recipes
          </button>
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </button>
          <button
            type="button"
            data-testid="profile-logout-btn"
          >
            Logout
          </button>

        </main>
      </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Profile;
