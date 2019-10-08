import React from 'react';
import SpriteController from './SpriteController';

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

export default PokemonSprites;
