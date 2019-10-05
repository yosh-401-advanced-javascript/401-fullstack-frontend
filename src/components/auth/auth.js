import React from 'react';
import PropTypes from 'prop-types';
import { LoginContext } from './context';


const If = (props) => {
  return !props.condition ? props.children : null;
};

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

Auth.propTypes = {
  children: PropTypes.object,
  capability: PropTypes.string,
};

export default Auth;
