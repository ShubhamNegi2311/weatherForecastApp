import React from 'react';

type NetworkContextType = {
  isConnected: boolean;
  setIsConnected: (value: boolean) => void;
};

const initialState: NetworkContextType = {
  isConnected: true,
  setIsConnected: () => {},
};

export const NetworkContext = React.createContext(initialState);

type NetworkContextProviderType = {
  children: React.ReactNode;
};

export const NetworkProvider = (props: NetworkContextProviderType) => {
  const [isConnected, setIsConnectedValue] = React.useState(true);

  const setIsConnected = (value: boolean) => {
    setIsConnectedValue(value);
  };

  const value = {isConnected, setIsConnected};

  return (
    <NetworkContext.Provider value={value}>
      {props.children}
    </NetworkContext.Provider>
  );
};
