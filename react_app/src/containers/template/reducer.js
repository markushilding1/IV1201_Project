import {CONSTANT} from './constants';

const INITIAL_STATE = {
  loading: false,
  error: null,
};

function nameReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SOME_ACTION:
      return {
        ...state,
        loading: true,
        error: null,
      };
    default:
      break;
  }
  return state;
}

export default nameReducer;
