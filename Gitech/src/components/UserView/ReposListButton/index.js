import React from 'react';
import FullWidthCustomButton from "@components/FullWidthCustomButton";

const ReposListButton = (props) => {
    var buttonText = ((props.reposType === "") ? "" : props.reposType + " ") + ((typeof props.reposNb === 'undefined') ? "NaN " : props.reposNb + " ") + "repositories"
    return (
        <FullWidthCustomButton /*onPress={() => alert('Repos List Button pressed')}*/ onPress={() => props.navigation.navigate('Repository', { octokit: props.octokit })} Text={buttonText} />
    );
}

export default ReposListButton;
