import{
  AUTH_DELETE_KEY,
  AUTH_STORE_KEY,
  AUTH_UPDATE_KEY_INFO,
  AUTH_UPDATE_USER_INFO,
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
    case AUTH_UPDATE_KEY_INFO:
      return { ...state, info: action.payload.key };
    case AUTH_UPDATE_USER_INFO:
      return { ...state, user: action.payload.user };
    default:
      return state;
  }
};

export default reducer;
