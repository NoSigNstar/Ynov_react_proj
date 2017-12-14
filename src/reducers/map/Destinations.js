import { ADD_DEST, DELETE_DESTS, ADD_START } from '../actions/destinationActions';

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
  case ADD_START:
    const newStateStart = state.filter((dest) => dest.type !== 'START').map(e => e);
    newStateStart.unshift(action.payload);

    return newStateStart;
  default:
    return state;
  }
}

export { Destinations };
