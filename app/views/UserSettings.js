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
} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

/*
import RadioButton from '../components/RadioButton';
import {gray} from 'ansi-colors';
import moment from 'moment';
 */

export default class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      user_id: '',
      favorite_food: '',
    };
  }

  render() {
    return (
      <View>
        <Table style={styles.container}>
          <Row
            data={['Email', 'User ID', 'Favorite Food']}
            style={styles.head}
            textStyle={styles.text}
          />
          <Rows data={[this.state.email]} textStyle={styles.text} />
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
  text: {margin: 6},
});
