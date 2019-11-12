import React from 'react';
import {StyleSheet, ScrollView, View, Text, Button, Image} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import {Colors} from 'react-native/Libraries/NewAppScreen';
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
    fetch('http://10.0.2.2:5000/mobile/restaurant/' + this.props.id)
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
        });
        this.setState({
          name: response.name,
          address: response.address,
          waitTimes,
          images: response.images,
        });
      });
  };

  render() {
    return (
      <View>
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
        <Button title="Submit Time" />
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
