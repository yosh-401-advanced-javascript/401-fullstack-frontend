import React from 'react';

class Type extends React.Component {
  render() {
    return (<div className={`type ${this.props.type}`}>{this.props.type}</div>);
  }
}
export default Type;
