const API = process.env.REACT_APP_API;

// action creator
const get = (payload) => {
  return {
    type: 'FETCH_TODOS',
    payload,
  };
};

const add = (payload) => {
  return {
    type: 'ADD_TODOS',
    payload,
  };
};

// thunk for async call
const fetchTodos = () => (dispatch) => {
  return fetch(`${API}/api/v1/todo`)
    .then((results) => results.json())
    .then((data) => dispatch(get(data)));
};

const addTodos = (todo) => (dispatch) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
  };

  return fetch(`${API}/api/v1/todo`, options)
    .then((results) => results.json())
    .then((data) => dispatch(add(data)));
};

export default {
  fetchTodos,
  addTodos,
};
