import React from 'react';

class PokemonEvolutionSprite extends React.Component {
  render() {
    let evolutionImage;
    if (this.props.src) {
      evolutionImage = <img src={this.props.src} alt='pokemon' className="pokemon-sprite pokemon-evolution-sprite" />;
    }
    return (<div>
      <div className="flex-center">
        <div className="evolution-number">{this.props.evolution}</div>
      </div>
      {evolutionImage}
      <div className="screen evolution-name">{this.props.name || 'No Data Available'}</div>
    </div>);
  }
}
export default PokemonEvolutionSprite;
