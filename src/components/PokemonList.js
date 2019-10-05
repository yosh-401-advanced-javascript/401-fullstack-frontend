import React from 'react';
import PokemonCard from './PokemonCard';
import StatsBox from './StatsBox';

const PokemonList = () => {
  return (
    <section className="list" >
      <PokemonCard>
        <StatsBox/>
      </PokemonCard>

    </section>
  );
};

export default PokemonList;
