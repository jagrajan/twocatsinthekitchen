import{
  AUTH_DELETE_KEY,
  AUTH_STORE_KEY,
  AuthState,
  AuthActionTypes
} from './types';

const INITIAL_STATE: AuthState = {
};

const reducer = (state: AuthState = INITIAL_STATE,
                 action: AuthActionTypes) => {
  switch(action.type) {
    case AUTH_STORE_KEY:
      return { ...state, key: action.payload.key };
    case AUTH_DELETE_KEY:
      return { ...state, key: undefined };
    default:
      return state;
  }
};

export default reducer;
