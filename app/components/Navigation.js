import React from 'react';
import {View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Restaurant from '../views/Restaurant';
import WaitSubmission from '../views/WaitSubmission';
import SearchRestaurant from '../views/SearchRestaurant';
import Login from '../../LoginController';

const AppNavigator = createStackNavigator(
  {
    Restaurant: {
      screen: Restaurant,
    },
    WaitSubmission: {
      screen: WaitSubmission,
    },
    SearchRestaurant: {
      screen: SearchRestaurant,
    },
    Login: {
      screen: Login,
    },
  },
  {
    initialRouteName: 'Restaurant',
  },
);

export default createAppContainer(AppNavigator);
