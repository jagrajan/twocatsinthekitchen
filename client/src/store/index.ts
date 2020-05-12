import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { persistReducer, persistStore } from 'redux-persist';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'util/axios';
import storage from 'redux-persist/lib/storage';
import auth from './auth/reducers';
import feedback from './feedback/reducers';
import navigation from './navigation/reducers';
import recipe from './recipe/reducers';

const rootReducer = combineReducers({
  auth: persistReducer({ key: 'auth', storage }, auth),
  feedback,
  form,
  navigation,
  recipe
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(axios)))
);

export const persistor = persistStore(store);
