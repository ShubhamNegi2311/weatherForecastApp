/* REACT */
import React from 'react';
import {View} from 'react-native';

/*STYLE */
import {style} from './style';

interface SpaceViewProps {
  height?: number;
  width?: number;
}

const SpaceView: React.FC<SpaceViewProps> = props => {
  const viewStyle = style(
    props.height ? props.height : 0,
    props.width ? props.width : 0,
  );
  return <View style={viewStyle.container} />;
};

export default SpaceView;
