
import { CONNECTION_ERROR, REGISTER_ERROR, REMOVE_NOTIFY, OPTIMIZATION_ERROR } from '../actions/errorsAction';
import { CONNECTION_SUCCESS } from '../actions/successActions';

function notifyDispatcher(state = {}, action) {
  switch (action.type) {
  // ========================
  //        ERRORS
  // ========================
  case CONNECTION_ERROR:
    return {
      notifyType: 'error',
      message: 'Connection error: ' + action.payload
    };

  case REGISTER_ERROR:
    return {
      notifyType: 'error',
      message: 'Registration error: ' + action.payload
    };

  case OPTIMIZATION_ERROR:
    return {
      notifyType: 'error',
      message: 'Optmization error: ' + action.payload
    };
  // ========================
  //        SUCCESS
  // ========================
  case CONNECTION_SUCCESS:
    return {
      notifyType: 'success',
      message: 'Welcome: ' + action.payload
    };
  // ========================
  //         REMOVE
  // ========================
  case REMOVE_NOTIFY:
    return {};
  default:
    return state;
  }
}

export { notifyDispatcher };
