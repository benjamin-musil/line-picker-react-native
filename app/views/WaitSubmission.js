import React,  { Component } from 'react';
import {StyleSheet, ScrollView, View, Text, TextInput, Button, Image, Alert, TouchableOpacity} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import moment from 'moment';
import Geolocation from '@react-native-community/geolocation';
import ImagePicker from "react-native-image-picker";
import { RNCamera } from 'react-native-camera';
import PhotoComponent from '../components/PhotoComponent'
import ButtonComponent from '../components/ButtonComponent'

// Geolocation tutorial:
// https://github.com/react-native-community/react-native-geolocation
// Camera functionality code:
// https://www.uniquesoftwaredev.com/using-the-camera-in-react-native/

export default class WaitSubmission extends React.Component {
  // Title of view for navigation
  static navigationOptions = {
    title: 'WaitSubmission'
  };

  constructor(props) {
    super(props)
    this.state = {
        uploadSource: null,
        image64: null,
        geolocation: null,
        wait: null,
        Id: null, //should be rest ID going here, how to pull that?
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
            style={styles.scrollView}
            contentInsetAdjustmentBehavior="automatic">
              <Text>Input Wait Time in Minutes</Text>
              <TextInput
                style={styles.textInput}
                keyboardType='number-pad'
                onChangeText={(waittime) => this.state.wait = waittime}
              />
            <Button
                title="Submit Wait Time Information"
                onPress={this.findCoordinates}
            />
    </ScrollView>
            <PhotoComponent uri={this.state.uploadSource}/>
            <ButtonComponent onPress={this.selectPhotoTapped.bind(this)}/>
      </View>
    );
  }

    findCoordinates = () => {
        Geolocation.getCurrentPosition(
            position => {
            const geolocation = position.coords.latitude + ',' +
                position.coords.longitude
            this.setState({ geolocation });
            },
            error => Alert.alert(error.message),
                { enableHighAccuracy: true, timeout: 20000} // maximumAge: 1000, might need for iOS
        );
    };

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 200,
            maxHeight: 200,
            storageOptions: {
                skipBackup: true
            }
        };
        ImagePicker.showImagePicker(options, response => {
                console.log("Response = ", response);
            if (response.didCancel) {
                console.log("User cancelled photo picker");
            } else if (response.error) {
                console.log("ImagePicker Error: ", response.error);
            } else {
                let source = { uri: response.uri };
                this.setState({
                    uploadSource: source,
                    image64: response.data
                });
            }
        });
    }

  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
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
