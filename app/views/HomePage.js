import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet ,AsyncStorage, Image,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { NavigationEvents } from 'react-navigation';
 



export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CheckTest: '',
        };
    } 
    
    static navigationOptions = {
        drawerLabel: 'Home',
      };
    render() {
        return (
            <View >
                <TouchableOpacity  activeOpacity={.5}  style={{borderWidth:0, borderColor:'red',width:40,height:40}}  onPress={
                          this.props.navigation.toggleDrawer
                    } >
                  <Image  source={require('../StaticContent/IMG/MenuIconIMG.jpeg')} style={{width:40,height:40}}                
                 />
                 </TouchableOpacity>
                     
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
                            this.props.navigation.navigate('MySubmission', {})

                        }
                    />
                      {/* <Icon name="md-menu" size={50} style={{width:10}} /> */}
                    
                </View>
            </View>
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
    red: {
        color: 'red',
    },
});