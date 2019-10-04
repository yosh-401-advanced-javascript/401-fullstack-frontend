import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './store';
import App from './app';

const store = createStore();


const Main = () => {
  return (
    <Provider store={store}>
    <App />
    </Provider>

  );
};

const root = document.getElementById('root');
ReactDOM.render(<Main />, root);
