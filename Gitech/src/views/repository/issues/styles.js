import styled from 'styled-components/native';
import { colors } from "@src/styles";
import {StyleSheet} from "react-native";

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${colors.background};
  padding: 20px 20px;
`;

export const Flex = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Text = styled.Text`
  color: ${colors.text};
`;

export const StatusIcon = styled.View`
  padding-right: 5px;
`;

export const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: '#238636',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.buttonBorder,
    width: 100,
    marginTop: 10,
    marginBottom: 10
  }
});
