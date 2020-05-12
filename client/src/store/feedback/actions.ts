import {
  FEEDBACK_ADD_MESSAGE,
  FEEDBACK_REMOVE_MESSAGE,
  FeedbackActionTypes,
  FeedbackMessage
} from './types';

export const removeMessage = (key: string): FeedbackActionTypes => {
  return {
    type: FEEDBACK_REMOVE_MESSAGE,
    payload: {
      key
    }
  };
};

export const addMessage = (message: FeedbackMessage): FeedbackActionTypes => {
  return {
    type: FEEDBACK_ADD_MESSAGE,
    payload: {
      ...message
    }
  };
};
