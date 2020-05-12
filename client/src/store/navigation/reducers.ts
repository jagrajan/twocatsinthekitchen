import {
  NAVIGATION_HIDE,
  NAVIGATION_SHOW,
  NavigationState,
  NavigationActionTypes
} from './types';

const INITIAL_STATE: NavigationState = {
  showNav: false
};

const setNav = (state: NavigationState, action: NavigationActionTypes) => {
  switch (action.type) {
    case NAVIGATION_SHOW:
      return { ...state, showNav: true };
    case NAVIGATION_HIDE:
      return {...state, showNav: false };
    default:
      return state;
  }
};

const reducer = (state: NavigationState = INITIAL_STATE,
                 action: NavigationActionTypes) => {
  switch(action.type) {
    case NAVIGATION_HIDE:
    case NAVIGATION_SHOW:
      return setNav(state, action);
    default:
      return state;
  }
};

export default reducer;
