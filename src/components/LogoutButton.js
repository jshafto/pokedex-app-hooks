import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../store/authentication';

const LogoutButton = () => {
  // const handleClick = () => logout();
  const loggedOut = useSelector(state => !state.authentication.id);
  const dispatch = useDispatch();
  const handleClick = () => dispatch(logout());

  if (loggedOut) {
    return <Redirect to="/login" />;
  }

  return (
    <div id="logout-button-holder">
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};


export default LogoutButton;
