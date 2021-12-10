import {StyleSheet} from "react-native";

export const colors = {
  background: '#010409',
  card: '#0d1117',
  text: 'rgba(255, 255, 255, 0.87)',
  button: '#21262d',
  buttonBorder: '#242c35',
  textLink: '#1E90FFFF'
}

export const styles = StyleSheet.create({
  baseButton: {
    alignItems: "center",
    backgroundColor: colors.button,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.buttonBorder
  },
  textInput: {
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 6,
    lineHeight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 12,
    paddingRight: 12
  }
});
