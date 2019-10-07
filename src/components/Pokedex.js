// eslint-disable-next-line max-classes-per-file
import React from 'react';
// import PokemonSprites from './PokemonSprites';
import NumInput from './NumInput';
// import AbilitiesList from './AbilitiesList';

const POKEMON = 1;
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const padStats = (stat, value, separation, len) => {
  // eslint-disable-next-line no-param-reassign
  value = value || 'xx';
  return `${stat.toString()}${separation.repeat(len - (value.toString().length + stat.toString().length))}${value.toString()}`;
};

class Pokedex extends React.Component {
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
    const previous = Math.min(this.state.pokemonIDX - 1, 1);
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
    }).then((response) => response.json()).then((pokeData) => {
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
          pokemonDescription: pickRandom(
            pokeData.flavor_text_entries.filter(
              (element) => element.language.name === 'en',
            ).map((element) => element.flavor_text),
          ),
          loading: false,
        });
        const evolutionChain = pokeData.evolution_chain.url;
        fetch(evolutionChain)
          .then((response) => response.json())
        // eslint-disable-next-line no-shadow
          .then((pokeData) => {
            const pokeAPI = 'http://pokeapi.co/api/v2/pokemon/';
            const firstEvolution = pokeData.chain;
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
            Promise.all(evolutionsArray).then((response) => Promise.all(
              response.map((responseValue) => responseValue.json()),
            )).then((pokemonDataList) => {
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
          <LeftSidePanel
              pData={pData}
              sData={sData}
              no={this.state.pokemonIDX}
              description={this.state.pokemonDescription}
          />
          <RightSidePanel
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
          no={this.state.pokemonIDX}
        </div>
    );
  }
}

const LeftSidePanel = (props) => {
  const { pData } = props;
  if (typeof pData === 'object' && Object.keys(pData).length !== 0) {
    return (
        <div className="panel left-panel">
          <PokemonName name={pData.name} no={props.no}/>
          <PokemonSprites src={pData.sprites}/>
          <PokemonDescription description={pData.description}/>
        </div>
    );
  }
  // eslint-disable-next-line no-use-before-define
  return Loading();
};


const PokemonName = (props) => {
  return (
      <div className="pokemon-name screen">
        {props.name}
        <span className="name-no">no. {props.no}</span>
      </div>
  );
};


const RightSidePanel = (props) => {
  const { types } = props.pData;
  const { moves } = props.pData;
  const { stats } = props.pData;

  if (types) {
    return (
        <div className="panel right-panel">
          <div className="panel-row">
            <PokemonStats
                stats={stats}/>
            <PokemonType
                types={types}/>
          </div>

          <PokemonEvolution
              evolutionSprites={props.evolutionSprites}
              evolutionNames={props.evolutionNames}/>
          { /* <FlavorButtons/> */ }
          <MoveList
              moves={moves}/>
          <PokedexControls
              controls={props.controls}
              no={props.no}/>
        </div>
    );
  }
  // eslint-disable-next-line no-use-before-define
  return Loading();
};


class PokemonSprites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      front: true,
    };
  }

  imageBuilder = () => {
    const facing = this.state.front ? 'front' : 'back';
    return facing;
  };

  toggleFacing = () => {
    console.log('toggling front');
    this.setState({ front: !this.state.front }, () => {
      // eslint-disable-next-line no-empty
      if (this.props.src[this.imageBuilder()]) {
      } else {
        this.setState({ front: false });
      }
    });
  };

  render() {
    const imgSrc = this.props.src[this.imageBuilder()] || this.props.src.front_default;
    const spriteFunctions = { front: this.toggleFacing };
    return (
        <div>
          <img src={imgSrc} alt="pokemon" className="pokemon-sprite"/>
          <SpriteController
              spriteFunctions={spriteFunctions}
              front={this.state.front}
          />
        </div>
    );
  }
}

const SpriteController = (props) => {
  return (
      <div className="sprite-controller">
        <div className={`sprite-controller sprite-button-rotate ${!props.front ? 'sprite-control-selected' : ''}`}
             onClick={props.spriteFunctions.front}
        >
        </div>
      </div>
  );
};
const PokemonDescription = (props) => {
  return <div className="pokemon-description screen">{props.description}</div>;
};
const PokemonStats = (props) => {
  const { stats } = props;
  return (
      <div className="screen stats">
        {stats.map((pokeStats) => {
          const { name } = pokeStats.stat;
          const values = pokeStats.base_stat;

          return <StatLine name={name} values={values} key={name} />;
        })}
      </div>
  );
};

const StatLine = (props) => {
  return (
      <div className="stat-line">
        {padStats(props.name, props.values, '.', 20)}
      </div>
  );
};

const PokemonType = (props) => {
  const { types } = props;
  return (
      <div className="type-list">
        <div className="panel-header">Types</div>
        <div className="type-box">
          {types.map((callback) => {
            const type = callback.type.name;
            return <Type type={type} key={type} />;
          })}
        </div>
      </div>
  );
};

