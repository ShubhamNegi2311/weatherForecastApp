import AppContainer from 'components/HOC/app_container';
import {NetworkProvider} from 'context/network_provider';
import AppNavigator from 'navigation/app_navigator';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from 'store/store';

const App = () => {
  return (
    <AppContainer>
      <NetworkProvider>
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </NetworkProvider>
    </AppContainer>
  );
};

export default App;
