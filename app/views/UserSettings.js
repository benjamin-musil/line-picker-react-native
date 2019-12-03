import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import menuIcon from '../StaticContent/IMG/MenuIconIMG.jpeg';
import {NavigationEvents} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

export default class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      userId: '',
      favoriteFood: '',
    };
  }

  async PageLoadEvent() {
    let email = await AsyncStorage.getItem('email');
    let userId = await AsyncStorage.getItem('userid');
    let favoriteFood = await AsyncStorage.getItem('favoriteFood');
    this.setState({email, userId, favoriteFood}, () => {
      console.log(this.state.email);
      console.log(this.state.userId);
    });
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <NavigationEvents onDidFocus={() => this.PageLoadEvent()} />
          <TouchableOpacity
            activeOpacity={0.5}
            style={{borderWidth: 0, borderColor: 'red', width: 40, height: 40}}
            onPress={() => this.props.navigation.toggleDrawer()}>
            <Image source={menuIcon} style={{width: 40, height: 40}} />
          </TouchableOpacity>
          <Table style={styles.container}>
            <Row
              data={['Email', 'User ID', 'Favorite Food']}
              style={styles.head}
              textStyle={styles.text}
            />
            <Row
              data={[
                this.state.email,
                this.state.userId,
                this.state.favoriteFood,
              ]}
              textStyle={styles.text}
              style={styles.head}
            />
          </Table>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
});
