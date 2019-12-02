import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

class PhotoComponent extends Component {
    renderDefault() {
        return (
            <View style={styles.container}>
            <Image
                resizeMode='contain'
                style={styles.containerSize}
                source={require('../resources/background.png')}
            />
            <Image
                resizeMode='contain'
                style={styles.imageSize}
                source={require('../resources/camera.png')}
            />
        </View>
        )
    }

    renderImage() {
        return (
            <View style={styles.container}>
                <Image
                    resizeMode='contain'
                    style={styles.chosenImage}
                    source={this.props.uri}/>
            </View>
        )
    }

    render() {
        const displayImage = this.props.uri ? this.renderImage() : this.renderDefault()
        return (
            <View style={styles.container}>
                {displayImage}
            </View>
        )
    }
}
export default PhotoComponent;

const width = Dimensions.get('window').width;
const largeContainerSize = width / 2;
const largeImageSize = width / 4;
const styles = StyleSheet.create({
    container: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    containerSize: {
        width: largeContainerSize,
        height: largeContainerSize,
        alignItems: 'center',
        justifyContent: 'center',
        tintColor: 'grey'
    },
    imageSize: {
        width: largeImageSize,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
    },
    chosenImage: {
        width: width / 1.25,
        height: width / 1.25,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
    },
})