import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SpaceView from 'components/atoms/space_view';
import {CitySearchBottomSheet} from 'components/bottom_sheets/city_search_sheet';
import {BottomSheetHeader} from 'components/molecules/bottom_sheet_header';
import {SearchCityData} from 'data_models/api_data_models';
import {MainStackParamList} from 'navigation/types';
import React from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {updateUserSearchHistoryList} from 'store/slices/user_search_slice';
import {RootState} from 'store/store';
import {
  ReadDataFromAsyncStorage,
  SaveDataToAsyncStorage,
} from 'utils/async_storage_utils';
import {AsyncStorageKeys, SCREEN_WIDTH} from 'utils/constants';
import {style} from './style';

type CitySearchScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'CitySearchScreen'
>;

const CitySearchScreen: React.FC<CitySearchScreenProps> = props => {
  const savedCitiesList = useSelector(
    (state: RootState) => state.user_search_history_slice.userSearchHistoryData,
  );
  const dispatch = useDispatch();
  const bottomSheetRef = React.useRef(null);

  React.useEffect(() => {
    loadInitialdata();
  }, []);

  const loadInitialdata = async () => {
    const getCityList = await ReadDataFromAsyncStorage(
      AsyncStorageKeys.SEARCHED_CITIES_DATA,
    );

    if (getCityList) {
      const savedList: SearchCityData[] = JSON.parse(getCityList);
      // update data to redux state.
      dispatch(updateUserSearchHistoryList(savedList));
    }
  };

  const handleOnCitySelected = React.useCallback(
    async (data: SearchCityData) => {
      bottomSheetRef?.current?.close();
      props?.navigation?.navigate('WeatherDetailsScreen', {
        cityData: data,
      });

      const getCityList = await ReadDataFromAsyncStorage(
        AsyncStorageKeys.SEARCHED_CITIES_DATA,
      );
      let updatedCityList: SearchCityData[] = [];
      if (getCityList) {
        const savedCityList: SearchCityData[] = JSON.parse(getCityList);

        if (
          savedCityList.some(item => {
            return (item?.id ?? '') === (data?.id ?? '');
          })
        ) {
          // city already in the list
          updatedCityList = [...savedCityList];
        } else {
          updatedCityList = [...savedCityList, data];
        }
      } else {
        updatedCityList = [data];
      }

      await SaveDataToAsyncStorage(
        AsyncStorageKeys.SEARCHED_CITIES_DATA,
        JSON.stringify(updatedCityList),
      );

      // update data to redux state.
      dispatch(updateUserSearchHistoryList(updatedCityList));
    },
    [],
  );

  return (
    <View style={style.mainContainer}>
      <BottomSheetHeader
        title={'Search City'}
        onBackClick={() => props?.navigation?.goBack()}
      />
      <Pressable
        style={style.searchFieldView}
        onPress={() => {
          bottomSheetRef?.current?.open();
        }}>
        <MaterialIcons name={'magnify'} size={30} color={'#636363'} />
        <SpaceView width={10} />
        <Text style={style.placeholderText}>{'Search'}</Text>
      </Pressable>
      <FlatList
        style={style.listView}
        contentContainerStyle={style.listView}
        data={savedCitiesList}
        renderItem={({item}) => {
          return (
            <Pressable
              style={{
                width: SCREEN_WIDTH * 0.9,
                borderWidth: 1,
                borderRadius: 14,
                borderColor: '#111111',
                paddingVertical: 10,
                paddingHorizontal: 10,
                marginBottom: 20,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}
              onPress={() => {
                props?.navigation?.navigate('WeatherDetailsScreen', {
                  cityData: item,
                });
              }}>
              <MaterialIcons name={'map-marker'} size={30} color={'#000000'} />
              <Text style={{flex: 1, color: '#000000'}} numberOfLines={1}>
                {`${item?.name ?? ''}, ${item?.region ?? ''}, ${
                  item?.country ?? ''
                }`}
              </Text>
            </Pressable>
          );
        }}
        ListHeaderComponent={
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              paddingVertical: 20,
              color: '#000000',
            }}>
            {'Saved Cities'}
          </Text>
        }
        ListEmptyComponent={
          <Text style={{color: '#000000'}}>{'No Saved Records Found!'}</Text>
        }
      />
      <CitySearchBottomSheet
        reff={bottomSheetRef}
        onItemClicked={handleOnCitySelected}
      />
    </View>
  );
};

export default CitySearchScreen;
