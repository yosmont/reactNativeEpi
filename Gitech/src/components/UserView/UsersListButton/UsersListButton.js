import React from 'react';
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import FullWidthCustomButton from "../../FullWidthCustomButton/FullWidthCustomButton";


const UsersListButton = (props) => {
    var buttonText = ((props.userType == "") ? "" : props.userType + " ") + ((typeof props.userNb === 'undefined') ? "NaN " : props.userNb + " ") + "users"
    return (
        <FullWidthCustomButton onPress={() => alert('User List Button pressed')} Text={buttonText} />
    );
}

export default UsersListButton;