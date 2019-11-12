import React from 'react';
import {View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Restaurant from '../views/Restaurant';
import SearchRestaurant from '../views/SearchRestaurant';
const AppNavigator = createStackNavigator(
  {
    Restaurant: {
      screen: Restaurant,
    },
    SearchRestaurant: {
      screen: SearchRestaurant,
    },
  },
  {
    initialRouteName: 'SearchRestaurant',
  },
);

export default createAppContainer(AppNavigator);
