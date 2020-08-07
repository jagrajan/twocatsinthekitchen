import { routerActions } from 'connected-react-router';
import * as authActions from './auth/actions';
import * as browseActions from './browse/actions';
import * as feedbackActions from './feedback/actions';
import * as recipeActions from './recipe/actions';
import * as RecipeEditorActions from './recipeEditor/actions';

export default {
  auth: authActions,
  browse: browseActions,
  feedback: feedbackActions,
  recipe: recipeActions,
  recipeEditor: RecipeEditorActions,
  router: routerActions,
};
