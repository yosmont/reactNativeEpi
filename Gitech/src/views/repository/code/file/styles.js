import styled from "styled-components/native/dist/styled-components.native.esm";
import { colors } from "@src/styles";

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
  padding: 10px;
`;

export const Text = styled.Text`
  color: ${colors.text};
`;
