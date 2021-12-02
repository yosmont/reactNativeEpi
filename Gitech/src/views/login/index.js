import React from 'react';
import {StatusBar} from "expo-status-bar";
import {LargeText, Wrapper} from "./styles";
import CustomTextInput from "./../../components/CustomTextInput";

const Login = () => (
  <Wrapper>

    <LargeText>GitHub Login</LargeText>

    <CustomTextInput text='Personal access tokens'/>

    <StatusBar style="auto" />
  </Wrapper>
);

export default Login;
