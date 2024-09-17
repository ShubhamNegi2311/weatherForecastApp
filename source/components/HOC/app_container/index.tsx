import NetInfo from '@react-native-community/netinfo';
import NoInternet from 'components/molecules/no_internet';
import {NetworkContext} from 'context/network_provider';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {style} from './style';

type AppContainerProps = {
  children: React.ReactNode;
};

const AppContainer: React.FC<AppContainerProps> = props => {
  const {isConnected, setIsConnected} = React.useContext(NetworkContext);

  React.useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = state.isConnected && state.isInternetReachable;
      setIsConnected(offline ?? true);
    });
    return () => removeNetInfoSubscription();
  }, []);

  return (
    <SafeAreaView style={style.mainContainer}>
      {!isConnected ? <NoInternet /> : false}
      {props.children}
    </SafeAreaView>
  );
};

export default AppContainer;
