import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  TextInput,
  Picker,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import RadioButton from '../components/RadioButton';
import {gray} from 'ansi-colors';

export default class AddRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      values: [],
      categories: [],
      selected: 'select one',
    };
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
    this.setState({name: e.target.value});
  };

  _handleAddressChange = e => {
    this.setState({address: e.target.value});
  };

  render() {
    return (
      <View>
        <Text style={styles.sectionTitle}>Add a Restaurant</Text>
        <Text style={styles.inputTitle}>Name of the Restaurant</Text>
        <TextInput
          style={styles.textInput}
          value={this.state.name}
          onChange={this._handleNameChange}
          placeholder="New Restaurant"
        />
        <Text style={styles.inputTitle}>Address of the Restaurant</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Restaurant Address"
          value={this.state.address}
          onChange={this._handleAddressChange}
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
            this.state.selected === 'select one'
          }
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
});
