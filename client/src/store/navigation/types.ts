export const NAVIGATION_SHOW = 'NAVIGATION_SHOW';
export const NAVIGATION_HIDE = 'NAVIGATION_HIDE';

export interface NavigationShowAction {
  type: typeof NAVIGATION_SHOW;
}

export interface NavigationHideAction {
  type: typeof NAVIGATION_HIDE;
}

export type NavigationActionTypes =
  NavigationShowAction
  | NavigationHideAction;

export interface NavigationState {
  showNav: boolean;
}
