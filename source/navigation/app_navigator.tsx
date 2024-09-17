import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CitySearchScreen from 'screens/city_search_screen';
import HomeScreen from 'screens/home_screen';
import WeatherDetailsScreen from 'screens/weather_details_screen';
import {MainStackParamList} from './types';

const AppNavigator: React.FC = () => {
  // create native stack instance.
  const Stack = createNativeStackNavigator<MainStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'HomeScreen'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
        <Stack.Screen name={'CitySearchScreen'} component={CitySearchScreen} />
        <Stack.Screen
          name={'WeatherDetailsScreen'}
          component={WeatherDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
