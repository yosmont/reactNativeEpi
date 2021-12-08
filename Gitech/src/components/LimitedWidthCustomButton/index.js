import React from 'react';
import { Text, Pressable } from './styles'

const LimitedWidthCustomButton = (props) => {
    return (
        <Pressable onPress={props.onPress}>
            <Text>{props.Text}</Text>
        </Pressable>
    );
}

export default LimitedWidthCustomButton;
