import React from 'react';
import PokemonEvolutionSprite from './PokemonEvolutionSprite';

class PokemonEvolution extends React.Component {
  render() {
    const evolution1 = this.props.evolutionSprites[0];
    const evolution2 = this.props.evolutionSprites[1];
    const evolution3 = this.props.evolutionSprites[2];
    const evolutionName1 = this.props.evolutionNames[0];
    const evolutionName2 = this.props.evolutionNames[1];
    const evolutionName3 = this.props.evolutionNames[2];
    return (<div className="panel-row panel-evolution">
      <PokemonEvolutionSprite src={evolution1} evolution='I' name={evolutionName1} />
      <PokemonEvolutionSprite src={evolution2} evolution='II' name={evolutionName2} />
      <PokemonEvolutionSprite src={evolution3} evolution='III' name={evolutionName3} />
    </div>);
  }
}
export default PokemonEvolution;
