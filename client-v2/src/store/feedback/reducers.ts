import { addMessage, removeMessage, FeedbackMessage } from './actions';
import { createReducer } from 'typesafe-actions';
import { RootAction } from '@twocats/store';
import { Map } from 'immutable';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  messages: createReducer<Map<string, FeedbackMessage>, RootAction>(Map())
    .handleAction(addMessage, (state, action) => state.set(action.payload.key, action.payload))
    .handleAction(removeMessage, (state, action) => state.remove(action.payload))
});

export default reducers;
