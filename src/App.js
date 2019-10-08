import React from 'react';
import './App.css';
// import Auth from './components/auth/auth';
import Login from './components/auth/login';
import LoginProvider from './components/auth/context';
// import PokemonApp from './components/PokemonApp';

class App extends React.Component {
  render() {
    return (
      <div>
        <LoginProvider>
          <Login />
          {/*<PokemonApp />*/}
        </LoginProvider>
      </div>
    );
  }
}

export default App;
