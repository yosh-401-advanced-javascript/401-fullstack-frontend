import React from 'react';

class PokemonSprites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      front: true,
    };
  }

  imageBuilder = () => {
    return this.state.front ? 'front' : 'back';
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


export default PokemonSprites;
