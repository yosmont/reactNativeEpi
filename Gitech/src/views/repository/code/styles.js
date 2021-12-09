import styled from "styled-components/native/dist/styled-components.native.esm";
import { colors } from "@src/styles";

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${colors.background};
  padding: 20px 20px;
`;

export const CodeWrapper = styled.View`
  flex: 1;
`;

export const Card = styled.View`
  background-color: ${colors.card};
  border-width: 1px;
  border-color: #242c35;
  border-radius: 15px;
  padding: 5px;
`;

export const Flex = styled.View`
  flex-direction: row;
  height: fit-content;
`;
