export const ADD_DEST_COORDINATES = 'ADD_DEST_COORDINATES';
export const ADD_DEST = 'ADD_DEST';
export const DELETE_DESTS = 'DELETE_DESTS';
export const ADD_DEST_ROUTE = 'ADD_DEST_ROUTE';
export const ADD_DEST_ROUTE_ASYNC = 'ADD_DEST_ROUTE_ASYNC';
export const DELETE_DEST_ROUTE = 'DELETE_DEST_ROUTE';
export const ADD_START = 'ADD_START';

/**
 * Push the coordinates to redux
 * @param {*Coordinates format: String:lon,lat;lon,lat;} coords
 */
export const addDestCoordinates = (coords) => {
  return {
    type: ADD_DEST_COORDINATES,
    payload: coords
  };
};

export const addDestinationRoute = (route) => {
  return {
    type: ADD_DEST_ROUTE,
    payload: route
  };
};

export const deleteDestinationRoute = () => {
  return {
    type: DELETE_DEST_ROUTE,
    payload: null
  };
};

export const addDestinationRouteAsync = () => {
  return {
    type: ADD_DEST_ROUTE_ASYNC
  };
};

export const addDestination = (destination) => {
  return {
    type: ADD_DEST,
    payload: destination
  };
};

export const deleteDests = (id) => {
  return {
    type: DELETE_DESTS,
    payload: id
  };
};

export const addStartDestination = (destination) => {
  return {
    type: ADD_START,
    payload: destination
  };
};
