import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Table, Row, Rows} from 'react-native-table-component';
import moment from 'moment';
import {NavigationEvents} from 'react-navigation';

export default class MySubmission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      WaitTimes: [],
      imageSubmissions: [],
      loading: false,
      userid: '',
    };
  }

  async PageLoadEvent() {
    let userId = await AsyncStorage.getItem('userid');
    let token = await AsyncStorage.getItem('token');
    fetch(
      'https://apt-line-picker.appspot.com/mobile/' + userId + '/mysubmissions',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
      },
    )
      .then(response => response.json())
      .then(response => {
        let arrWaitSubmission = [];
        response.wait_submissions.forEach(waitTime => {
          var datetime = waitTime[1];
          datetime = moment(datetime).format('YYYY-MM-DD HH:mm:ss');
          let arrWaitTime = [waitTime[0], datetime, waitTime[2]];
          arrWaitSubmission.push(arrWaitTime);
        });
        this.setState({WaitTimes: arrWaitSubmission});

        let arrimage_submissions = [];
        response.image_submissions.forEach(imageSubmission => {
          let imageSubmissionArr = [
            imageSubmission[1],
            <Image
              style={styles.image}
              source={
                imageSubmission[0] != '' ? {uri: imageSubmission[0]} : null
              }
            />,
          ];

          arrimage_submissions.push(imageSubmissionArr);
        });
        this.setState({imageSubmissions: arrimage_submissions});
      })
      .catch(error => {
        console.log(error);
      });
  }
  componentDidMount() {}

  render() {
    return (
      <SafeAreaView>
        <View>
          <NavigationEvents onDidFocus={() => this.PageLoadEvent()} />
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.MenuIcon}
            onPress={this.props.navigation.toggleDrawer}>
            <Image
              source={require('../StaticContent/IMG/MenuIconIMG.jpeg')}
              style={styles.MenuIcon}
            />
          </TouchableOpacity>
          <View
            style={{borderColor: 'light grey', borderWidth: 0, fontSize: 1}}>
            <ScrollView
              style={styles.scrollView}
              contentInsetAdjustmentBehavior="automatic">
              <Table style={{borderWidth: 0}}>
                <Row
                  data={['Wait Time(Min)', 'Date', 'Restaurant']}
                  style={styles.head}
                  textStyle={styles.text}
                />

                <Rows
                  data={this.state.WaitTimes}
                  style={styles.row}
                  textStyle={styles.text}
                />
              </Table>
            </ScrollView>
          </View>

          <View style={{borderColor: 'light grey', borderWidth: 0}}>
            <ScrollView
              style={styles.scrollView}
              contentInsetAdjustmentBehavior="automatic">
              <Table>
                <Row
                  data={['Restaurant', 'Image']}
                  style={styles.head}
                  textStyle={styles.text}
                />
                <Rows
                  data={this.state.imageSubmissions}
                  style={styles.row}
                  textStyle={styles.text}
                />
              </Table>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  ButtonPadding: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
    margin: 20,
    backgroundColor: 'red',
  },
  red: {
    color: 'red',
  },

  head: {height: 30, backgroundColor: '#f1f8ff', marginRight: 0},
  row: {flex: 1, flexDirection: 'row', height: 25, margin: 0},
  text: {margin: 2, fontSize: 10, margin: 0},
  ContentHolder: {marginTop: 10},
  scrollView: {
    marginHorizontal: 2,
    maxHeight: 250,
    marginBottom: 10,
  },
  image: {
    height: 100,
    width: 50,
  },
  MenuIcon: {width: 40, height: 40},
});
