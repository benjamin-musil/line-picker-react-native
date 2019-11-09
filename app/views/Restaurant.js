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
import RadioButton from '../components/RadioButton';
import {gray} from 'ansi-colors';
import moment from 'moment';

export default class Restaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      waitTimes: [],
      images: [],
    };
  }
  componentDidMount = () => {
    fetch('http://localhost:5000/mobile/restaurant/' + this.props.id)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        let waitTimes = [];
        response.wait_times.forEach(element => {
          waitTimes.push([
            element[0],
            moment(element[1]).format('M-DD-YYYY HH:MM'),
            element[2],
          ]);
          console.log(waitTimes);
        });
        this.setState({
          name: response.name,
          address: response.address,
          waitTimes: waitTimes,
          images: response.images,
        });
      });
  };

  render() {
    return (
      <View>
        <Text style={styles.sectionTitle}>{this.state.name}</Text>
        <Text>{this.state.address}</Text>
        {this.state.images.map(image => {
          return (
            <Image style={{height: 50, width: 50}} source={{uri: image}} />
          );
        })}
        <Table style={styles.container}>
          <Row
            data={['Time', 'Date Submitted', 'Submitted by']}
            style={styles.head}
            textStyle={styles.text}
          />
          <Rows data={[this.state.waitTimes]} textStyle={styles.text} />
        </Table>
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
