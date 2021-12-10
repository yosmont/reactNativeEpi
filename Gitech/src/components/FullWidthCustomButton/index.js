import React from 'react';
import { Pressable, Text } from './styles';

const FullWidthCustomButton = (props) => {
    return (
        <Pressable onPress={props.onPress}>
            <Text>{props.Text}</Text>
          {props.icon}
        </Pressable>
    );
}

export default FullWidthCustomButton;
