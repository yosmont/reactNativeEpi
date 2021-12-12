import React, { useEffect } from 'react';
import { ActivityIndicator } from "react-native";
import { Wrapper, UserWrapper, Image, Text, LargeText, Card, ScrollCard } from './styles';

import LimitedWidthCustomButton from "@components/LimitedWidthCustomButton";

function GetNbOfPage(linkStr) {

    if (linkStr == null) {
        return (0);
    }
    return parseInt(linkStr.slice(linkStr.lastIndexOf("&page=") + 6, -13));
}

const ReposList = (props) => {
    const octokit = props.route.params.octokit;
    const [recylerViewUpdate, setRecylerViewUpdate] = React.useState(undefined);
    useEffect(() => {
    }, [])
    return (
        <Wrapper>
            <ScrollCard>
                {
                    (recylerViewUpdate !== undefined) ?
                        recylerViewUpdate
                        :
                        <ActivityIndicator size='large' color='#457cb7' />
                }
            </ScrollCard>
        </Wrapper>
    );
}

export default ReposList;