import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  bottomSheetContainer: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#E3E3E3',
  },
  parentContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    paddingTop: 25,
  },
  flatListContainer: {width: '100%', alignItems: 'center'},
  searchFieldView: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#111111',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 20,
  },
});
