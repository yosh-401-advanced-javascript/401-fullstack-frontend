import React from 'react';
import { LoginContext } from './context';
import If from '../If';
import PokemonApp from '../Pokedex-Components/PokemonApp';

class Login extends React.Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e, type) => {
    e.preventDefault();
    this.context.login(this.state.username, this.state.password, type);
  };

  render() {
    return (
      <>
        <If condition={this.context.loggedIn}>
          <PokemonApp logout={this.context.logout}/>
        </If>

        <If condition={!this.context.loggedIn}>
          <form className="pokedex-wrapper login">
            <input
              placeholder="UserName"
              name="username"
              onChange={this.handleChange}
            />
            <input
              placeholder="password"
              name="password"
              type="password"
              onChange={this.handleChange}
            />
            <button className="singin" onClick={(e) => this.handleSubmit(e, 'signin')}>Sign In</button>
            <button className="signup" onClick={(e) => this.handleSubmit(e, 'signup')}>Sign Up</button>
          </form>
        </If>
      </>
    );
  }
}

export default Login;
