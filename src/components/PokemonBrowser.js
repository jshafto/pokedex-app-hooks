import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';

import LogoutButton from './LogoutButton';
import PokemonDetail from './PokemonDetail';
import PokemonForm from './PokemonForm';
import Fab from './Fab';
import { getPokemon, showForm } from '../store/pokemon';


// {
//   pokemonList,
//   formVisible,
//   getPokemon,
//   showForm,
//   history
// }
const PokemonBrowser = () => {

  const pokemonList = useSelector(state => state.pokemon.list);
  const formVisible = useSelector(state => state.pokemon.formVisible);


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPokemon());
  }, [getPokemon]);

  if (!pokemonList) {
    return null;
  }

  return (
    <main>
      <LogoutButton />
      <nav>
        <Fab hidden={formVisible} onClick={() => dispatch(showForm())} />
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
        <PokemonForm /> :
        <Route path="/pokemon/:id" component={PokemonDetail} />
      }
    </main>
  );
};

// const mapStateToProps = state => {
//   return {
//     pokemonList: state.pokemon.list,
//     formVisible: state.pokemon.formVisible,
//   };
// }




// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(
//   PokemonBrowser
// );

export default PokemonBrowser;
