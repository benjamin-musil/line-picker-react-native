import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
} from 'react-native';

function RadioButton(props) {
  return (
    <View style={styles.unselected}>
      {props.selected ? <View style={styles.selected} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  unselected: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
});
