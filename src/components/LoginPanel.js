import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../store/authentication';

const LoginPanel = ({ currentUserId, login }) => {
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const updateEmail = e => setEmail(e.target.value);
  const updatePassword = e => setPassword(e.target.value);

  if (currentUserId) {
    return <Redirect to="/" />;
  }

  return (
    <main className="centered middled">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail} />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword} />
        <button type="submit">Login</button>
      </form>
    </main>
  );
};

const mapStateToProps = state => {
  return {
    currentUserId: state.authentication.id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(login(email, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  LoginPanel
);
