/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import LoginController from './LoginController';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Restaurant from './app/views/Restaurant';
import SearchRestaurant from './app/views/SearchRestaurant';

import AppContainer from './app/components/Navigation';

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
    initialRouteName: 'Restaurant',
  },
);

// const AppContainer = createAppContainer(AppNavigator);

const App = () => {
  // return <Restaurant id="5d6ecc7e574d0b16d41b38f0" />;
  return <AppContainer />;
};

export default App;
