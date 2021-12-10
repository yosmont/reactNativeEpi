import React from 'react';
import {StatusBar} from "expo-status-bar";
import { Wrapper, Card, LargeText } from "./styles";
import CustomTextInput from "@components/CustomTextInput";
import LimitedWidthCustomButton from "@components/LimitedWidthCustomButton";
import {GITHUB} from "react-native-dotenv";

const { Octokit } = require("@octokit/rest");

const Login = (props) => {
    const [auth, setAuth] = React.useState("");

    return (
        <Wrapper>
          <Card>
            <LargeText>GitHub Login</LargeText>

            <CustomTextInput
              text='Personal access token'
              placeholder='token'
              onValueChange={ setAuth }/>

            <StatusBar style="auto" />

            <LimitedWidthCustomButton
              onPress={() => getAuth(props.navigation, auth)}
              Text="Your profile"
              width={300} />
          </Card>
          </Wrapper>
    )
};

const getAuth = (navigation, auth) => {
  const octokit = new Octokit({
    auth: auth ? auth : GITHUB
  });
  octokit.rest.users.getAuthenticated().then((value) => {
    navigation.navigate('UserView', { navigation: navigation, octokit: octokit, user: value.data ? value.data : undefined });
  });
}

export default Login;
