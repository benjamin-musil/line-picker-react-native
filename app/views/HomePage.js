import React, {Component} from 'react';
import {
  View,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import menuIcon from '../StaticContent/IMG/MenuIconIMG.jpeg';

export default class HomePage extends Component {
  static navigationOptions = {
    drawerLabel: 'Home',
  };
  render() {
    return (
      <SafeAreaView>
        <View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.MenuIcon}
            onPress={this.props.navigation.toggleDrawer}>
            <Image source={menuIcon} style={styles.MenuIcon} />
          </TouchableOpacity>

          <View style={styles.ButtonPadding}>
            <Button
              title="Login"
              onPress={() => this.props.navigation.navigate('Login')}
            />
          </View>
          <View style={styles.ButtonPadding}>
            <Button
              title="Add Restaurant"
              onPress={() => this.props.navigation.navigate('AddRestaurant')}
            />
          </View>
          <View style={styles.ButtonPadding}>
            <Button
              title="User Settings"
              onPress={() => this.props.navigation.navigate('UserSettings')}
            />
          </View>
          <View style={styles.ButtonPadding}>
            <Button
              title="Search Restaurant"
              onPress={() => this.props.navigation.navigate('SearchRestaurant')}
            />
          </View>
          <View style={styles.ButtonPadding}>
            <Button
              title="My Submissions"
              onPress={() => this.props.navigation.navigate('MySubmission')}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  ButtonPadding: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
    margin: 20,
    backgroundColor: 'red',
  },
  MenuIcon: {width: 40, height: 40},
});
