import React from 'react';
import {UserProvider} from './context/UserContext';
import RootNavigator from './navigation/RootNavigator';

const App = () => {
  return (
    <UserProvider>
      <RootNavigator />
    </UserProvider>
  );
};

export default App;
