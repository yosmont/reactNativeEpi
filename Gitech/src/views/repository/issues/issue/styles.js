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

export const Card = styled.View`
  background-color: ${colors.background};
  border-width: 1px;
  border-color: #242c35;
  border-radius: 3px;
  padding: 2px;
  margin: 6px 0 6px 0;
`;

export const CardHeader = styled.View`
  background-color: ${colors.card};
  border-width: 1px;
  border-color: #242c35;
  border-radius: 3px;
  padding: 5px;
  margin: 1px 1px 5px 1px;
  flex-direction: row;
`;

export const NewComment = styled.View`
  background-color: ${colors.card};
  border-width: 1px;
  border-color: #242c35;
  border-radius: 3px;
  padding: 10px;
  margin-top: 20px;
  min-height: 50px;
`;

export const Flex = styled.View`
  flex-direction: row;
`;

export const Padding = styled.View`
  padding: 5px;
`;

export const WhiteText = styled.Text`
  color: ${colors.text};
`;

export const styles = StyleSheet.create({
  close: {
    alignItems: "center",
    backgroundColor: colors.button,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.buttonBorder,
    width: 120,
    marginTop: 10,
    marginLeft: 10,
    flexDirection: 'row'
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
    width: 100,
    marginTop: 10
  },
  text: {
    color: active ? colors.text : '#85a489'
  },
  textInput: {
    backgroundColor: 'black',
    borderRadius: 6,
    lineHeight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 12,
    paddingRight: 12,
    height: 80,
    color: 'white'
  }
});

export const stylesStatus = (open) => StyleSheet.create({
  status: {
    alignItems: "center",
    backgroundColor: open ? '#238636' : '#8957e5',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.buttonBorder,
    width: 100,
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row'
  }
});
