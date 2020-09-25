import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createPokemon, getPokemonTypes, hideForm } from '../store/pokemon';

const PokemonForm = ({
  pokeTypes,
  getPokemonTypes,
  createPokemon,
  hideForm,
  history
}) => {
  const [attack, setAttack] = useState('');
  const [defense, setDefense] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [move1, setMove1] = useState('');
  const [move2, setMove2] = useState('');

  const updateAttack = (e) => setAttack(e.target.value);
  const updateDefense = (e) => setDefense(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);
  const updateName = (e) => setName(e.target.value);
  const updateType = (e) => setType(e.target.value);
  const updateMove1 = (e) => setMove1(e.target.value);
  const updateMove2 = (e) => setMove2(e.target.value);

  useEffect(() => {
    getPokemonTypes();
  }, [getPokemonTypes]);

  useEffect(() => {
    if (pokeTypes.length) setType(pokeTypes[0]);
  }, [pokeTypes]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      attack,
      defense,
      imageUrl,
      name,
      type,
      move1,
      move2,
      moves: [move1, move2],
    };

    const res = await createPokemon(payload);
    if (res.ok) history.push(`/pokemon/${res.data.id}`);
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    hideForm();
  };

  return (
    <section className="new-form-holder centered middled">
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Attack"
          min="0"
          max="100"
          required
          value={attack}
          onChange={updateAttack} />
        <input
          type="number"
          placeholder="Defense"
          min="0"
          max="100"
          required
          value={defense}
          onChange={updateDefense} />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={updateImageUrl} />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={updateName} />
        <input
          type="text"
          placeholder="Move 1"
          value={move1}
          onChange={updateMove1} />
        <input
          type="text"
          placeholder="Move 2"
          value={move2}
          onChange={updateMove2} />
        <select onChange={updateType} value={type}>
          {pokeTypes.map(type =>
            <option key={type}>{type}</option>
          )}
        </select>
        <button type="submit">Create new Pokemon</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </section>
  );
};

const mapStateToProps = state => {
  return {
    pokeTypes: state.pokemon.types,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    createPokemon: data => dispatch(createPokemon(data)),
    getPokemonTypes: () => dispatch(getPokemonTypes()),
    hideForm: () => dispatch(hideForm()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  PokemonForm
);
