import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {weatherForecast} from 'api';
import {AxiosError} from 'axios';
import SpaceView from 'components/atoms/space_view';
import {BottomSheetHeader} from 'components/molecules/bottom_sheet_header';
import {ForecastResponse} from 'data_models/api_data_models';
import {MainStackParamList} from 'navigation/types';
import React from 'react';
import {ActivityIndicator, FlatList, Image, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updateWeatherForecastList} from 'store/slices/weather_forecast_slice';
import {RootState} from 'store/store';
import {
  formatDateForDetailsScreen,
  formatIimageURL,
  showAlert,
} from 'utils/utilities';
import {style} from './style';
import {WeatherDetailsCardView} from './weather_details_card';

type WeatherDetailsScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'WeatherDetailsScreen'
>;

const WeatherDetailsScreen: React.FC<WeatherDetailsScreenProps> = props => {
  const {cityData} = props?.route?.params;
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const forecastData = useSelector(
    (state: RootState) => state.weather_forecast_slice.forecastDataList,
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (cityData) {
      hitGetWeatherForecastApi();
    }
  }, [cityData]);

  const hitGetWeatherForecastApi = async () => {
    try {
      setIsLoading(true);
      const response: ForecastResponse = await weatherForecast(
        cityData?.name ?? '',
      );
      console.log('RESPONSE ===>', JSON.stringify(response));

      dispatch(
        updateWeatherForecastList(response?.forecast?.forecastday ?? []),
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        showAlert(
          error?.message ?? 'Something went wrong! Please try after some time.',
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={style.mainContainer}>
      <BottomSheetHeader
        title={cityData?.name ?? ''}
        onBackClick={() => props?.navigation?.goBack()}
      />
      <SpaceView height={25} />
      {isLoading ? (
        <ActivityIndicator size={'large'} color={'#000000'} />
      ) : (
        <FlatList
          data={forecastData}
          renderItem={({item}) => {
            return (
              <View style={style.listItem}>
                <View style={style.itemBasicDetails}>
                  <Text style={style.basicDetailsText}>
                    {formatDateForDetailsScreen(item?.date ?? '')}
                  </Text>
                  <Image
                    style={{height: 50, width: 50}}
                    source={{
                      uri: formatIimageURL(item?.day?.condition?.icon ?? ''),
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      justifyContent: 'flex-end',
                    }}>
                    <Text style={style.basicDetailsText}>{`Min: ${
                      item?.day?.mintemp_c ?? ''
                    }°C`}</Text>
                    <SpaceView width={20} />
                    <Text style={style.basicDetailsText}>{`Max: ${
                      item?.day?.maxtemp_c ?? ''
                    }°C`}</Text>
                  </View>
                </View>
                <View style={style.itemExtraDetails}>
                  <View style={style.detailsRow}>
                    <WeatherDetailsCardView
                      iconName={'thermometer'}
                      headingText={'Average'}
                      displayText={
                        (item?.day?.avgtemp_c ?? 0).toString() + '°C'
                      }
                    />
                    <WeatherDetailsCardView
                      iconName={'air-filter'}
                      headingText={'Humidity'}
                      displayText={
                        (item?.day?.avghumidity ?? 0).toString() + ' %'
                      }
                    />
                  </View>
                  <View style={style.detailsRow}>
                    <WeatherDetailsCardView
                      iconName={'water-outline'}
                      headingText={'Precipitation'}
                      displayText={
                        (item?.day?.totalprecip_mm ?? 0).toString() + ' mm'
                      }
                    />
                    <WeatherDetailsCardView
                      iconName={'weather-windy'}
                      headingText={'Wind Speed'}
                      displayText={
                        (item?.day?.maxwind_kph ?? 0).toString() + ' KPH'
                      }
                    />
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default WeatherDetailsScreen;
