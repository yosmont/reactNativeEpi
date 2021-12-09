import styled from 'styled-components/native';
import { colors } from "@src/styles";

export const Pressable = styled.Pressable`
  flex: 0;
  background-color: ${colors.button};
  align-items: flex-start;
  justify-content: center;
  width: 300px;
  height: 30px;
  border-width: 1px;
  border-radius: 10px;
  border-color: ${colors.buttonBorder};
  margin: 10px;
  padding: 20px;
`;

export const Text = styled.Text`
  color: ${colors.text};
`;
