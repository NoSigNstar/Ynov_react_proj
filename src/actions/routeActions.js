export const ADD_DEST_ROUTE = 'ADD_DEST_ROUTE';
export const ADD_DEST_ROUTE_ASYNC = 'ADD_DEST_ROUTE_ASYNC';
export const DELETE_DEST_ROUTE = 'DELETE_DEST_ROUTE';

/**
 * Add a complete geojson route
 * @param {*Geojson route} route
 */
export const addDestinationRoute = (route) => {
  return {
    type: ADD_DEST_ROUTE,
    payload: route
  };
};

  /**
   * Delete routes from the store
   */
export const deleteDestinationRoute = () => {
  return {
    type: DELETE_DEST_ROUTE,
    payload: null
  };
};

  /**
   * Fetch routes from API according to the Destinations selected
   */
export const addDestinationRouteAsync = () => {
  return {
    type: ADD_DEST_ROUTE_ASYNC
  };
};
