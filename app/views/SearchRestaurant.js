import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  Image,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Table, Row, Rows} from 'react-native-table-component';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default class Restaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      restaurants: [],
      loading: false,
    };
  }

  async PageLoadEvent() {
    let token = await AsyncStorage.getItem('token');
    this.setState({token});
  }

  componentDidMount = () => {
    this.PageLoadEvent();
  };

  handleChange = e => {
    this.setState({search: e});
  };

  handleSearch = () => {
    this.setState({loading: true});

    fetch(
      'https://apt-line-picker.appspot.com/mobile/ListAllRestaurant/Search',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token: this.state.token,
          mode: 'no-cors',
          cache: 'no-cache',
        },
        body: JSON.stringify({
          restaurant_tag: this.state.search,
        }),
      },
    )
      .then(response => response.json())
      .then(response => {
        let arr = [];
        console.log(response);
        response.restaurants.forEach(restaurant => {
          let rest = [
            restaurant.name,
            restaurant.address,
            restaurant.wait_times,
            <Image style={styles.image} source={{uri: restaurant.images[0]}} />,
            <Button
              style={styles.button}
              title="GoTo"
              onPress={() => {
                AsyncStorage.setItem('id', restaurant.id);
                AsyncStorage.setItem('token', this.state.token);
                this.props.navigation.navigate('Restaurant', {});
              }}
            />,
          ];
          arr.push(rest);
        });
        this.setState({restaurants: arr, loading: false});
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.MenuIcon}
          onPress={this.props.navigation.toggleDrawer}>
          <Image
            source={require('../StaticContent/IMG/MenuIconIMG.jpeg')}
            style={styles.MenuIcon}
          />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Search Restaurants</Text>
        <TextInput
          placeholder="chinese"
          onChangeText={this.handleChange}
          value={this.state.search}
        />
        <Button title="Search" onPress={this.handleSearch} />
        <ScrollView
          style={styles.scrollView}
          contentInsetAdjustmentBehavior="automatic">
          {this.state.loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Table>
              <Row
                data={['Name', 'Location', 'Time', 'Image', 'GoTo']}
                style={styles.head}
              />
              <Rows
                data={this.state.restaurants}
                style={styles.row}
                textStyle={styles.text}
              />
            </Table>
          )}
        </ScrollView>
      </View>
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
    width: 50,
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
  button: {
    width: 15,
  },
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  row: {height: 50},
  text: {margin: 6, color: 'black'},
  MenuIcon: {width: 40, height: 40},
});
