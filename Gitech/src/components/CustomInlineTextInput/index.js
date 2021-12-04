import React, { useState } from 'react';
import { Text, StyleSheet, SafeAreaView, TextInput } from 'react-native';

const styles = StyleSheet.create({
    customTextInputStyle: {
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginTop: -5
    },
    safeAreaStyle: {
        padding: 10,
        marginTop: 25,
        flexDirection: 'row',
        width: 300,
        height: 30
    },
    textStyle: {
        alignItems: 'flex-start'
    }
});

const CustomInlineTextInput = (props) => {
    let placeholder = (typeof props.placeholder === 'undefined') ? props.text : props.placeholder;
    return (
        <SafeAreaView style={styles.safeAreaStyle}>
            <Text style={styles.textStyle}>{props.text} : </Text>
            <TextInput style={styles.customTextInputStyle} placeholder={placeholder} keyboardAppearance='dark' onChangeText={props.onValueChange}></TextInput>
        </SafeAreaView>
    );
}

export default CustomInlineTextInput;