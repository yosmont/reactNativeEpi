import React, { useEffect } from 'react';
import { ActivityIndicator } from "react-native";
import { Wrapper, UserWrapper, Image, Text, LargeText, Card } from './styles';

function GetNbOfPage(linkStr) {

    if (linkStr == null) {
        return (0);
    }
    return parseInt(linkStr.slice(linkStr.lastIndexOf("&page=") + 6, -13));
}

const Home = (props) => {
    <Wrapper>
        <Card>
            <LargeText>HOME</LargeText>
        </Card>
    </Wrapper>
}

export default Home;