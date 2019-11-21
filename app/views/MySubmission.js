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

export default class MySubmission extends Component {
    render() {
        return (
            <View ><Text>This is my Submission</Text></View>);
    }
}