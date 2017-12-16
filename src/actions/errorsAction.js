export const CONNECTION_ERROR = 'CONNECTION_ERROR';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REMOVE_NOTIFY = 'REMOVE_NOTIFY';

export function connectionError(error) {
  return {
    type: CONNECTION_ERROR,
    payload: error
  };
}

export function removeNotify() {
  return {
    type: REMOVE_NOTIFY,
    payload: null
  };
}

export function registerError(error) {
  return {
    type: REGISTER_ERROR,
    payload: error
  };
}
