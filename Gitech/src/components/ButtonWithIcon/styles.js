import styled from 'styled-components/native';
import { colors } from "@src/styles";

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
  color: black;
`;
