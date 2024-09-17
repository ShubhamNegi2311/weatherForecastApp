import SpaceView from 'components/atoms/space_view';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type BottomSheetHeaderContainerProps = {
  title: string;
  onBackClick: () => void;
};

const BottomSheetHeaderContainer: React.FC<
  BottomSheetHeaderContainerProps
> = props => {
  return (
    <View style={style.mainContainer}>
      <Pressable onPress={props.onBackClick}>
        <MaterialIcons size={30} name={'arrow-left'} color={'#000000'} />
      </Pressable>
      <SpaceView width={30} />
      <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}>
        {props.title}
      </Text>
    </View>
  );
};

export const BottomSheetHeader = React.memo(BottomSheetHeaderContainer);

const style = StyleSheet.create({
  mainContainer: {
    width: '100%',
    paddingStart: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
