import React from 'react';
import {Animated, Text} from 'react-native';
import {style} from './style';

const NoInternet = () => {
  return (
    <Animated.View style={style.container}>
      <Text style={style.text}>{'No Internet Connection'}</Text>
    </Animated.View>
  );
};

export default NoInternet;
