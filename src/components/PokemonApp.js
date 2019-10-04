import React from 'react';
import './styles/Pokemon.css';
import PokemonList from './PokemonList';
import StatsBox from './StatsBox';
import Pokemon from './PokemonClass';

class PokemonApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: {},
    };
  }

  handleClick = (id) => {
    fetch(`http://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        const pokemon = new Pokemon(data);
        this.setState({ pokemon });
      })
      .catch((error) => console.log(error));
    console.log(id);
  };

  render() {
    console.log(this.state);
    return (
      <div className="Main">
        <PokemonList handleClick={this.handleClick} />
        <StatsBox pokemon={this.state.pokemon}/>
      </div>
    );
  }
}


export default PokemonApp;
