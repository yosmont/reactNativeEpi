import React from 'react';
import FullWidthCustomButton from "@components/FullWidthCustomButton";

const CreateReposButton = (props) => {
    return (
        <FullWidthCustomButton onPress={() => props.navigation.push('CreateRepos', { octokit: props.octokit })} Text="Create a new repos" />
    );
}

export default CreateReposButton;