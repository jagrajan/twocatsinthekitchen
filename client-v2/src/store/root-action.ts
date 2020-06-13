import { routerActions } from 'connected-react-router';
import * as authActions from './auth/actions';
import * as recipeActions from './recipe/actions';

export default {
  router: routerActions,
  auth: authActions,
  recipe: recipeActions,
};
