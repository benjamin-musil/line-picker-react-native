import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    Button,
    Image,
    Alert,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import MapView from 'react-native-maps';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import {tsThisType} from '@babel/types';

// Maps documentation
// https://github.com/react-native-community/react-native-maps

export default class RecentReportsMap extends React.Component {
    // Title of view for navigation
    static navigationOptions = {
        title: 'Recent Reports',
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
                <MapView
                    initialRegion={{
                        latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                    }}
                />
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
            this.setState({geolocation});
        },
            error => Alert.alert(error.message),
                {enableHighAccuracy: true, timeout: 20000}, // maximumAge: 1000, might need for iOS
        );
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
