import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';

import LogoutButton from './LogoutButton';
import PokemonDetail from './PokemonDetail';
import PokemonForm from './PokemonForm';
import Fab from './Fab';
import { getPokemon, showForm } from '../store/pokemon';

const PokemonBrowser = ({
  pokemonList,
  formVisible,
  getPokemon,
  showForm,
  history
}) => {
  useEffect(() => {
    getPokemon();
  }, [getPokemon]);

  if (!pokemonList) {
    return null;
  }

  return (
    <main>
      <LogoutButton />
      <nav>
        <Fab hidden={formVisible} onClick={showForm} />
        {pokemonList.map(pokemon => {
          return (
            <NavLink key={pokemon.name} to={`/pokemon/${pokemon.id}`}>
              <div className="nav-entry">
                <div className="nav-entry-image"
                  style={{ backgroundImage: `url('${pokemon.imageUrl}')` }}>
                </div>
                <div>
                  <div className="primary-text">{pokemon.name}</div>
                  <div className="secondary-text">Born {new Date(pokemon.updatedAt).toDateString()}</div>
                </div>
              </div>
            </NavLink>
          );
        })}
      </nav>

      {formVisible ?
        <PokemonForm history={history} /> :
        <Route path="/pokemon/:id" component={PokemonDetail} />
      }
    </main>
  );
};

const mapStateToProps = state => {
  return {
    pokemonList: state.pokemon.list,
    formVisible: state.pokemon.formVisible,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getPokemon: () => dispatch(getPokemon()),
    showForm: () => dispatch(showForm()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  PokemonBrowser
);
