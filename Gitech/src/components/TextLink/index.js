import React from 'react';
import { Pressable } from 'react-native';
import { Text } from './styles';

const TextLink = (props) => {
  return (
    <Pressable onPress={props.onPress}>
      <Text>{props.text}</Text>
    </Pressable>
  );
}

export default TextLink;
