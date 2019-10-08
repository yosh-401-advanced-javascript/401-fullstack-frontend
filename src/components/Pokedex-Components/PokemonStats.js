import React from 'react';
import StatLine from './StatLine';
// const PokemonDescription = (props) => {
//   return <div className="pokemon-description screen">{props.description}</div>;
// };

class PokemonStats extends React.Component {
  render() {
    const { stats } = this.props;
    return (<div className="screen stats">
      {stats.map((pokeStats) => {
        const { name } = pokeStats.stat;
        const values = pokeStats.base_stat;
        return <StatLine name={name} values={values} key={name} />;
      })}
    </div>);
  }
}

export default PokemonStats;
