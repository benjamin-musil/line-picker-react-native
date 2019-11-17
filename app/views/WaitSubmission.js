import React,  { Component } from 'react';
import {StyleSheet, ScrollView, View, Text, TextInput, Button, Image} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import moment from 'moment';

export default class WaitSubmission extends React.Component {
  static navigationOptions = {
    title: 'WaitSubmission'
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
            title="Submit"
          />
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
