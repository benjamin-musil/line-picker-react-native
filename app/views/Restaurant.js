import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Table, Row, Rows} from 'react-native-table-component';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationEvents} from 'react-navigation';
import moment from 'moment';

export default class Restaurant extends React.Component {
  static navigationOptions = {
    title: 'Restaurant',
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      waitTimes: [],
      images: [],
    };
  }

  async PageLoadEvent() {
    let token = await AsyncStorage.getItem('token');
    let id = await AsyncStorage.getItem('id');
    this.setState({id, token});
    fetch('https://apt-line-picker.appspot.com/mobile/restaurant/' + id, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: token,
        mode: 'no-cors',
        cache: 'no-cache',
      },
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        let waitTimes = [];
        if (response.wait_times) {
          response.wait_times.forEach(element => {
            waitTimes.push([
              element[0],
              moment(element[1]).format('M-DD-YYYY HH:MM'),
              element[2],
            ]);
          });
        } else {
          waitTimes.push([['None'], [''], ['']]);
        }
        this.setState({
          name: response.name,
          address: response.address,
          waitTimes,
          images: response.images,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const {navigate} = this.props.navigation;
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
          <Text style={styles.sectionTitle}>{this.state.name}</Text>
          <Text>{this.state.address}</Text>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.center}
            contentInsetAdjustmentBehavior="automatic">
            {this.state.images.map(image => {
              return <Image style={styles.image} source={{uri: image}} />;
            })}
          </ScrollView>
          <ScrollView
            style={styles.scrollView}
            contentInsetAdjustmentBehavior="automatic">
            <Table style={styles.container}>
              <Row
                data={['Time', 'Date Submitted', 'Submitted by']}
                style={styles.head}
                textStyle={styles.text}
              />
              <Rows
                data={this.state.waitTimes}
                style={styles.row}
                textStyle={styles.text}
              />
            </Table>
          </ScrollView>
          <Button
            title="Submit Wait Time"
            onPress={() => {
              AsyncStorage.setItem('id', this.state.id);
              AsyncStorage.setItem('token', this.state.token);
              this.props.navigation.navigate('WaitSubmission', {});
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

Restaurant.defaultProps = {
  id: '5d6ecc7e574d0b16d41b38f0',
};

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
  MenuIcon: {width: 40, height: 40},
});
