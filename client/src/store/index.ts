import { RootAction, RootState } from '@twocats/store';
import { Services } from '@twocats/services';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './root-reducer';
import rootEpic from './root-epic';
import services from '../services';

export const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState,
  Services
>({
  dependencies: services
});

export const history = createBrowserHistory();
const middlewares = [routerMiddleware(history), epicMiddleware];

const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

const initialState = {};

const store = createStore(rootReducer(history), initialState, enhancer);

epicMiddleware.run(rootEpic);

export default store;
