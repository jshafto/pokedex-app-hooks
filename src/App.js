import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginPanel from './components/LoginPanel';
import PokemonBrowser from './components/PokemonBrowser';
import { PrivateRoute } from './components/routeUtils';

const App = ({ needLogin }) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginPanel} />
        <PrivateRoute path="/"
          exact={true}
          needLogin={needLogin}
          component={PokemonBrowser} />
        <PrivateRoute path="/pokemon/:pokemonId"
          exact={true}
          needLogin={needLogin}
          component={PokemonBrowser} />
      </Switch>
    </BrowserRouter>
  );
};


const mapStateToProps = state => {
  return {
    needLogin: !state.authentication.id,
  };
};

export default connect(
  mapStateToProps,
  null,
)(
  App
);
