import React, { useState,useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';

import LoginPanel from './LoginPanel';
import PokemonBrowser from './PokemonBrowser';
import { PrivateRoute } from './routesUtil';

// class App extends React.Component {
const App = props => {
  // // constructor(props) {
  //   super(props);
  //   const authToken = Cookies.get("token");
  //   let currentUserId;
  //   if (authToken) {
  //     try {
  //       const payload = authToken.split(".")[1];
  //       const decodedPayload = atob(payload);
  //       const payloadObj = JSON.parse(decodedPayload);
  //       const { data } = payloadObj;
  //       currentUserId = data.id;
  //     } catch (e) {
  //       Cookies.remove("token");
  //     }
  //   }
  //   this.state = {
  //     loaded: false,
  //     currentUserId,
  //     needLogin: !currentUserId,
  //   };
  // }

  // componentDidMount() {
  //   this.loadPokemon();
  // }
  const [loaded, setLoaded] = useState(false)
  const authToken = Cookies.get("token");
  let initialUserId;
  if (authToken) {
    try {
      const payload = authToken.split(".")[1];
      const decodedPayload = atob(payload);
      const payloadObj = JSON.parse(decodedPayload);
      const { data } = payloadObj;
      initialUserId = data.id;
    } catch (e) {
      Cookies.remove("token");
    }
  }
  const [currentUserId, setCurrentUserId] = useState(initialUserId);
  const [needLogin, setNeedLogin] = useState(!currentUserId);
  const [pokemon, setPokemon] = useState([]);



  const handleCreated = (newPokemon) => {
    // this.setState({
    //   pokemon: [...this.state.pokemon, pokemon]
    // });
    setPokemon([...pokemon, newPokemon]);
  }

  const loadPokemon = async () => {
    const response = await fetch(`/api/pokemon`);
    if (response.ok) {
      const pokemonList = await response.json();
      // this.setState({
      //   pokemon,
      //   needLogin: false,
      //   loaded: true
      // });
      setPokemon(pokemonList);
      setNeedLogin(false);
      setLoaded(true);
    } else {
      // this.setState({
      //   needLogin: true,
      //   loaded: true,
      // });
      setNeedLogin(true);
      setLoaded(true);
    }
  }

  const updateUser = newUserId => {
    // this.setState({
    //   needLogin: false,
    //   currentUserId
    // });
    setNeedLogin(false);
    setCurrentUserId(newUserId);
    loadPokemon();
  }

  useEffect(() => loadPokemon(), []);
  // render() {
  //   const { loaded, currentUserId, needLogin, pokemon } = this.state;
  if (!loaded) {
    return null;
  }
  const cProps = {
    pokemon: pokemon,
    handleCreated: handleCreated,
    currentUserId: currentUserId
  };
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login"
          render={props => <LoginPanel {...props} updateUser={updateUser} />} />
        <PrivateRoute path="/"
          exact={true}
          needLogin={needLogin}
          component={PokemonBrowser}
          cProps={cProps} />
        <PrivateRoute path="/pokemon/:pokemonId"
          exact={true}
          needLogin={needLogin}
          component={PokemonBrowser}
          cProps={cProps} />
      </Switch>
    </BrowserRouter>
  )
}


export default App;
