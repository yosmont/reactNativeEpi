import React, { useEffect } from 'react';
import FullWidthCustomButton from "@components/FullWidthCustomButton";

function followUser(octokit, username, followStatus) {
    if (followStatus) {
        octokit.rest.users.unfollow({ username: username }).then((value) => {
            alert(username + " is unfollowed");
        }).catch((err) => {
            alert("unfollow : " + err);
        });
        return false;
    } else {
        octokit.rest.users.follow({ username: username }).then((value) => {
            alert(username + " is followed");
        }).catch((err) => {
            alert("follow : " + err);
        });
        return true;
    }
}

const FollowButton = (props) => {
    const followText = "Follow " + props.username;
    const unfollowText = "Unfollow " + props.username;
    const [followStatus, onFollowStatusChange] = React.useState(undefined);
    useEffect(() => {
        props.octokit.rest.users.checkPersonIsFollowedByAuthenticated({ username: props.username }).then((value) => {
            onFollowStatusChange(true)
        }).catch((err) => {
            onFollowStatusChange(false);
        });
    });
    return (
        <FullWidthCustomButton onPress={() => onFollowStatusChange(followUser(props.octokit, props.username, followStatus))} Text={followStatus ? unfollowText : followText} />
    );
}

export default FollowButton;
