import styled from 'styled-components/native';
import { colors } from "@src/styles";
import {StyleSheet} from "react-native";

export const Text = styled.Text`
  color: ${colors.text};
`;

export const styles = (width) => StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.button,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.buttonBorder,
    width: width,
    marginTop: 10,
    marginBottom: 10
  }
});
