import { createAction } from 'typesafe-actions';

export type FeedbackMessage = {
  key: string;
  color: 'success' | 'info' | 'warning' | 'error';
  message: string;
}
export const addMessage = createAction('@feedback/ADD_MESSAGE')<FeedbackMessage>();
export const removeMessage = createAction('@feedback/REMOVE_MESSAGE')<string>();
