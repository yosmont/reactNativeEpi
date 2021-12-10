import React from 'react';
import { Dimensions } from 'react-native';
import LimitedWidthCustomButton from "@src/components/LimitedWidthCustomButton";

const FullWidthCustomButton = (props) => {
    return (
      <LimitedWidthCustomButton
        width={Dimensions.get('window').width}
        Text={props.Text}
        onPress={props.onPress}>
        </LimitedWidthCustomButton>
    );
}

export default FullWidthCustomButton;
