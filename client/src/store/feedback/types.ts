export const FEEDBACK_ADD_MESSAGE = 'FEEDBACK_ADD_MESSAGE';
export const FEEDBACK_REMOVE_MESSAGE = 'FEEDBACK_REMOVE_MESSAGE';

export type FeedbackMessage = {
  key: string;
  color: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

export type AddMessageAction = {
  type: typeof FEEDBACK_ADD_MESSAGE;
  payload: FeedbackMessage;
}

export type RemoveMessageAction = {
  type: typeof FEEDBACK_REMOVE_MESSAGE;
  payload: {
    key: string;
  }
};

export type FeedbackActionTypes =
  AddMessageAction
  | RemoveMessageAction;

export type FeedbackState = {
  messages: { [key: string]: FeedbackMessage };
}
