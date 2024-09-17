import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 20,
  },
  searchFieldView: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderColor: '#111111',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 20,
    borderRadius: 14,
  },
  placeholderText: {
    color: '#636363',
  },
  listView: {
    flexGrow: 1,
    flexShrink: 1,
  },
});
