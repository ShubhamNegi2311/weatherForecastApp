/* REACT */
import React from 'react';
import { View } from 'react-native';

/** STYLE */
import { style } from './style';

type DividerViewProps = {
  height?: number;
  width?: number;
  color?: string;
};

const DividerView: React.FC<DividerViewProps> = (props) => {
  const viewStyle = style(props.height, props.width, props.color);
  return <View style={viewStyle.container} />;
};

export default DividerView;
