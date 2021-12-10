import React, { Component } from 'react';
import {TextInput} from "react-native";
import {SafeAreaView, Text} from "./styles";
import {styles} from '@src/styles';

class CustomTextInput extends Component {
  render () {
    return (
      <SafeAreaView>
        <Text>{this.props.text}</Text>
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
