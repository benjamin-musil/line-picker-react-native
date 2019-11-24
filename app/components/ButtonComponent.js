import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ButtonComponent = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
        <View style={styles.buttonBorder}>
            <Icon
                name='plus'
                size={35}
                color='white'/>
            </View>
    </TouchableOpacity>
)
export default ButtonComponent;

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonBorder: {
        borderColor: 'grey',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 35,
        width: 70,
        height: 70,
        backgroundColor: 'grey'
    },
})