import React from 'react';
import {StatusBar} from "expo-status-bar";
import { Wrapper, Card, LargeText } from "./styles";
import CustomTextInput from "@components/CustomTextInput";
import LimitedWidthCustomButton from "@components/LimitedWidthCustomButton";

const { Octokit } = require("@octokit/rest");

const octokit = new Octokit();

const Login = (props) => {
    const [auth, setAuth] = React.useState("");

    return (
        <Wrapper>
          <Card>
            <LargeText>GitHub Login</LargeText>

            <CustomTextInput text='Personal access tokens' placeholder='tokens' onValueChange={ setAuth }/>

            <StatusBar style="auto" />

            <LimitedWidthCustomButton onPress={() => props.navigation.navigate('UserView', { navigation: props.navigation, octokitAuth: auth })} Text="Your profile" />
          </Card>
          </Wrapper>
    )
};

export default Login;
