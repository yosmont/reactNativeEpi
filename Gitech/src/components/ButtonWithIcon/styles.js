import styled from 'styled-components/native';
import { colors } from "@src/styles";
import {StyleSheet} from "react-native";

export const Pressable = styled.Pressable`
  flex: 0;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  border-width: 1px;
  border-radius: 10px;
  border-color: ${colors.buttonBorder};
  margin-right: 10px;
  padding: 20px;
  color: ${colors.text};
`;

export const Text = styled.Text`
  color: ${colors.text};
  flex-shrink: 1;
`;

export const styles = StyleSheet.create({
  buttonWithIcon: {
    alignItems: "center",
    backgroundColor: colors.button,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.buttonBorder,
    marginTop: 10,
    marginBottom: 10
  }
});
