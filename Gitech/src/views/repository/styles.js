import styled from 'styled-components/native';
import { colors } from "@src/styles";
import {StyleSheet} from "react-native";

export const LargeText = styled.Text`
  font-size: 30px;
  color: ${colors.text};
`;

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${colors.background};
  padding: 20px 20px;
`;

export const RepoWrapper = styled.View`
  flex: 1;
`;

export const RepoInfo = styled.View`
  height: 50px;
`;

export const Text = styled.Text`
  color: ${colors.text};
`;

export const RepoHeader = styled.View`
  flex-direction: row;
  height: 75px;
`;

export const Flex = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Image = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  align-items: center;
  margin-right: 20px;
`;

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.buttonBorder,
    padding: 35,
    alignItems: "center"
  },
  deleteButton: {
    alignItems: "center",
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.buttonBorder,
    width: 100,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 5
  },
  button: {
    alignItems: "center",
    backgroundColor: colors.button,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.buttonBorder,
    width: 100,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5
  }
});
