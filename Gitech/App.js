import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, Text, TextInput, View } from 'react-native';

// import Cat from './src/components/Cat/Cat'
// import CustomeTextInput from './src/components/CustomeTextInput/CustomeTextInput'

// const { Octokit } = require("@octokit/rest");

class CustomeTextInput extends Component {
  render () {
    const CustomeTextStyle = StyleSheet.create({
      header: {

      },
      TextInput: {
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        width: 300,
        height: 30
      }
    });

    return (
      <SafeAreaView style={{padding: 10}, {marginTop: 25}}>
        <Text style={{marginBottom: 25}}>{this.props.text}</Text>
        <TextInput style={CustomeTextStyle.TextInput} placeholder="tokens"></TextInput>
      </SafeAreaView>
    );
  }
}

export default function App() {
  return (
    <View style={styles.container}>

      <Text style={styles.large_Text} >GitHub Login</Text>

      <CustomeTextInput text='Personal access tokens'/>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  margin_y_25px: {
    marginTop: 25,
    marginBottom: 25
  },

  large_Text: {
    fontSize: 30
  }
});
