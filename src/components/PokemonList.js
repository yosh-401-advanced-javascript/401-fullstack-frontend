import React from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemon }) => {
  return (
    <section className="list" >
      <PokemonCard/>
      <PokemonCard/>
      <PokemonCard/>
      <PokemonCard/>
    </section>
  );
};

export default PokemonList;
