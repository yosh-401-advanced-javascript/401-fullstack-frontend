import React from 'react';
import './App.css';
import Auth from './components/auth/auth';
import Login from './components/auth/login';
import LoginProvider from './components/auth/context';
import PokemonApp from './components/PokemonApp';


const Read = props => {
  return (
      <Auth capability = 'read'>
        <span>Re</span>
      </Auth>
  );
};

const Update = props => {
  return (
    <Auth capability='update'>
      <span>Up</span>
    </Auth>
  );
};

class App extends React.Component {
  render() {
    return (
      <div>
      <LoginProvider>
        <Login />
        <hr />
        <PokemonApp />
        <Read/>
        <Update/>
      </LoginProvider>
      </div>
    );
  }
}

export default App;
