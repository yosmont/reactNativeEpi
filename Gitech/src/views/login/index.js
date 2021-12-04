import React from 'react';
import {StatusBar} from "expo-status-bar";
import { LargeText, Wrapper } from "./styles";
import CustomTextInput from "@components/CustomTextInput";
import LimitedWidthCustomButton from "@components/LimitedWidthCustomButton";

const { Octokit } = require("@octokit/rest");

const octokit = new Octokit();

function updateOctokitAuth(value) {
    octokit.auth = value;
    console.log(value);
}

const Login = (props) => (
  <Wrapper>

    <LargeText>GitHub Login</LargeText>

    <CustomTextInput text='Personal access tokens' placeholder='tokens' onValueChange={ updateOctokitAuth }/>

    <StatusBar style="auto" />

    <LimitedWidthCustomButton onPress={() => props.navigation.navigate('UserView', { username: "", loginProfile: "true", octokitAuth: octokit.auth })} Text="Your profile" />
  </Wrapper>
);

export default Login;
