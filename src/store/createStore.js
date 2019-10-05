import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import pokemonRedux from './reducers/pokemon-reducer';

const reducers = combineReducers({
  pokemonRedux,
});
const store = () => createStore(reducers, composeWithDevTools(applyMiddleware()));

export default store;
