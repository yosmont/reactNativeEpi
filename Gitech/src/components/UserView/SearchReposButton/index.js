import React from 'react';
import FullWidthCustomButton from "@components/FullWidthCustomButton";

const SearchReposButton = (props) => {
    return (
        <FullWidthCustomButton onPress={() => props.navigation.navigate('SearchRepo', { octokit: props.octokit })} Text="Search a repos" />
    );
}

export default SearchReposButton;