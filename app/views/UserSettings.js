import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  TextInput,
  Image,
  Picker,
  TouchableOpacity,
} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {NavigationEvents} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

export default class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      userId: '',
      favoriteFood: '',
    };
  }

  async PageLoadEvent() {
    let email = await AsyncStorage.getItem('email');
    let userId = await AsyncStorage.getItem('userid');
    let favoriteFood = await AsyncStorage.getItem('favoriteFood');
    this.setState({email, userId, favoriteFood}, () => {
      console.log(this.state.email);
      console.log(this.state.userId);
    });
  }

  render() {
    return (
      <View>
        <NavigationEvents onDidFocus={() => this.PageLoadEvent()} />
        <TouchableOpacity
          activeOpacity={0.5}
          style={{borderWidth: 0, borderColor: 'red', width: 40, height: 40}}
          onPress={() => this.props.navigation.toggleDrawer()}>
          <Image
            source={require('../StaticContent/IMG/MenuIconIMG.jpeg')}
            style={{width: 40, height: 40}}
          />
        </TouchableOpacity>
        <Table style={styles.container}>
          <Row
            data={['Email', 'User ID', 'Favorite Food']}
            style={styles.head}
            textStyle={styles.text}
          />
          <Row
            data={[
              this.state.email,
              this.state.userId,
              this.state.favoriteFood,
            ]}
            textStyle={styles.text}
            style={styles.head}
          />
        </Table>
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
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  row: {flex: 1, flexDirection: 'row', height: 25, margin: 0},
  text: {margin: 6},
});
