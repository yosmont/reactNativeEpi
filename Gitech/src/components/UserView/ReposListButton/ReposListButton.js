import React from 'react';
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import FullWidthCustomButton from "../../FullWidthCustomButton/FullWidthCustomButton";

const ReposListButton = (props) => {
    var buttonText = ((props.reposType == "") ? "" : props.reposType + " ") + ((typeof props.reposNb === 'undefined') ? "NaN " : props.reposNb + " ") + "repositories"
    return (
        <FullWidthCustomButton onPress={() => alert('Repos List Button pressed')} Text={buttonText} />
    );
}

export default ReposListButton;