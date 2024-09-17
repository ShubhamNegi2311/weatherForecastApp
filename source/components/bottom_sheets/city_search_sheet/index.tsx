import {searchCity} from 'api';
import {AxiosError} from 'axios';
import SpaceView from 'components/atoms/space_view';
import {BottomSheetHeader} from 'components/molecules/bottom_sheet_header';
import {SearchCityData, SearchCityResponse} from 'data_models/api_data_models';
import useDebounceForApi from 'hooks/useDebounceForApi';
import React, {MutableRefObject} from 'react';
import {FlatList, Pressable, Text, TextInput, View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from 'utils/constants';
import {style} from './style';

type CitySearchSheetProps = {
  reff: MutableRefObject<any>;
  onItemClicked: (data: SearchCityData) => void;
};

const CitySearchSheet: React.FC<CitySearchSheetProps> = props => {
  const {reff, onItemClicked} = props;
  const [searchText, setSearchText] = React.useState<string>('');
  const [apiErrorMsg, setApiErrorMsg] =
    React.useState<string>('No Records Found!');
  const debouncedSearchText = useDebounceForApi(searchText, 300);
  const [cities, setCities] = React.useState<SearchCityData[]>([]);
  const textInputRef = React.useRef<TextInput>(null);

  React.useEffect(() => {
    if (debouncedSearchText) {
      hitSearchCityApi();
    } else {
      setCities([]);
      setApiErrorMsg('No Records Found!');
    }
  }, [debouncedSearchText]);

  const hitSearchCityApi = async () => {
    try {
      const response: SearchCityResponse = await searchCity(
        debouncedSearchText,
      );
      setCities(response);
    } catch (error) {
      if (error instanceof AxiosError) {
        setApiErrorMsg(error?.message ?? 'No Records Found!');
      }
    }
  };

  return (
    <RBSheet
      ref={reff}
      onClose={() => {
        setSearchText('');
      }}
      onOpen={() => {
        textInputRef?.current?.focus();
      }}
      // closeOnPressMask
      closeOnPressBack
      draggable
      height={SCREEN_HEIGHT * 0.8}
      customStyles={{
        draggableIcon: {
          height: 10,
          width: 75,
        },
        container: style.bottomSheetContainer,
      }}>
      <View style={style.parentContainer}>
        <BottomSheetHeader
          onBackClick={() => {
            reff?.current?.close();
          }}
          title={'Search City'}
        />
        <View style={style.searchFieldView}>
          <MaterialIcons name={'magnify'} size={30} color={'#636363'} />
          <SpaceView width={10} />
          <TextInput
            ref={textInputRef}
            style={{flex: 1, fontSize: 16, color: '#000'}}
            value={searchText}
            onChangeText={setSearchText}
            numberOfLines={1}
            placeholder={'Search..'}
            placeholderTextColor={'#555555'}
          />
        </View>
        <View style={{flexGrow: 1, flexShrink: 1, paddingTop: 20}}>
          <FlatList
            data={cities}
            renderItem={({item, index}) => {
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
                  onPress={() => onItemClicked(item)}>
                  <MaterialIcons
                    name={'map-marker'}
                    size={30}
                    color="#000000"
                  />
                  <Text style={{flex: 1, color: '#000000'}} numberOfLines={1}>
                    {`${item?.name ?? ''}, ${item?.region ?? ''}, ${
                      item?.country ?? ''
                    }`}
                  </Text>
                </Pressable>
              );
            }}
            keyExtractor={item => item?.id?.toString()}
            ListEmptyComponent={() => (
              <Text style={{color: '#000000'}}>{apiErrorMsg}</Text>
            )}
          />
        </View>
      </View>
    </RBSheet>
  );
};

export const CitySearchBottomSheet = React.memo(CitySearchSheet);
