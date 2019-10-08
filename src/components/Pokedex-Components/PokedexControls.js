import React from 'react';

class PokedexControls extends React.Component {
  render() {
    return (<div className="panel-row controls">
      <button dir='left' onClick={this.props.controls.previous} />
      <button logout={this.props} func={this.props.logout} />
      <button dir='right' onClick={this.props.controls.next} />
    </div>);
  }
}

export default PokedexControls;
