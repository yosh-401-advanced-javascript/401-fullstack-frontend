import React from 'react';
import './styles/Pokemon.css';
// import superagent from 'superagent';
import { connect } from 'react-redux';
import PokemonList from './PokemonList';
import StatsBox from './StatsBox';
import Pokemon from './PokemonClass';

// const API_URL = 'http://pokeapi.co/api/v2/pokemon';

class PokemonApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: {},
    };
  }


  handleClick(event, id) {
    fetch(`http://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        const pokemon = new Pokemon(data);
        this.props.createNewPokemon(pokemon);
        console.log(pokemon);
      })
      .catch((error) => console.log(error));
  }

  render() {
    console.log(this.state);
    return (
      <div className="Main">
        <PokemonList handleClick={this.handleClick} pokemon={this.state.pokemon}/>
         <StatsBox pokemon={this.state.pokemon}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pokemonRedux: state.pokemonRedux,
});

const mapDispatchToProps = (dispatch) => {
  return {
    createNewPokemon: (newPokemonId) => {
      dispatch({
        type: 'POKEMON_GET',
        payload: newPokemonId,
      });
    },
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PokemonApp);
