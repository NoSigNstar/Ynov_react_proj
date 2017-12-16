export const ADD_DEST_COORDINATES = 'ADD_DEST_COORDINATES';
export const ADD_DEST = 'ADD_DEST';
export const DELETE_DESTS = 'DELETE_DESTS';
export const ADD_START = 'ADD_START';
export const REPLACE_DESTINATIONS = 'REPLACE_DESTINATIONS';

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


/**
 * Add a new destination
 * @param {*Destination Object} destination
 */
export const addDestination = (destination) => {
  return {
    type: ADD_DEST,
    payload: destination
  };
};

/**
 * Remove a destination according to the specific ID
 * @param {*Destination id} id
 */
export const deleteDests = (id) => {
  return {
    type: DELETE_DESTS,
    payload: id
  };
};

/**
 * Add the start position, alway fist of all destinations
 * @param {*Destination Object} destination
 */
export const addStartDestination = (destination) => {
  return {
    type: ADD_START,
    payload: destination
  };
};

/**
 * Re-order the destinations, triggered by the optimization return
 * @param {*new destinations array} destinations
 */
export const replaceDestinations = (destinations) => {
  return {
    type: REPLACE_DESTINATIONS,
    payload: destinations
  };
};
