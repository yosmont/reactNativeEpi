import styled from 'styled-components/native';

// export const SafeAreaView0 = styled.SafeAreaView`
// `
// export const SafeAreaView1 = styled.SafeAreaView`
// `

export const Wrapper = styled.View`
	margin-top: 25px;
  flex: 1;
  color: white;
  background-color: #010409;
  justify-content: flex-start;
`;

export const Image = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  align-items: center;
  margin: 10px;
`;

export const Pressable = styled.Pressable`
	background-color: black;
	border-width: 1px;
	border-color: grey;
	border-radius: 6px;
	margin: 10px;
	flexDirection: row;
  align-items: center;
  justify-content: center;
	maxWidth: 90%;
	`;

export const Text = styled.Text`
	flexShrink: 1
  margin-bottom: 10px;
  color: white;
	flex: 1;
	flexWrap: wrap;
`