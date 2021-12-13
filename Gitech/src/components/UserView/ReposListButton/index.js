import React, { useEffect } from 'react';
import FullWidthCustomButton from "@components/FullWidthCustomButton";

function GoToReposList(navigation, octokit, type, username) {
    if (!username)
        navigation.navigate('ReposList', { navigation: navigation, octokit: octokit, type: type });
    else
        navigation.navigate('ReposList', { navigation: navigation, octokit: octokit, type: type, username: username });
}

const ReposListButton = (props) => {
    var buttonText = ((props.reposType === "") ? "" : props.reposType + " ") + ((typeof props.reposNb === 'undefined') ? "NaN " : props.reposNb + " ") + "repositories"
    var [listType, setListType] = React.useState("");
    useEffect(() => {
        if (!props.username) {
            switch (props.reposType) {
                case "":
                    setListType("MyRepos");
                    break;
                case "Star":
                    setListType("MyStar");
                    break;
                case "Watch":
                    setListType("MyWatch");
                    break;
            }
        } else {
            switch (props.reposType) {
                case "":
                    setListType("Repos");
                    break;
                case "Star":
                    setListType("Star");
                    break;
                case "Watch":
                    setListType("Watch");
                    break;
            }
        }
    }, [])
    return (
        <FullWidthCustomButton onPress={() => GoToReposList(props.navigation, props.octokit, listType, props.username)} /*onPress={() => props.navigation.push('Repository', { navigation: props.navigation, octokit: props.octokit, user: props.user })}*/ Text={buttonText} />
    );
}

export default ReposListButton;
