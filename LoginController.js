import React, {Component, Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import firebase from 'react-native-firebase';
export default class LoginController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pushData: [],
      loggedIn: false,
      email: '',
      user_id: '',
      favorite_food: '',
    };
  }
  componentDidMount() {
    GoogleSignin.configure({
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile

      webClientId:
        '414582689858-4nf9h85b8flr8utia3dhsstm6ke89ajo.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
      accountName: '', // [Android] specifies an account name on the device that should be used
      iosClientId:
        '414582689858-1ja1qop430e629p29edk4hqt62cdm356.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  }

  firebaseGoogleLogin = async () => {
    try {
      // add any configuration settings here:
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({userInfo: userInfo, loggedIn: true});
      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(
        userInfo.idToken,
        userInfo.accessToken,
      );
      // login with credential
      await firebase.auth().signInWithCredential(credential);
      this.setState({userInfo});
      fetch('https://apt-line-picker.appspot.com/mobile/user-settings', {
        method: 'GET',
        headers: {
          token: userInfo.idToken,
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            email: responseJson.user.email,
            user_id: responseJson.user.user_id,
            favorite_food: responseJson.user.favorite_food,
          });

          //Routing to Home page After success
          AsyncStorage.setItem('userid', this.state.user_id);
          AsyncStorage.setItem('token', this.state.userInfo.idToken);

          AsyncStorage.setItem('email', responseJson.user.email);
          AsyncStorage.setItem('favoriteFood', responseJson.user.favorite_food);
          this.props.navigation.navigate('HomePage', {
            token: this.state.userInfo.idToken,
            userid: this.state.user_id,
          });
        });
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('user cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
        console.log('operation (f.e. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('play services not available or outdated');
      } else {
        // some other error happened
        console.log('some other error happened');
      }
    }
  };

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({userInfo: userInfo, loggedIn: true});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('user cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
        console.log('operation (f.e. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('play services not available or outdated');
      } else {
        // some other error happened
        console.log('some other error happened');
      }
    }
  };

  getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({userInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
        console.log('user has not signed in yet');
        this.setState({loggedIn: false});
      } else {
        // some other error
        console.log('some other error happened');
        this.setState({loggedIn: false});
      }
    }
  };

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({user: null, loggedIn: false}); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <GoogleSigninButton
                  style={{width: 192, height: 48}}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={this.firebaseGoogleLogin}
                  disabled={this.state.isSigninInProgress}
                />
              </View>
              <View style={styles.buttonContainer}>
                {!this.state.loggedIn && (
                  <Text>You are currently logged out</Text>
                )}
                {this.state.loggedIn && (
                  <Button
                    onPress={this.signOut}
                    title="Signout"
                    color="#841584"
                  />
                )}
              </View>
              {this.state.loggedIn && (
                <View>
                  <View style={styles.listHeader}>
                    <Text>User Info</Text>
                  </View>
                  <View style={styles.dp}>
                    <Image
                      style={{width: 100, height: 100}}
                      source={{
                        uri:
                          this.state.userInfo &&
                          this.state.userInfo.user &&
                          this.state.userInfo.user.photo,
                      }}
                    />
                  </View>
                  <View style={styles.detailContainer}>
                    <Text style={styles.title}>Name</Text>
                    <Text style={styles.message}>
                      {this.state.userInfo &&
                        this.state.userInfo.user &&
                        this.state.userInfo.user.name}
                    </Text>
                  </View>
                  <View style={styles.detailContainer}>
                    <Text style={styles.title}>Email</Text>
                    <Text style={styles.message}>
                      {this.state.userInfo &&
                        this.state.userInfo.user &&
                        this.state.userInfo.user.email}
                    </Text>
                  </View>
                  <View style={styles.detailContainer}>
                    <Text style={styles.title}>ID</Text>
                    <Text style={styles.message}>
                      {this.state.userInfo &&
                        this.state.userInfo.user &&
                        this.state.userInfo.user.id}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  listHeader: {
    backgroundColor: '#eee',
    color: '#222',
    height: 44,
    padding: 12,
  },
  detailContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  message: {
    fontSize: 14,
    paddingBottom: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  dp: {
    marginTop: 32,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
