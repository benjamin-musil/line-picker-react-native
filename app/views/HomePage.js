import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet } from 'react-native';




const styles = StyleSheet.create({
    ButtonPadding: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
        margin: 20,
        backgroundColor: 'red',
    },
    red: {
        color: 'red',
    },
});

export default class HomePage extends Component {

    render() {
        return (
            <View >
                <View style={styles.ButtonPadding}>
                    <Button
                        title="Login"
                        onPress={() =>
                            this.props.navigation.navigate('Login')
                        } />
             
                </View>
                <View style={styles.ButtonPadding}>
                    <Button
                        title="Add Restaurant"
                        onPress={() =>
                            this.props.navigation.navigate('AddRestaurant')
                        }
                    />
                </View>
                <View style={styles.ButtonPadding}>
                    <Button
                        title="User Settings"
                        onPress={() =>
                            this.props.navigation.navigate('UserSettings')
                        }
                    />
                </View>
                <View style={styles.ButtonPadding}>
                    <Button
                        title="Search Restaurant"
                        onPress={() =>
                            this.props.navigation.navigate('SearchRestaurant')
                        }
                    />
                </View>
                <View style={styles.ButtonPadding}>
                    <Button
                        title="My Submissions"
                        onPress={() =>
                            this.props.navigation.navigate('MySubmission', {
                                token: this.props.navigation.getParam('token', 'NO-ID'),
                                userid: this.props.navigation.getParam('userid', 'NO-UserID'),
                            })

                        }
                    />
                    {/* <Text>{this.props.navigation.getParam('userid','NoUserID')}</Text> */}
                </View>
            </View>
        );
    }
}