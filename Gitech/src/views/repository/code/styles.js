import styled from "styled-components/native/dist/styled-components.native.esm";
import { colors } from "@src/styles";
import {StyleSheet} from "react-native";

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${colors.background};
  padding: 20px 20px;
`;

export const Card = styled.View`
  background-color: ${colors.card};
  border-width: 1px;
  border-color: #242c35;
  border-radius: 3px;
  padding: 2px;
`;

export const BranchCard = styled.View`
  background-color: ${colors.card};
  border-width: 1px;
  border-color: #242c35;
  border-radius: 3px;
  padding: 10px;
`;

export const FlexRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const PickerWrapper = styled.View`
  border-width: 1px;
  border-radius: 3px;
  border-color: ${colors.buttonBorder};
  background-color: ${colors.button};
  height: 40px;
`;

export const styles = StyleSheet.create({
  picker: {
    flex: 1,
    margin: 5,
    padding: 5,
    minWidth: 100,
    color: colors.text
  }
});
