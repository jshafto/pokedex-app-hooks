import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../store/authentication';

const LogoutButton = ({ loggedOut, logout }) => {
  const handleClick = () => logout();

  if (loggedOut) {
    return <Redirect to="/login" />;
  }

  return (
    <div id="logout-button-holder">
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loggedOut: !state.authentication.id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  LogoutButton
);

