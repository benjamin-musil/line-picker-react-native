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
            markers: [{
                coordinate: {
                    latitude: 30.3678535,
                    longitude: -97.6226369,
                },
                title: 'Subway',
                description: 'Subway by my house, wait time 5 min',
                id: 1
            },
            {
                coordinate: {
                    latitude: 30.3365523,
                    longitude: -97.6540377,
                },
                title: 'Dragonbeard Kitchen',
                description: 'Okay food, 30 min wait',
                id: 2
            }]
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
                console.log(this.state.region.latitude);
                console.log(response);
                let reports = [];
                if (response.wait_times) {
                    response.wait_times.forEach(element => {
                        waitTimes.push([
                            element[0],
                            moment(element[1]).format('M-DD-YYYY HH:MM'),
                            element[2],
                        ]);
                    });
                } else {
                    reports.push([['None'], [''], ['']]);
                }
                this.setState({
                    markers: reports,
                });
            })
            .catch(error => {
                console.log(error);
            });
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
                    {this.state.markers.map((marker: any) => (
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



    // submitInfo = () => {
    //     this.setState({submitting: true});
    //     fetch('https://apt-line-picker.appspot.com/mobile/submit-time', {
    //     method: 'POST',
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //         token: this.state.token,
    //         mode: 'no-cors',
    //         cache: 'no-cache',
    //     },
    //     body: JSON.stringify({
    //     geolocation: this.state.geolocation,
    //     Id: this.state.id,
    //     wait: this.state.wait,
    //     image64: this.state.image64,
    //     }),
    //     })
    //     .then(response => response.json())
    //     .then(response => {
    //         console.log(response);
    //     AsyncStorage.setItem('id', this.state.id);
    //     AsyncStorage.setItem('token', this.state.token);
    //     this.props.navigation.navigate('Restaurant', {});
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     this.setState({error, submitting: false});
    //     });
    // };
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
