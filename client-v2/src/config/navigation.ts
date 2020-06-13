export enum AccessLevel {
  EVERYONE, USERS, ADMINS, UNREGISTERED
};

export type NavigationEntry = {
  view: AccessLevel;
  text: string;
  url: string;
}

export const NAVIGATION_ENTRIES: NavigationEntry[] = [
  {
    view: AccessLevel.ADMINS,
    text: 'Admin',
    url: '/admin'
  },
  {
    view: AccessLevel.UNREGISTERED,
    text: 'Log in',
    url: '/login'
  },
  {
    view: AccessLevel.USERS,
    text: 'Profile',
    url: '/profile'
  },
  {
    view: AccessLevel.USERS,
    text: 'Log out',
    url: '/logout'
  },
  {
    view: AccessLevel.EVERYONE,
    text: 'Recipes',
    url: '/recipes'
  }
];
