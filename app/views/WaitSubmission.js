import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {NavigationEvents} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import PhotoComponent from '../components/PhotoComponent';
import ButtonComponent from '../components/ButtonComponent';

// Geolocation tutorial:
// https://github.com/react-native-community/react-native-geolocation
// Camera functionality code:
// https://www.uniquesoftwaredev.com/using-the-camera-in-react-native/

export default class WaitSubmission extends React.Component {
  static navigationOptions = {
    title: 'WaitSubmission',
  };

  constructor(props) {
    super(props);
    this.state = {
      uploadSource: null,
      image64: null,
      geolocation: null,
      wait: null,
      Id: null,
      submitting: false,
    };
  }

  async PageLoadEvent() {
    let token = await AsyncStorage.getItem('token');
    let id = await AsyncStorage.getItem('id');
    this.findCoordinates();
    this.setState({token, id});
  }
  render() {
    return (

        <View style={styles.container}>
          <NavigationEvents onDidFocus={() => this.PageLoadEvent()} />
          <ScrollView
            style={styles.scrollView}
            contentInsetAdjustmentBehavior="automatic">
            <Text>Input Wait Time in Minutes</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="number-pad"
              onChangeText={waittime => (this.state.wait = waittime)}
            />
            <Button
              title="Submit Wait Time Information"
              disabled={
                !this.state.image64 || !this.state.wait || this.state.submitting
              }
              onPress={this.submitInfo}
            />
            {this.state.submitting ? <ActivityIndicator /> : null}
          </ScrollView>
          <PhotoComponent uri={this.state.uploadSource} />
          <ButtonComponent onPress={this.selectPhotoTapped.bind(this)} />
        </View>

    );
  }

  submitInfo = () => {
    this.setState({submitting: true});
    fetch('https://apt-line-picker.appspot.com/mobile/submit-time', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: this.state.token,
        mode: 'no-cors',
        cache: 'no-cache',
      },
      body: JSON.stringify({
        geolocation: this.state.geolocation,
        Id: this.state.id,
        wait: this.state.wait,
        image64: this.state.image64,
      }),
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        AsyncStorage.setItem('id', this.state.id);
        AsyncStorage.setItem('token', this.state.token);
        this.props.navigation.navigate('Restaurant', {});
      })
      .catch(error => {
        console.log(error);
        this.setState({error, submitting: false});
      });
  };

  findCoordinates = () => {
    Geolocation.getCurrentPosition(
      position => {
        const geolocation =
          position.coords.latitude + ',' + position.coords.longitude;
        this.setState({geolocation: geolocation});
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000}, // maximumAge: 1000, might need for iOS
    );
  };

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 200,
      maxHeight: 200,
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let source = {uri: response.uri};
        this.setState({
          uploadSource: source,
          image64: response.data,
        });
      }
    });
  }

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      this.setState({image64: data});
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  scrollView: {
    marginHorizontal: 20,
    maxHeight: 250,
  },
});
