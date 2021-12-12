import React, { useEffect } from 'react';
import { ActivityIndicator } from "react-native";
import { Wrapper, UserWrapper, Image, Text, LargeText, Card } from './styles';

import LimitedWidthCustomButton from "@components/LimitedWidthCustomButton";

function GetNbOfPage(linkStr) {

    if (linkStr == null) {
        return (0);
    }
    return parseInt(linkStr.slice(linkStr.lastIndexOf("&page=") + 6, -13));
}

function GoToMyUserView(navigation, octokit) {
    octokit.rest.users.getAuthenticated().then((value) => {
        navigation.navigate('UserView', { navigation: navigation, octokit: octokit, user: value.data ? value.data : undefined });
    });
}

function ToSet(navigation, octokit) {
    alert("not implemented");
}

const Home = (props) => {
    const octokit = props.route.params.octokit;
    return (
        <Wrapper>
            <Card>
                <LimitedWidthCustomButton onPress={() => GoToMyUserView(props.navigation, octokit)} Text="My profile" width={300} />
                <LimitedWidthCustomButton onPress={() => ToSet(props.navigation, octokit)} Text="My repository" width={300} />
                <LimitedWidthCustomButton onPress={() => ToSet(props.navigation, octokit)} Text="My issues" width={300} />
                <LimitedWidthCustomButton onPress={() => ToSet(props.navigation, octokit)} Text="My pull request" width={300} />
                <LimitedWidthCustomButton onPress={() => ToSet(props.navigation, octokit)} Text="My favorites" width={300} />
            </Card>
        </Wrapper>
    );
}

export default Home;