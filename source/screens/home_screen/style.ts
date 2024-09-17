import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FFFFFF',
  },

  upperContainer: {
    height: '55%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherLocationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomContainer: {
    height: '45%',
    width: '100%',
  },
  detailsRow: {
    width: '100%',
    height: '50%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  temperatureText: {
    fontSize: 75,
    fontWeight: 'bold',
    color: '#000000',
  },
  locationText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000000',
    marginStart: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherType: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000000',
  },
  searchContainer: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
  weatherCondition: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherConditionImage: {height: 70, width: 70},
});
