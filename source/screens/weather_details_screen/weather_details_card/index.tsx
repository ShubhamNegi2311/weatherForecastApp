import React from 'react';
import {Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {style} from './style';

type WeatherDetailsCardProps = {
  iconName: string;
  headingText: string;
  displayText: string;
};

const WeatherDetailsCard: React.FC<WeatherDetailsCardProps> = props => {
  const {iconName, headingText, displayText} = props;
  return (
    <View style={style.detailsCard}>
      <MaterialIcons name={iconName} size={25} color={'#333333'} />
      <Text style={style.headingText}>{headingText}</Text>
      <Text style={style.descriptionText}>{displayText}</Text>
    </View>
  );
};

export const WeatherDetailsCardView = React.memo(WeatherDetailsCard);
