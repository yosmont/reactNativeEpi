import styled from 'styled-components/native';
import { colors } from "@src/styles";

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${colors.background};
  padding: 10px;
`;

export const UserWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
`;

export const Image = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 20px;
`;

export const Text = styled.Text`
  color: ${colors.text};
  margin-bottom: 20px;
`;

export const LargeText = styled.Text`
  font-size: 30px;
  color: ${colors.text};
`;

export const Card = styled.View`
  background-color: ${colors.card};
  border-width: 1px;
  border-color: #242c35;
  border-radius: 25px;
  padding: 20px;
`;
