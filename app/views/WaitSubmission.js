import React,  { Component } from 'react';
import {StyleSheet, ScrollView, View, Text, TextInput, Button, Image, Alert} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import moment from 'moment';
import Geolocation from '@react-native-community/geolocation';
import { RNCamera } from 'react-native-camera';

export default class WaitSubmission extends React.Component {
  // Title of view for navigation
  static navigationOptions = {
    title: 'WaitSubmission'
  };

  // Initiate state for geolocation
  // https://github.com/react-native-community/react-native-geolocation
  state = {
    location: null
  }

  // Function to get coordinates in JSON format
  findCoordinates = () => {
    Geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);

        this.setState({ location });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000} // maximumAge: 1000, might need for iOS
    );
  };

  render() {
    return (
      <View>
        <ScrollView
          style={styles.scrollView}
          contentInsetAdjustmentBehavior="automatic">
              <Text>Camera API Here</Text>
              <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              />
        </ScrollView>
          <Button
            title="Snag a Pic"
            onPress={this.findCoordinates}
          />
          <Button
            title="Submit"
            onPress={this.findCoordinates}
          />
          <Text>Location: {this.state.location}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.black,
  },
  image: {
    height: 100,
    width: 100,
  },
  center: {justifyContent: 'center', alignItems: 'center'},
  textInput: {
    height: 40,
  },
  pickerTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    paddingBottom: 0,
    paddingTop: 'auto',
    color: Colors.black,
    marginBottom: 0,
  },
  inputTitle: {
    fontSize: 18,
  },
  scrollView: {
    marginHorizontal: 20,
    maxHeight: 250,
  },
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  row: {height: 28},
  text: {margin: 6, color: 'black'},
});
