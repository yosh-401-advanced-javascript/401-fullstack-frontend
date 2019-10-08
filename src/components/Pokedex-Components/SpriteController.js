import React from 'react';

class SpriteController extends React.Component {
  render() {
    return (<div className="sprite-controller">
      <div className={`sprite-controller sprite-button-rotate ${!this.props.front ? 'sprite-control-selected' : ''}`} onClick={this.props.spriteFunctions.front}>
      </div>
    </div>);
  }
}
export default SpriteController;
