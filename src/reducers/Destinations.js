import { ADD_DEST, DELETE_DESTS } from '../actions/destinationActions';

function Destinations(state = [], action) {
  switch (action.type) {
  case DELETE_DESTS:
    // Remove POI by place id, respet mutable
    const newStated = state.filter((dest) => {
      return dest.place_id !== action.payload;
    }).map(e => e);

    return newStated;
  case ADD_DEST:
    let locked = false;

    const newState = state.map(dest => {
      // Dump the nested object
      const dump = Object.assign({}, dest);
      if (+dest.place_id === +action.payload.place_id) {
        locked = true;
        return action.payload;
      }
      return dump;
    });

    // Only add a the payload if it hasn't been updated inside the map
    if (!locked) {
      newState.push(action.payload);
    }

    return newState;
  default:
    return state;
  }
}

export { Destinations };
