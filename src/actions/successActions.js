export const CONNECTION_SUCCESS = 'CONNECTION_SUCCESS';

export function connectionSuccess(success) {
  return {
    type: CONNECTION_SUCCESS,
    payload: success
  };
}
