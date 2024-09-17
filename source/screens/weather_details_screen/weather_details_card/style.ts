import {StyleSheet} from 'react-native';
import {SCREEN_WIDTH} from 'utils/constants';

export const style = StyleSheet.create({
  detailsCard: {
    height: SCREEN_WIDTH * 0.25,
    width: SCREEN_WIDTH * 0.4,
    backgroundColor: '#E3E3E3',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
});
