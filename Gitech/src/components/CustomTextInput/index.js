import React, { Component } from 'react';
import {SafeAreaView, TextInput, Text} from "./styles";

class CustomTextInput extends Component {
  render () {
    return (
      <SafeAreaView>
        <Text>{this.props.text}</Text>
        <TextInput placeholder="tokens" />
      </SafeAreaView>
    );
  }
}

export default CustomTextInput;
