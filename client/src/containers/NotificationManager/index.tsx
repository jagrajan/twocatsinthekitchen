import React, { FC, Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { RootState } from 'store';
import { addMessage, removeMessage } from 'store/feedback/actions';

const NotficationManager: FC<PropsFromRedux> = ({ addMessage, children, messages, removeMessage }) => {
  return (
    <Fragment>
      {children}
      {Object.values(messages).map(fm => {
        return (
          <Snackbar
            open={true}
            autoHideDuration={6000}
            onClose={() => removeMessage(fm.key)}
          >
            <Alert onClose={() => removeMessage(fm.key)} color={fm.color}>
              {fm.message}
            </Alert>
          </Snackbar>
        );
      })}
    </Fragment>
  );
};

const mapState = (state: RootState) => ({
  messages: state.feedback.messages
});

const mapDispatch = {
  addMessage,
  removeMessage
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(NotficationManager);
