import React from 'react';
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import FullWidthCustomButton from "../../FullWidthCustomButton/FullWidthCustomButton";

const CreateReposButton = (props) => {
    return (
        <FullWidthCustomButton onPress={() => alert('Create Button pressed')} Text="Create a new repos" />
    );
}

export default CreateReposButton;