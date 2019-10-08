import React from 'react';

class PokemonName extends React.Component {
  render() {
    return (<div className="pokemon-name screen">
      {this.props.name}
      <span className="name-no">no.{this.props.no}</span>
    </div>);
  }
}
export default PokemonName;
