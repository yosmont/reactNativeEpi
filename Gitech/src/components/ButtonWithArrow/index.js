import React from 'react';
import {Text, Pressable} from './styles'
import {BsCode} from "react-icons/bs";

const ButtonWithIcon = (props) => {
  return (
      <Pressable onPress={props.onPress}>
        <Text>{props.Text}</Text>
        <BsCode />
      </Pressable>
  );
}

export default ButtonWithIcon;
