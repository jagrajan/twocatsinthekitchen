import React, { FC, Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { RootState } from '@twocats/store';
import { addMessage, removeMessage } from 'store/feedback/actions';

const NotficationManager: FC<PropsFromRedux> = ({ children, messages, removeMessage }) => {
  return (
    <Fragment>
      {children}
      {Object.values(messages).map(fm => {
        return (
          <Snackbar
            key={fm[1].key}
            open={true}
            autoHideDuration={6000}
            onClose={() => removeMessage(fm[1].key)}
          >
            <Alert
              onClose={() => removeMessage(fm[1].key)}
              severity={fm[1].color}
              variant="filled"
            >
              {fm[1].message}
            </Alert>
          </Snackbar>
        );
      })}
    </Fragment>
  );
};

const mapState = (state: RootState) => ({
  messages: state.feedback.messages.toArray(),
});

const mapDispatch = {
  addMessage,
  removeMessage
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(NotficationManager);
