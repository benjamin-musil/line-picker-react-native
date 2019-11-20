import React from 'react';
import {View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Restaurant from '../views/Restaurant';
import SearchRestaurant from '../views/SearchRestaurant';
import AddRestaurant from '../views/AddRestaurant';
import Login from '../../LoginController';
const AppNavigator = createStackNavigator(
  {
    Restaurant: {
      screen: Restaurant,
    },
    SearchRestaurant: {
      screen: SearchRestaurant,
    },
    Login: {
      screen: Login,
    },
    AddRestaurant: {
      screen: AddRestaurant,
    },
  },
  {
    initialRouteName: 'Login',
  },
);

export default createAppContainer(AppNavigator);
