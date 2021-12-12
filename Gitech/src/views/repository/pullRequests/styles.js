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

export const centeredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`;

export const ModalCard = styled.View`
  align-self: center;
  background-color: ${colors.card};
  border-width: 1px;
  border-color: #242c35;
  border-radius: 3px;
  padding: 2px;
  margin: 20px;
  width: 300px;
`;

export const PickerWrapper = styled.View`
  border-width: 1px;
  border-radius: 3px;
  border-color: ${colors.buttonBorder};
  background-color: ${colors.button};
  height: 40px;
  margin-bottom: 10px;
  margin-top: 5px;
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
  button: {
    alignItems: "center",
    backgroundColor: colors.button,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.buttonBorder,
    width: 100,
    marginTop: 10,
    marginBottom: 10
  },
  greenButton: {
    alignItems: "center",
    backgroundColor: '#238636',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.buttonBorder,
    width: 150,
    marginTop: 10,
    marginBottom: 10
  },
  textInput: {
    backgroundColor: 'black',
    borderRadius: 6,
    lineHeight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 10,
    color: 'white',
    width: 300
  },
  picker: {
    flex: 0.9,
    padding: 5,
    minWidth: 150,
    color: colors.text
  }
});

export const stylesActive = (active) => StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: active ? '#238636' : '#1d5a2d',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#238636',
    width: 150,
    marginTop: 10
  }
});
