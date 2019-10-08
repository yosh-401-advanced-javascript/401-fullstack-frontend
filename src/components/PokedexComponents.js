// // eslint-disable-next-line max-classes-per-file
// import React from 'react';
// import NumInput from './NumInput';
// import Login from '../auth/login';
// import PokemonSprites from './PokemonSprites';
// import TopPanel from './TopPanel';
//
// const POKEMON = 1;
// const padStats = (stat, value, separation, len) => {
//   // eslint-disable-next-line no-param-reassign
//   value = value || 'xx';
//   return `${stat.toString()}
//   ${separation.repeat(len - (value.toString().length + stat.toString().length))}
//   ${value.toString()}`;
// };
//
// class PokemonApp extends React.Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       requestAPI: 'http://pokeapi.co/api/v2/pokemon/',
//       pokemonIDX: POKEMON,
//       pokemonData: {},
//       pokemonDescription: '',
//       speciesData: [],
//       evolutionSprites: [],
//       evolutionNames: [],
//       moves: [],
//       loading: false,
//     };
//   }
//
//   nextPokemonHandler = () => {
//     const next = Math.min(this.state.pokemonIDX + 1, 949);
//     this.setState({ pokemonIDX: next }, this.changePokemon);
//   };
//
//   previousPokemonHandler = () => {
//     const previous = Math.min(this.state.pokemonIDX - 1, 0);
//     this.setState({ pokemonIDX: previous }, this.changePokemon);
//   };
//
//   pickPokemonHandler = (no) => {
//     this.setState({ pokemonIDX: no }, this.changePokemon);
//   };
//
//   componentDidMount() {
//     this.changePokemon();
//   }
//
//
//   changePokemon = () => {
//     this.setState({ loading: true });
//     const request = `${this.state.requestAPI}${this.state.pokemonIDX}/`;
//     fetch(request, {
//       cache: 'force-cache',
//     }).then((response) => response.json()).then((pokeData) => {
//       this.setState({
//         pokemonData: pokeData,
//         pokemonIDX: pokeData.id,
//       });
//       const speciesRequest = pokeData.species.url;
//       return fetch(speciesRequest);
//     }).then((response) => response.json())
//     .then((pokeData) => {
//       this.setState({
//         speciesData: pokeData,
//         pokemonDescription:
//             pokeData.flavor_text_entries.filter(
//                 (element) => element.language.name === 'en',
//             ).map((element) => element.flavor_text),
//         loading: false,
//       });
//       const evolutionChain = pokeData.evolution_chain.url;
//       fetch(evolutionChain)
//       .then((response) => response.json())
//       // eslint-disable-next-line no-shadow
//           .then((pokeData) => {
//             const pokeAPI = 'http://pokeapi.co/api/v2/pokemon/';
//             const firstEvolution = pokeData.chain;
//             let secondEvolution;
//             let thirdEvolution;
//             const evolutionsArray = [];
//             if (firstEvolution) {
//               const e1 = fetch(`${pokeAPI}${firstEvolution.species.name}/`);
//               evolutionsArray.push(e1);
//               // eslint-disable-next-line prefer-destructuring
//               secondEvolution = firstEvolution.evolves_to[0];
//             }
//             if (secondEvolution) {
//               const e2 = fetch(`${pokeAPI}${secondEvolution.species.name}`);
//               // eslint-disable-next-line prefer-destructuring
//               thirdEvolution = secondEvolution.evolves_to[0];
//               evolutionsArray.push(e2);
//             }
//             if (thirdEvolution) {
//               const e3 = fetch(`${pokeAPI}${thirdEvolution.species.name}`);
//               evolutionsArray.push(e3);
//             }
//             Promise.all(evolutionsArray).then((response) => Promise.all(
//                 response.map((responseValue) => responseValue.json()),
//             )).then((pokemonDataList) => {
//               const sprites = pokemonDataList.map(
//                   (img) => img.sprites.front_default,
//               );
//               const names = pokemonDataList.map((n) => n.name);
//               this.setState(
//                   { evolutionSprites: sprites, evolutionNames: names },
//               );
//             });
//           });
//     });
//   };
//
//
//   render() {
//     const pData = this.state.pokemonData;
//     const sData = this.state.speciesData;
//
//     return (
//
//         <div className="pokedex-wrapper">
//           <TopPanel
//               pData={pData}
//               sData={sData}
//               no={this.state.pokemonIDX}
//               description={this.state.pokemonDescription}
//           />
//           <RightSidePanel
//               pData={pData}
//               sData={sData}
//               evolutionSprites={this.state.evolutionSprites}
//               evolutionNames={this.state.evolutionNames}
//               controls={{
//                 next: this.nextPokemonHandler,
//                 previous: this.state.previousPokemonHandler,
//                 pickPokemon: this.state.pickPokemonHandler,
//               }}
//           />
//         </div>
//     );
//   }
// }
//
//
// const RightSidePanel = (props) => {
//   const { types } = props.pData;
//   const { stats } = props.pData;
//
//   if (types) {
//     return (
//         <div className="panel right-panel">
//           <div className="panel-row">
//             <PokemonStats
//                 stats={stats}/>
//             <PokemonType
//                 types={types}/>
//           </div>
//
//           <PokemonEvolution
//               PokemonSprites={props.evolutionSprites}
//               evolutionNames={props.evolutionNames}/>
//           <PokedexControls
//               controls={props.controls}
//               no={props.no}/>
//         </div>);
//   }
//   return RightSidePanel;
// };
//
//
// // const PokemonDescription = (props) => {
// //   return <div className="pokemon-description screen">{props.description}</div>;
// // };
// class PokemonStats extends Component {
//   constructor(props) {
//     super(props);
//   }
//
//   render() {
//     const {
//       stats,
//     } = this.props;
//     return (<div className="screen stats">
//       {stats.map((pokeStats) => {
//         const {
//           name,
//         } = pokeStats.stat;
//         const values = pokeStats.base_stat;
//         return <StatLine name={name} values={values} key={name} />;
//       })}
//     </div>);
//   }
// }
// class StatLine extends Component {
//   constructor(props) {
//     super(props);
//   }
//
//   render() {
//     return (<div className="stat-line">
//       {padStats(this.props.name, this.props.values, '.', 20)}
//     </div>);
//   }
//
// }
//
// class PokemonType extends Component {
//   constructor(props) {
//     super(props);
//   }
//
//   render() {
//     const {
//       types
//     } = this.props;
//     return (<div className="type-list">
//       <div className="panel-header">Types</div>
//       <div className="type-box">
//         {types.map(callback => {
//           const type = callback.type.name;
//           return <Type type={type} key={type} />;
//         })}
//       </div>
//     </div>);
//   }
//
// }
//
// class PokemonEvolution extends Component {
//   constructor(props) {
//     super(props);
//   }
//
//   render() {
//     const evolution1 = this.props.evolutionSprites[0];
//     const evolution2 = this.props.evolutionSprites[1];
//     const evolution3 = this.props.evolutionSprites[2];
//     const evolutionName1 = this.props.evolutionNames[0];
//     const evolutionName2 = this.props.evolutionNames[1];
//     const evolutionName3 = this.props.evolutionNames[2];
//     return (<div className="panel-row panel-evolution">
//       <PokemonEvolutionSprite src={evolution1} evolution='I' name={evolutionName1} />
//       <PokemonEvolutionSprite src={evolution2} evolution='II' name={evolutionName2} />
//       <PokemonEvolutionSprite src={evolution3} evolution='III' name={evolutionName3} />
//     </div>);
//   }
//
// }
// class PokemonEvolutionSprite extends Component {
//   constructor(props) {
//     super(props);
//   }
//
//   render() {
//     let evolutionImage;
//
//     if (this.props.src) {
//       evolutionImage = <img src={this.props.src}
//       alt='pokemon'
//       className="pokemon-sprite pokemon-evolution-sprite" />;
//     }
//
//     return (<div>
//       <div className="flex-center">
//         <div className="evolution-number">{this.props.evolution}</div>
//       </div>
//       {evolutionImage}
//       <div className="screen evolution-name">{this.props.name || 'No Data Available'}</div>
//     </div>);
//   }
//
// }
// class PokedexControls extends Component {
//   constructor(props) {
//     super(props);
//   }
//
//   render() {
//     return (<div className="panel-row controls">
//       <button dir='left' onClick={this.props.controls.previous} />
//       <button logout={this.props} func={this.props.logout} />
//       <button dir='right' onClick={this.props.controls.next} />
//     </div>);
//   }
//
// }
//
// class Type extends Component {
//   constructor(props) {
//     super(props);
//   }
//
//   render() {
//     return (<div className={`type ${this.props.type}`}>{this.props.type}</div>);
//   }
//
// }
//
//
// export default PokemonApp;
