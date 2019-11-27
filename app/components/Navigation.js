import React from 'react';
import {View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Restaurant from '../views/Restaurant';
import WaitSubmission from '../views/WaitSubmission';
import SearchRestaurant from '../views/SearchRestaurant';
import AddRestaurant from '../views/AddRestaurant';
import Login from '../../LoginController';
import HomePage from '../views/HomePage';
import UserSettings from '../views/UserSettings';
import MySubmission from '../views/MySubmission';
import {createDrawerNavigator} from 'react-navigation-drawer';

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
    AddRestaurant: {
      screen: AddRestaurant,
    },
    HomePage: {
      screen: HomePage,
    },
    UserSettings: {
      screen: UserSettings,
    },
    MySubmission: {
      screen: MySubmission,
    },
  },
  {
    initialRouteName: 'Login',
  },
);
export default createAppContainer(AppNavigator);
