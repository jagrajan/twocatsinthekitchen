import { useDispatch } from 'react-redux';
import { addMessage, FeedbackMessage } from 'store/feedback/actions';

const useNotification = () => {
  const dispatch = useDispatch();
  return function(message: FeedbackMessage) {
    dispatch(addMessage(message));
  }
};

export default useNotification;
