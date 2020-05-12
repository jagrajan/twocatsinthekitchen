import {
  FEEDBACK_ADD_MESSAGE,
  FEEDBACK_REMOVE_MESSAGE,
  AddMessageAction,
  RemoveMessageAction,
  FeedbackState,
  FeedbackActionTypes
} from './types';

const INITIAL_STATE: FeedbackState = {
  messages: {}
};

const feedbackAddMessage = (
  state: FeedbackState,
  action: AddMessageAction
): FeedbackState => {
  const messages = { ...state.messages };
  messages[action.payload.key] = { ...action.payload};
  return {
    ...state,
    messages
  };
};

const feedbackRemoveMessage = (
  state: FeedbackState,
  action: RemoveMessageAction
): FeedbackState => {
  const messages = { ...state.messages };
  delete messages[action.payload.key];
  return {
    ...state,
    messages
  };
};

const reducer = (
  state: FeedbackState = INITIAL_STATE,
  action: FeedbackActionTypes
) => {
  switch(action.type) {
    case FEEDBACK_ADD_MESSAGE:
      return feedbackAddMessage(state, action);
    case FEEDBACK_REMOVE_MESSAGE:
      return feedbackRemoveMessage(state, action);
    default:
      return state;
  }
};

export default reducer;
