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
import MapView,  {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import {tsThisType} from '@babel/types';

// Maps documentation
// https://github.com/react-native-community/react-native-maps
// Maps current location
// https://codeburst.io/react-native-google-map-with-react-native-maps-572e3d3eee14

export default class RecentReportsMap extends React.Component {
    // Title of view for navigation
    static navigationOptions = {
        title: 'Recent Reports',
    };

    constructor(props) {
        super(props);
        this.state = {
            geolocation: null,
            Id: null,
            submitting: false,
            region: {
                latitude: 6,
                longitude: 6,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            markers: []
        };
    }

    async PageLoadEvent() {
        let token = await AsyncStorage.getItem('token');
        let id = await AsyncStorage.getItem('id');
        this.setState({token, id});
    }

    componentDidMount() {
        Geolocation.getCurrentPosition(
            position => {
            this.setState({
                region: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.06,
                    longitudeDelta: 0.07,
                }
            });
        },
        (error) => console.log(error.message),
            { enableHighAccuracy: true, timeout: 20000},
        );
        this.watchID = Geolocation.watchPosition(
                position => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0462,
                        longitudeDelta: 0.0261,
                    }
                });
            }
        );
        this.getData();
    }  componentWillUnmount() {
        Geolocation.clearWatch(this.watchID);
    }

    getData = () => {
        token = this.state.token;
        id = this.state.id;
        fetch('https://apt-line-picker.appspot.com/mobile/recent-reports', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                token: token,
                mode: 'no-cors',
                cache: 'no-cache',
            },
            body: JSON.stringify({
                lat1: this.state.region.latitude,
                long1: this.state.region.longitude,
            }),
        })
            .then(response => response.json())
            .then(response => {
                let reports = [];
                let iterator = 1;
                response.forEach(element => {
                    var latlng = element.geolocation;
                    reports.push({
                        'coordinate': this.latlngToCoordinate(latlng),
                        'title': element.name,
                        'description': element.wait_times + " minute wait time",
                        'id': iterator,
                    });
                    iterator++
                });
                this.setState({
                    markers: reports,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    latlngToCoordinate = (latlng) => {
        var pattern = new RegExp('[.\\d-]+', 'g');
        var matches = latlng.match(pattern);
        var coordinates = {'latitude': Number(matches[0]), 'longitude': Number(matches[1])};
        return coordinates;
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationEvents onDidFocus={() => this.PageLoadEvent()} />
                <MapView
                    provider={ PROVIDER_GOOGLE }
                    style={ styles.map }
                    showsUserLocation={ true }
                    region={this.state.region}
                >
                    {this.state.markers && this.state.markers.map (marker => (
                                <Marker
                            key={marker.id}
                            coordinate={marker.coordinate}
                            title={marker.title}
                            description={marker.description}
                        />
                    ))}
                </MapView>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 600,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
