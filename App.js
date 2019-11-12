/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import LoginController from './LoginController';
import Restaurant from './app/views/Restaurant';
import SearchRestaurant from './app/views/SearchRestaurant';

const App = () => {
  // return <Restaurant id="5d6ecc7e574d0b16d41b38f0" />;
  return <SearchRestaurant />;
};

export default App;
