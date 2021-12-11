import {StyleSheet} from "react-native";
import { colors } from "@src/styles";
import styled from "styled-components/native/dist/styled-components.native.esm";

export const FlexRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Text = styled.Text`
  color: ${colors.text};
`;

export const TextLink = styled.Text`
  color: ${colors.textLink};
`;

export const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.background,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.buttonBorder,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
