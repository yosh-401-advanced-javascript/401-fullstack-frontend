import React from 'react';
import PokedexControls from './PokedexControls';
import PokemonEvolution from './PokemonEvolution';
import PokemonType from './PokemonType';
import PokemonStats from './PokemonStats';
import Loading from './Loading';

class BottomPanel extends React.Component {
  render() {
    const { types } = this.props.pData;
    const { stats } = this.props.pData;
    if (types) {
      return <div className="panel right-panel">
        <div className="panel-row">
          <PokemonStats stats={stats} />
          <PokemonType types={types} />
        </div>

        <PokemonEvolution PokemonSprites={this.props.evolutionSprites}
                          evolutionNames={this.props.evolutionNames} />
        <PokedexControls controls={this.props.controls} />
      </div>;
    }
    return <Loading />;
  }
}

export default BottomPanel;
