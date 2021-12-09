import styled from 'styled-components/native';
import { colors } from "@src/styles";

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${colors.background};
  padding: 20px 20px;
`;

export const RepoWrapper = styled.View`
  flex: 1;
`;

export const RepoHeader = styled.View`
  height: 50px;
`;

export const Text = styled.Text`
  color: ${colors.text};
`;

export const Flex = styled.View`
  flex-direction: row;
  height: 75px;
`;

export const Image = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  align-items: center;
  margin-right: 20px;
`;
