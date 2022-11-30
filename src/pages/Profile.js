import React, { Component } from 'react';
import Header from '../components/Header';

class Profile extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header history={ history } />
      </div>
    );
  }
}

export default Profile;
