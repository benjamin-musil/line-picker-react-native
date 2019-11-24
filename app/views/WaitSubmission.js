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

export default class WaitSubmission extends React.Component {
  // Title of view for navigation
  static navigationOptions = {
    title: 'WaitSubmission'
  };

  // Initiate state for geolocation
  // https://github.com/react-native-community/react-native-geolocation
  state = {
    location: null
  }

  // Function to get coordinates in JSON format
  findCoordinates = () => {
    Geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);

        this.setState({ location });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000} // maximumAge: 1000, might need for iOS
    );
  };

    // Camera code
    constructor(props) {
      super(props)
        this.state = {
            uploadSource: null
      }
    }
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
                    uploadSource: source
                });
                console.log(this.state.uploadSource)
            }
        });
    }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
            style={styles.scrollView}
            contentInsetAdjustmentBehavior="automatic">
              <Text>Camera API Here</Text>
              <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}/>

            <Button
                title="Snag a Pic"
            />
            <Button
                title="Submit"
                onPress={this.findCoordinates}
            />
            <Text>Location: {this.state.location}</Text>
    </ScrollView>
            <PhotoComponent uri={this.state.uploadSource}/>
            <ButtonComponent onPress={this.selectPhotoTapped.bind(this)}/>
      </View>
    );
  }

  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    marginHorizontal: 20,
    maxHeight: 250,
  },
});

// <RNCamera
//   ref={ref => {
//     this.camera = ref;
//   }}
//   style={styles.preview}
//   type={RNCamera.Constants.Type.back}
//   flashMode={RNCamera.Constants.FlashMode.on}
//   androidCameraPermissionOptions={{
//     title: 'Permission to use camera',
//     message: 'We need your permission to use your camera',
//     buttonPositive: 'Ok',
//     buttonNegative: 'Cancel',
//   }}
//   style={{
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   }}
// >
// </RNCamera>
// <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
//   <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
//   <Text style={{ fontSize: 14 }}> SNAP </Text>
//   </TouchableOpacity>
// </View>

// const styles = StyleSheet.create({
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     textAlign: 'center',
//     color: Colors.black,
//   },
//   image: {
//     height: 100,
//     width: 100,
//   },
//   center: {justifyContent: 'center', alignItems: 'center'},
//   textInput: {
//     height: 40,
//   },
//   pickerTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     textAlign: 'center',
//     paddingBottom: 0,
//     paddingTop: 'auto',
//     color: Colors.black,
//     marginBottom: 0,
//   },
//   inputTitle: {
//     fontSize: 18,
//   },
//   scrollView: {
//     marginHorizontal: 20,
//     maxHeight: 250,
//   },
//   container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
//   head: {height: 40, backgroundColor: '#f1f8ff'},
//   row: {height: 28},
//   text: {margin: 6, color: 'black'},
//   preview: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
// });
