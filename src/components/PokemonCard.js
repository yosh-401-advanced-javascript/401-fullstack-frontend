import React from 'react';
import PropTypes from 'prop-types';
import PokemonList from './PokemonList';

const PokemonCard = () => {
  return <button className="pokemon-card">BUTTON</button>;
};

export default PokemonCard;

PokemonCard.propTypes = {
  handleClick: PropTypes.func,
  pokemonData: PropTypes.object,
};
