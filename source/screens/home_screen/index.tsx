import Geolocation from '@react-native-community/geolocation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {currentWeather, searchCityLatLng} from 'api';
import {AxiosError} from 'axios';
import SpaceView from 'components/atoms/space_view';
import {
  CurrentWeatherResponseData,
  SearchCityResponse,
} from 'data_models/api_data_models';
import {MainStackParamList} from 'navigation/types';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  PermissionsAndroid,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {updateCurrentWeatherData} from 'store/slices/current_weather_slice';
import {RootState} from 'store/store';
import {formatIimageURL, showAlert} from 'utils/utilities';
import {DetailsCardView} from './details_card';
import {style} from './style';

type HomeScreenProps = NativeStackScreenProps<MainStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC<HomeScreenProps> = props => {
  const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false);
  const currentWeatherData = useSelector(
    (state: RootState) => state.current_weather_slice.currentWeatherData,
  );
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [locationPermissionGranted, setLocationPermissionGranted] =
    React.useState<boolean>(true);

  const hitCurrentWeatherDetailsApi = async (city: string) => {
    try {
      setIsLoading(true);
      const responseData: CurrentWeatherResponseData = await currentWeather(
        city,
      );
      console.log('RESPONSE ==>', JSON.stringify(responseData));
      dispatch(updateCurrentWeatherData(responseData));
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('ERROR ==> ', JSON.stringify(error.message));
        showAlert(
          error?.message ?? 'Something went wrong! Please try after some time.',
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getUserLocationPermission = async () => {
    try {
      if (Platform.OS === 'ios') {
        // await Geolocation.requestAuthorization();
        await Geolocation.getCurrentPosition(
          async position => {
            const response: SearchCityResponse = await searchCityLatLng(
              position?.coords?.latitude ?? 0,
              position?.coords?.longitude ?? 0,
            );

            console.log('CITY ===>', JSON.stringify(response));

            if (response.length > 0) {
              await hitCurrentWeatherDetailsApi(response[0]?.name ?? '');
            }
          },
          error => {
            console.log(error);
          },
          {enableHighAccuracy: false, timeout: 600000, maximumAge: 10000},
        );
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        console.log('GRANTED ==>', granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setLocationPermissionGranted(true);
          Geolocation.getCurrentPosition(
            async position => {
              const response: SearchCityResponse = await searchCityLatLng(
                position?.coords?.latitude ?? 0,
                position?.coords?.longitude ?? 0,
              );

              console.log('CITY ===>', JSON.stringify(response));

              if (response.length > 0) {
                await hitCurrentWeatherDetailsApi(response[0]?.name ?? '');
              }
            },
            error => {
              console.log(error);
            },
            {enableHighAccuracy: false, timeout: 600000, maximumAge: 10000},
          );
        } else {
          setIsLoading(false);
          setLocationPermissionGranted(false);
          console.log('Location permission not granted!');
        }
      }
    } catch (error) {}
  };

  React.useEffect(() => {
    getUserLocationPermission();
  }, []);

  const searchClickHandler = React.useCallback(() => {
    props.navigation.navigate('CitySearchScreen');
  }, []);

  if (isLoading) {
    return (
      <View
        style={[
          style.mainContainer,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <ActivityIndicator size={'large'} color={'#000000'} />
      </View>
    );
  }

  if (!locationPermissionGranted) {
    return (
      <View
        style={[
          style.mainContainer,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}>
          {'Location Permission Not Granted!'}
        </Text>
        <SpaceView height={20} />
        <TouchableOpacity
          style={{backgroundColor: '#E3E3E3', padding: 15, borderRadius: 10}}
          onPress={async () => {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );

            if (granted === 'granted') {
            } else if (granted === 'denied') {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              );
              Geolocation.getCurrentPosition(
                async position => {
                  const response: SearchCityResponse = await searchCityLatLng(
                    position?.coords?.latitude ?? 0,
                    position?.coords?.longitude ?? 0,
                  );

                  console.log('CITY ===>', JSON.stringify(response));

                  if (response.length > 0) {
                    await hitCurrentWeatherDetailsApi(response[0]?.name ?? '');
                  }
                },
                error => {
                  console.log(error);
                },
                {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
              );
            } else if (granted === 'never_ask_again') {
              Linking.openSettings();
            }

            console.log('GRANTED ==>', granted);
          }}>
          <Text style={{color: '#000000', fontSize: 18}}>
            {'Grant Location Permission!'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={style.mainContainer}
      contentContainerStyle={style.mainContainer}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => {
            setIsRefreshing(true);
          }}
          colors={['#000000', '#000000']}
          tintColor={'#000000'}
        />
      }>
      <View style={style.upperContainer}>
        <View style={style.weatherLocationContainer}>
          <Text style={style.temperatureText}>{`${
            currentWeatherData?.current?.temp_c ?? 0
          }°C`}</Text>
          <View style={style.weatherCondition}>
            <Text style={style.weatherType}>
              {currentWeatherData?.current?.condition?.text ?? ''}
            </Text>
            <Image
              style={style.weatherConditionImage}
              source={{
                uri: formatIimageURL(
                  currentWeatherData?.current?.condition?.icon ?? '',
                ),
              }}
            />
          </View>
          <View style={style.locationContainer}>
            <MaterialIcons
              name={'map-marker-circle'}
              size={40}
              color={'#333333'}
            />
            <Text style={style.locationText}>
              {currentWeatherData?.location?.name ?? ''}
            </Text>
          </View>
        </View>
        <Pressable style={style.searchContainer} onPress={searchClickHandler}>
          <MaterialIcons name={'magnify'} size={40} color={'#333333'} />
        </Pressable>
      </View>
      <View style={style.bottomContainer}>
        <View style={style.detailsRow}>
          <DetailsCardView
            iconName={'thermometer'}
            headingText={'Feels Like'}
            displayText={`${currentWeatherData?.current?.feelslike_c ?? 0}°C`}
          />
          <DetailsCardView
            iconName={'air-filter'}
            headingText={'Humidity'}
            displayText={`${currentWeatherData?.current?.humidity ?? 0} %`}
          />
        </View>
        <View style={style.detailsRow}>
          <DetailsCardView
            iconName={'water-outline'}
            headingText={'Precipitation'}
            displayText={`${currentWeatherData?.current?.precip_mm ?? 0} mm`}
          />
          <DetailsCardView
            iconName={'weather-windy'}
            headingText={'Wind Speed'}
            displayText={`${currentWeatherData?.current?.wind_kph ?? 0} KPH`}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
