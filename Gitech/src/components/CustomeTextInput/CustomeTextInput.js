import React from 'react';
import { Text, TextInput, SafeAreaView } from "react-native";

class CustomeTextInput extends React.Component {
  render () {
    return (
      <SafeAreaView>
        <Text>this is a test * 2</Text>
        <TextInput></TextInput>
      </SafeAreaView>
    );
  }
}

export default CustomeTextInput;