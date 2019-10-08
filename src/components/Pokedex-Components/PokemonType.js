import React from 'react';
import Type from './Type';

class PokemonType extends React.Component {
  render() {
    const { types } = this.props;
    return (<div className="type-list">
      <div className="panel-header">Types</div>
      <div className="type-box">
        {types.map((callback) => {
          const type = callback.type.name;
          return <Type type={type} key={type} />;
        })}
      </div>
    </div>);
  }
}
export default PokemonType;
