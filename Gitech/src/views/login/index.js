import React from 'react';
import {StatusBar} from "expo-status-bar";
import { Wrapper, Card, LargeText } from "./styles";
import CustomTextInput from "@components/CustomTextInput";
import LimitedWidthCustomButton from "@components/LimitedWidthCustomButton";
import {GITHUB} from "react-native-dotenv";

const Login = (props) => {
    const [auth, setAuth] = React.useState("");
    console.log(process.env.GITHUB);

    return (
        <Wrapper>
          <Card>
            <LargeText>GitHub Login</LargeText>

            <CustomTextInput text='Personal access tokens' placeholder='tokens' onValueChange={ setAuth }/>

            <StatusBar style="auto" />

            <LimitedWidthCustomButton onPress={() => props.navigation.navigate('UserView', { navigation: props.navigation, octokitAuth: auth !== "" ? auth : GITHUB })} Text="Your profile" />
          </Card>
          </Wrapper>
    )
};

export default Login;
