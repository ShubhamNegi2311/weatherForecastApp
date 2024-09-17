import React from 'react';
import {Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {style} from './style';

type DetailsCardProps = {
  iconName: string;
  headingText: string;
  displayText: string;
};

const DetailsCard: React.FC<DetailsCardProps> = props => {
  const {iconName, headingText, displayText} = props;
  return (
    <View style={style.detailsCard}>
      <MaterialIcons name={iconName} size={45} color={'#333333'} />
      <Text style={style.headingText}>{headingText}</Text>
      <Text style={style.descriptionText}>{displayText}</Text>
    </View>
  );
};

export const DetailsCardView = React.memo(DetailsCard);
