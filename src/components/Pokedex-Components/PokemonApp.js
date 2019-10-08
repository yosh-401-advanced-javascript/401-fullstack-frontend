// eslint-disable-next-line max-classes-per-file
import React from 'react';
import TopPanel from './TopPanel';
import BottomPanel from './BottomPanel';


const POKEMON = 1;

class PokemonApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requestAPI: 'http://pokeapi.co/api/v2/pokemon/',
      pokemonIDX: POKEMON,
      pokemonData: {},
      pokemonDescription: '',
      speciesData: [],
      evolutionSprites: [],
      evolutionNames: [],
      moves: [],
      loading: false,
    };
  }

  nextPokemonHandler = () => {
    const next = Math.min(this.state.pokemonIDX + 1, 949);
    this.setState({ pokemonIDX: next }, this.changePokemon);
  };

  previousPokemonHandler = () => {
    const previous = Math.min(this.state.pokemonIDX - 1, 0);
    this.setState({ pokemonIDX: previous }, this.changePokemon);
  };

  pickPokemonHandler = (no) => {
    this.setState({ pokemonIDX: no }, this.changePokemon);
  };

  componentDidMount() {
    this.changePokemon();
  }


  changePokemon = () => {
    this.setState({ loading: true });
    const request = `${this.state.requestAPI}${this.state.pokemonIDX}/`;
    fetch(request, {
      cache: 'force-cache',
    })
    .then((response) => response.json())
    .then((pokeData) => {
      console.log("pokedata: ", pokeData)
      this.setState({
        pokemonData: pokeData,
        pokemonIDX: pokeData.id,
      });
      const speciesRequest = pokeData.species.url;

      return fetch(speciesRequest);
    }).then((response) => response.json())
  .then((pokeData) => {
      this.setState({
        speciesData: pokeData,
        pokemonDescription:
            pokeData.flavor_text_entries.filter(
                (element) => element.language.name === 'en',
            ).map((element) => element.flavor_text),
        loading: false,
      });
      const evolutionChain = pokeData.evolution_chain.url;
      fetch(evolutionChain)
      .then((response) => response.json())
      // eslint-disable-next-line no-shadow
          .then((pokeData) => {
            const pokeAPI = 'http://pokeapi.co/api/v2/pokemon/';
            const firstEvolution = pokeData.chain;
            console.log('adasdasdasdasdasd', firstEvolution);
            let secondEvolution;
            let thirdEvolution;
            const evolutionsArray = [];
            if (firstEvolution) {
              const e1 = fetch(`${pokeAPI}${firstEvolution.species.name}/`);
              evolutionsArray.push(e1);
              // eslint-disable-next-line prefer-destructuring
              secondEvolution = firstEvolution.evolves_to[0];
            }
            if (secondEvolution) {
              const e2 = fetch(`${pokeAPI}${secondEvolution.species.name}`);
              // eslint-disable-next-line prefer-destructuring
              thirdEvolution = secondEvolution.evolves_to[0];
              evolutionsArray.push(e2);
            }
            if (thirdEvolution) {
              const e3 = fetch(`${pokeAPI}${thirdEvolution.species.name}`);
              evolutionsArray.push(e3);
            }
            Promise.all(evolutionsArray)
            .then((response) => Promise.all(
                response.map((responseValue) => responseValue.json()),
                console.log(evolutionsArray),
            ))
            .then((pokemonDataList) => {
              const sprites = pokemonDataList.map(
                  (img) => img.sprites.front_default,
              );
              const names = pokemonDataList.map((n) => n.name);
              this.setState(
                  { evolutionSprites: sprites, evolutionNames: names },
              );
            });
          });
    });
  };


  render() {
    const pData = this.state.pokemonData;
    const sData = this.state.speciesData;

    return (

        <div className="pokedex-wrapper">
        <TopPanel
    pData={pData}
    sData={sData}
    no={this.state.pokemonIDX}
    description={this.state.pokemonDescription}
    />
    <BottomPanel
        pData={pData}
        sData={sData}
        evolutionSprites={this.state.evolutionSprites}
        evolutionNames={this.state.evolutionNames}
        controls={{
          next: this.nextPokemonHandler,
          previous: this.state.previousPokemonHandler,
          pickPokemon: this.state.pickPokemonHandler,
        }}
    />
    </div>
    );
  }
}

export default PokemonApp;
