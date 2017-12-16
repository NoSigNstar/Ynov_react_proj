import { ADD_DEST, DELETE_DESTS, ADD_START, REPLACE_DESTINATIONS } from '../../actions/map/destinationActions';

function Destinations(state = [], action) {
  switch (action.type) {
  case DELETE_DESTS:
    // Remove POI by place id, respet mutable
    const newStated = state.filter((dest) => {
      return dest.place_id !== action.payload;
    }).map((e, i) => {
      return { ...e, index: (i + 1) };
    });

    return newStated;
  case ADD_DEST:
    let locked = false;

    const newState = state.map((dest, i) => {
      const dump = Object.assign({}, dest);
      if (+dest.place_id === +action.payload.place_id) {
        locked = true;
        return {...action.payload, index: (i + 1)};
      }
      return dump;
    });

    // Only add a the payload if it hasn't been updated inside the map
    if (!locked) {
      newState.push({
        ...action.payload,
        index: newState.length + 1
      });
    }

    return newState;
  case ADD_START:
    const newStateStart = state.filter((dest) => dest.type !== 'START').map((e, i) => {
      return { ...e, index: (i + 2) };
    });
    newStateStart.unshift({ ...action.payload, index: 1 });
    return newStateStart;
  case REPLACE_DESTINATIONS:
    return [
      ...action.payload
    ];
  default:
    return state;
  }
}

export { Destinations };
