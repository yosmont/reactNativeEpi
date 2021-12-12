import React from 'react';
import FullWidthCustomButton from "@components/FullWidthCustomButton";

function followUser(octokit, username) {
    octokit.rest.users.follow({ username }).then((value) => {
        alert(username + " is followed");
    }).catch((err) => {
        alert(err);
    });
}

const FollowButton = (props) => {
    var buttonText = "Follow " + props.username;
    return (
        <FullWidthCustomButton onPress={() => followUser(props.octokit, props.username)} Text={buttonText} />
    );
}

export default FollowButton;
