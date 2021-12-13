import styled from 'styled-components/native';
  
export const Wrapper = styled.View`
  flex: 1;
  color: white;
  background-color: #010409;
  justify-content: center;
  align-items: center;
`;

export const ScrollCard = styled.ScrollView`
  background-color: #0d1117;
  border-width: 1px;
  border-color: #242c35;
  border-radius: 25px;
  padding: 20px;
  marginVertical: 20px;
  margin-bottom: 10px;
  height: 300px;
`;

export const Card = styled.View`
  background-color: #0d1117;
  border-width: 1px;
  border-color: #242c35;
  border-radius: 25px;
  padding: 20px;
`;

export const LargeText = styled.Text`
  font-size: 20px;
  color: white;
`