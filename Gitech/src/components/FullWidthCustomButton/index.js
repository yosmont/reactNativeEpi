import React from 'react';
import LimitedWidthCustomButton from "@src/components/LimitedWidthCustomButton";

const FullWidthCustomButton = (props) => {
    return (
      <LimitedWidthCustomButton
        width={'100%'}
        Text={props.Text}
        onPress={props.onPress}>
        </LimitedWidthCustomButton>
    );
}

export default FullWidthCustomButton;
