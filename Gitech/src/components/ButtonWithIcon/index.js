import React from 'react';
import {Pressable} from "react-native";
import {styles, Text} from "./styles";

const ButtonWithIcon = (props) => {
    return (
      <Pressable
        style={styles.buttonWithIcon}
        onPress={props.onPress}
      >
        <Text>{props.Text}</Text>
        {props.children}
      </Pressable>
    );
}

export default ButtonWithIcon;