const PokemonEvolution = (props) => {
  const evolution1 = props.evolutionSprites[0];
  const evolution2 = props.evolutionSprites[1];
  const evolution3 = props.evolutionSprites[2];
  const evolutionName1 = props.evolutionNames[0];
  const evolutionName2 = props.evolutionNames[1];
  const evolutionName3 = props.evolutionNames[2];

  return (
      <div className="panel-row panel-evolution">
        <PokemonEvolutionSprite
            src={evolution1}
            evolution='I'
            name={evolutionName1} />
        <PokemonEvolutionSprite
            src={evolution2}
            evolution='II'
            name={evolutionName2} />
        <PokemonEvolutionSprite
            src={evolution3}
            evolution='III'
            name={evolutionName3} />
      </div>
  );
};

const PokemonEvolutionSprite = (props) => {
  let evolutionImage;

  if (props.src) {
    evolutionImage = <img src={props.src} alt='pokemon'
                          className="pokemon-sprite pokemon-evolution-sprite"/>;
  }

  return (
      <div>
        <div className="flex-center">
          <div className="evolution-number">{props.evolution}</div>
        </div>
        {evolutionImage}
        <div className="screen evolution-name">{props.name
        || 'No Data Available'}</div>
      </div>

  );
};

class MoveList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      currentMove: {},
      loading: false,
    };
    this.nextMove = this.nextMove.bind(this);
    this.prevMove = this.prevMove.bind(this);
  }

  componentDidMount() {
    // console.log(this.props.moves[0].move.name);
    this.loadMoves();
  }

  loadMoves() {
    this.setState({ loading: true, index: this.state.index }, () => {
      fetch(this.props.moves[this.state.index].move.url)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ currentMove: data, loading: false });
        });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.moves !== prevProps.moves) {
      this.setState({ index: 0 }, this.loadMoves);
    }
  }

  nextMove() {
    const nextIndex = Math.min(this.state.index + 1, this.props.moves.length - 1);
    this.setState({ index: nextIndex }, this.loadMoves);
  }

  prevMove() {
    const nextIndex = Math.max(this.state.index - 1, 0);
    this.setState({ index: nextIndex }, this.loadMoves);
  }

  render() {
    let moves;
    if (this.state.loading || Object.keys(this.state.currentMove).length === 0) {
      moves = <MovesLoading />;
    } else {
      const lvl = this.props.moves[this.state.index].version_group_details[0].level_learned_at;
      moves = <MoveEntry move={this.state.currentMove} lvl={lvl} />;
    }

    return (
        <div className="move-list">
          {moves}
          <div className="move-controls">
            <div className="move-arrow" onClick={this.prevMove}>
              <i className="fas fa-caret-up" />
            </div>
            <div className="move-arrow" onClick={this.nextMove}>
              <i className="fas fa-caret-down" />
            </div>
          </div>
        </div>
    );
  }
}

function MovesLoading() {
  return (
      <div className="move-body move-screen screen">
        <div className="move-left">
          <div className="move-name" style={{ textTransform: 'none' }}>
            xxxxx xxxxx
          </div>
          <div className="move-stat">{padStats('Accuracy', 'xx', '.', 16)}</div>
          <div className="move-stat">{padStats('Power', 'xx', '.', 16)}</div>
          <div className="move-stat">{padStats('PP', 'xx', '.', 16)}</div>
        </div>
        <div className="move-right">
          <div className="move-type">Type: xxxxx</div>
          {/* <div className="move-status">Status Effect: {status}</div> */}
          <div className="move-learn">Learn: Lvl xx</div>
        </div>
      </div>
  );
}

function MoveEntry(props) {
  const { move } = props;
  const name = move.name || move.names.filter((m) => m.language.name === 'en')[0].name;
  const acc = move.accuracy;
  const pow = move.power;
  const { pp } = move;
  const type = move.type.name;
  const { lvl } = props;
  return (
      <div className="move-body move-screen screen">
        <div className="move-left">
          <div className="move-name">{name}</div>
          <div className="move-stat">{padStats('Accuracy', acc, '.', 16)}</div>
          <div className="move-stat">{padStats('Power', pow, '.', 16)}</div>
          <div className="move-stat">{padStats('PP', pp, '.', 16)}</div>
        </div>
        <div className="move-right">
          <div className="move-type">Type: {type}</div>
          {/* <div className="move-status">Status Effect: {status}</div> */}
          <div className="move-learn">Learn: Lvl {lvl}</div>
        </div>
      </div>
  );
}

const PokedexControls = (props) => {
  return (
      <div className="panel-row controls">
        <Button dir='left' onClick={props.controls.previous} />
        <NumInput no={props.no} func={props.controls.pickPokemon} />
        <Button dir ='right' onClick={props.controls.next} />
      </div>
  );
};

const Button = (props) => {
  return <div className="button" onClick={props.onClick} />;
};

const Loading = () => {
  return <h1> LOADING...</h1>;
};

const Type = (props) => {
  return <div className={`type ${props.type}`}>{props.type}</div>;
};


export default Pokedex;
