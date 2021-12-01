import React from 'react';
import { Text, StyleSheet, Dimensions, Pressable } from 'react-native';

const styles = StyleSheet.create({
  box: {
    flex: 0,
    backgroundColor: '#808080',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 300,
    height: 30,
    borderRadius: 10,
    margin: 10,
    padding: 20
  }
});

const LimitedWidthCustomButton = (props) => {
    return (
        <Pressable onPress={props.onPress} style={styles.box}>
            <Text>{props.Text}</Text>
        </Pressable>
    );
}

export default LimitedWidthCustomButton;