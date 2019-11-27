import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Picker,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage';
export default class AddRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      values: [],
      categories: [],
      selected: 'select one',
      submitting: false,
      error: '',
    };
  }

  async PageLoadEvent() {
    let token = await AsyncStorage.getItem('token');
    this.setState({token});
  }

  componentDidMount = () => {
    fetch('https://apt-line-picker.appspot.com/mobile/get-all-categories')
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({categories: response});
      });
  };

  _handleNameChange = e => {
    this.setState({name: e});
  };

  _handleAddressChange = e => {
    this.setState({address: e});
  };

  _handleSubmit = () => {
    this.setState({submitting: true});
    fetch('https://apt-line-picker.appspot.com/mobile/submit-restaurant', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: this.state.token,
        mode: 'no-cors',
        cache: 'no-cache',
      },
      body: JSON.stringify({
        Name: this.state.name,
        Address: this.state.address,
        category: this.state.selected,
      }),
    })
      .then(response => response.json())
      .then(response => {
        AsyncStorage.setItem('id', response.id);
        AsyncStorage.setItem('token', this.state.token);
        this.props.navigation.navigate('Restaurant', {});
      })
      .catch(error => {
        this.setState({error, submitting: false});
      });
  };

  render() {
    return (
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
        {this.state.error ? (
          <Text style={styles.sectionTitle}>{this.state.error}</Text>
        ) : null}
        <Text style={styles.sectionTitle}>Add a Restaurant</Text>
        <Text style={styles.inputTitle}>Name of the Restaurant</Text>
        <TextInput
          style={styles.textInput}
          value={this.state.name}
          onChangeText={this._handleNameChange}
          placeholder="New Restaurant"
        />
        <Text style={styles.inputTitle}>Address of the Restaurant</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Restaurant Address"
          value={this.state.address}
          onChangeText={this._handleAddressChange}
        />
        <Text style={styles.pickerTitle}>Type of Restaurant</Text>
        <Picker
          selectedValue={this.state.selected}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({selected: itemValue})
          }>
          <Picker.Item label={'select one'} value={'select one'} />
          {this.state.categories.map(category => {
            return <Picker.Item label={category} value={category} />;
          })}
        </Picker>
        <Button
          title="Submit"
          color="#4CAF50"
          disabled={
            this.state.name === '' ||
            this.state.address === '' ||
            this.state.selected === 'select one' ||
            this.state.submitting
          }
          onPress={this._handleSubmit}
        />
        {this.state.submitting ? <ActivityIndicator /> : null}
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
  MenuIcon: {width: 40, height: 40},
});
