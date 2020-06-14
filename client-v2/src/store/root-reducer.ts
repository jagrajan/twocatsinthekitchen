import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import auth from './auth/reducers';
import { reducer as form } from 'redux-form';
import recipe from './recipe/reducers';
import recipeEditor from './recipeEditor/reducers';

const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    form,
    recipe,
    recipeEditor,
  });

export default rootReducer;
