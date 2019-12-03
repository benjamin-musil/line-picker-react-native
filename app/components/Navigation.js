import React from 'react';
import {View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import Restaurant from '../views/Restaurant';
import WaitSubmission from '../views/WaitSubmission';
import SearchRestaurant from '../views/SearchRestaurant';
import AddRestaurant from '../views/AddRestaurant';
import Login from '../../LoginController';
import HomePage from '../views/HomePage';
import UserSettings from '../views/UserSettings';
import MySubmission from '../views/MySubmission';
import RecentReportsMap from '../views/RecentReportsMap';
import {createDrawerNavigator} from 'react-navigation-drawer';

const AppNavigator = createDrawerNavigator(
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
    RecentReportsMap: {
      screen: RecentReportsMap,
    },
  },
  {
    initialRouteName: 'Login',
  },
);
export default createAppContainer(AppNavigator);
