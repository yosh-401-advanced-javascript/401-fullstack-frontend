import React from 'react';
import PokemonSprites from './PokemonSprites';
import PokemonName from './PokemonName';
import Loading from './Loading'

class TopPanel extends React.Component {
  render() {
    const { pData } = this.props;
    if (typeof pData === 'object' && Object.keys(pData).length !== 0) {
      return <div className="panel left-panel">
      <PokemonName name={pData.name} no={this.props.no}/>
      <PokemonSprites src={pData.sprites}/>
      {/* <PokemonDescription description={pData.description} /> */}
    </div>;
    }
    return <Loading />;
  }
}
export default TopPanel;
