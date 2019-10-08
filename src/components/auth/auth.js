import React from 'react';
import { LoginContext } from './context';
import If from '../If';
import PokemonApp from '../PokemonApp';

class Auth extends React.Component {
  static contextType = LoginContext;

  render() {
    let okToRender = false;
    try {
      if (this.props.capability) {
        if (this.context.user.capabilities.includes(this.props.capability)) {
          okToRender = true;
        }
      }
    } catch (error) {
      console.warn('Not Authorized');
    }
    return (
        <If condition={okToRender}>
          <div>{this.props.children}</div>
        </If>
    );
  }
}


export default Auth;
