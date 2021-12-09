import React, { useState } from 'react';
import { Text, StyleSheet, SafeAreaView, Switch } from 'react-native';

const styles = StyleSheet.create({
    customSwitchStyle: {
        alignItems: 'flex-end'
    },
    safeAreaStyle: {
        paddingBottom: 10,
        marginTop: 25,
        flexDirection: 'row',
        width: 300,
        height: 30
    },
    textStyle: {
        alignItems: 'flex-start',
        color: '#FFF'
    }
});

const CustomSwitchInput = (props) => {
    let startingValue = false;
    if (props.value == "true") {
        startingValue = true
    }
    const [isEnabled, setIsEnabled] = useState(startingValue);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        props.onValueChange(!isEnabled);
    }
    return (
        <SafeAreaView style={styles.safeAreaStyle}>
            <Switch onValueChange={toggleSwitch} style={styles.customSwitchStyle} value={isEnabled}></Switch>
            <Text style={styles.textStyle}> {props.text}</Text>
        </SafeAreaView>
    );
}

export default CustomSwitchInput;