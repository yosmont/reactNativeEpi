import React from 'react';
import {Pressable} from 'react-native';
import {styles, Text} from './styles';

const LimitedWidthCustomButton = (props) => {
    return (
        <Pressable
          style={styles(props.width).button}
          onPress={props.onPress}
        >
            <Text>{props.Text}</Text>
        </Pressable>
    );
}

export default LimitedWidthCustomButton;
