import AppContainer from 'components/HOC/app_container';
import {NetworkProvider} from 'context/network_provider';
import AppNavigator from 'navigation/app_navigator';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from 'store/store';

const App = () => {
  return (
    <NetworkProvider>
      <AppContainer>
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </AppContainer>
    </NetworkProvider>
  );
};

export default App;
