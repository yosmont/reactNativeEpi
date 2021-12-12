import styled from 'styled-components/native';
import { colors } from "@src/styles";

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
