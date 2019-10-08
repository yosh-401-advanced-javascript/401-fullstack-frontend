export default (state = [], {type, payload}) => {
  switch (type) {
    case 'GET_POKEMON':
      return payload;
    case 'ADD_POKEMON':
      return [...state, payload];
    default:
      return state;
  }
};
