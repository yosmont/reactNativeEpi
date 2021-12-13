import styled from 'styled-components/native';

// export const SafeAreaView0 = styled.SafeAreaView`
// `
// export const SafeAreaView1 = styled.SafeAreaView`
// `

export const Wrapper = styled.View`
  flex: 1;
  color: white;
  background-color: rgba(0, 0, 0, 0);
  width: 300px;
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
	flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  flex-shrink: 1;
	`;

  export const Button = styled.Button`
  background-color: black;
  border-width: 1px;
	border-color: grey;
	border-radius: 6px;
	margin: 10px;
	flex-direction: row;
  align-items: center;
  justify-content: space-around;
	max-width: 90%;
  flex-wrap: wrap;
	`;

  export const Text = styled.Text`
	flex-shrink: 1;
  margin-bottom: 5px;
  color: white;
	flex-wrap: wrap;
`
