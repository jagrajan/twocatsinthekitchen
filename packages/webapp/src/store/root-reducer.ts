import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import auth from './auth/reducers';
import browse from './browse/reducers';
import { reducer as form } from 'redux-form';
import feedback from './feedback/reducers';
import recipe from './recipe/reducers';
import recipeEditor from './recipeEditor/reducers';

const rootReducer = (history: History) =>
  combineReducers({
    auth,
    browse,
    feedback,
    form,
    recipe,
    recipeEditor,
    router: connectRouter(history),
  });

export default rootReducer;
