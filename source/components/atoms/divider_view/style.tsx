import {StyleSheet} from 'react-native';

export const style = (height?: number, width?: number, color?: string) =>
  StyleSheet.create({
    container: {
      height: height ?? 1,
      width: width ?? '100%',
      backgroundColor: color ?? '#0000000',
    },
  });
