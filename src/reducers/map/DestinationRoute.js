
import { ADD_DEST_ROUTE, DELETE_DEST_ROUTE } from '../../actions/routeActions';

function route(state = {}, action) {
  switch (action.type) {
  case ADD_DEST_ROUTE:
    return {
      ...action.payload
    };
  case DELETE_DEST_ROUTE:
    return {};
  default:
    return state;
  }
}

export { route };
