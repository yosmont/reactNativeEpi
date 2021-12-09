import styled from 'styled-components/native';
import { colors } from "@src/styles";

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${colors.background};
  align-items: center;
  justify-content: center;
  color: white;
`;

export const Card = styled.View`
  background-color: ${colors.card};
  border-width: 1px;
  border-color: #242c35;
  border-radius: 25px;
  padding: 20px;
`;

export const LargeText = styled.Text`
  font-size: 30px;
  color: ${colors.text};
`
