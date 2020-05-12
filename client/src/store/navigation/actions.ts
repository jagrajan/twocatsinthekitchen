import {
  NAVIGATION_HIDE,
  NAVIGATION_SHOW,
  NavigationActionTypes
} from './types';

export const showNav = (): NavigationActionTypes => ({
  type: NAVIGATION_SHOW
});

export const hideNav = (): NavigationActionTypes => ({
  type: NAVIGATION_HIDE
});
