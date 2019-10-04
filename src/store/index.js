import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from './middleware/thunk';
import todos from './reducers/todos';

const reducers = combineReducers({
  todos,
});
const store = () => createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;
