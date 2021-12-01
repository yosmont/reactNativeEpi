import React from 'react';
import { Text, View, StyleSheet, Image, Dimensions, Pressable } from 'react-native';

const styles = StyleSheet.create({
  box: {
    flex: 0,
    backgroundColor: '#808080',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    borderRadius: 10,
    margin: 10,
    padding: 20
  }
});

const FullWidthCustomButton = (props) => {
    return (
        <Pressable onPress={props.onPress} style={styles.box}>
            <Text>{props.Text}</Text>
        </Pressable>
    );
}

export default FullWidthCustomButton;