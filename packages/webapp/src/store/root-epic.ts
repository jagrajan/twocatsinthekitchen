import { combineEpics } from 'redux-observable';

import * as auth from './auth/epics';
import * as browse from './browse/epics';
import * as recipe from './recipe/epics';
import * as recipeEditor from './recipeEditor/epics';

export default combineEpics(
  ...Object.values(auth),
  ...Object.values(browse),
  ...Object.values(recipe),
  ...Object.values(recipeEditor)
);
