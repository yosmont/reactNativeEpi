import styled from 'styled-components/native';
import { colors } from "@src/styles";

export const Pressable = styled.Pressable`
  flex: 0;
  background-color: #21262d;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 30px;
  border-width: 1px;
  border-radius: 10px;
  border-color: #242c35;
  margin: 0 10px 10px 10px;
  padding: 20px;
  color: ${colors.text};
`;

export const Text = styled.Text`
  color: ${colors.text};
`;
