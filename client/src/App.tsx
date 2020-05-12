import React from 'react';
import Router from './components/Router';
import ThemeProvider from './components/ThemeProvider';
import NotificationsManager from './containers/NotificationManager';

function App() {
  return (
    <ThemeProvider>
      <NotificationsManager>
        <Router />
      </NotificationsManager>
    </ThemeProvider>
  );
}

export default App;
