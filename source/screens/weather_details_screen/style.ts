import {StyleSheet} from 'react-native';
import {SCREEN_WIDTH} from 'utils/constants';

export const style = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 20,
  },
  listView: {
    flexGrow: 1,
    flexShrink: 1,
  },
  listItem: {
    width: SCREEN_WIDTH * 0.9,
    borderWidth: 1,
    borderColor: '#111111',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  itemBasicDetails: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  basicDetailsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  itemExtraDetails: {
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  detailsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
  },
});
