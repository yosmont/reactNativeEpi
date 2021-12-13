import React, { Component } from 'react';
import { TextInput, StyleSheet, SafeAreaView, Text } from "react-native";
import {styles} from '@src/styles';

const presetStyles = StyleSheet.create({
  safeAreaStyle: {
    padding: 25,
    marginTop: 10,
  },
  textStyle: {
    marginBottom: 10,
    color: 'white'
  }
});


class CustomTextInput extends Component {
  render () {

    let pstyles = (typeof this.props.styles === 'undefined') ? presetStyles : this.props.styles

    return (
      <SafeAreaView style={pstyles.safeAreaStyle}>
        <Text style={pstyles.textStyle}>{this.props.text}</Text>
        <TextInput
          placeholder={this.props.placeholder}
          placeholderTextColor={'white'}
          style={styles.textInput}
          onChangeText={this.props.onValueChange}
        />
      </SafeAreaView>
    );
  }
}

export default CustomTextInput;
