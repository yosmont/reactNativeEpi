import React, { useEffect } from 'react';
import FullWidthCustomButton from "@components/FullWidthCustomButton";

function GoToUserList(navigation, octokit, type, username) {
    if (!username)
        navigation.navigate('UsersList', { navigation: navigation, octokit: octokit, type: type });
    else
        navigation.navigate('UsersList', { navigation: navigation, octokit: octokit, type: type, username: username });
}

const UsersListButton = (props) => {
    var buttonText = ((props.userType == "") ? "" : props.userType + " ") + ((typeof props.userNb === 'undefined') ? "NaN " : props.userNb + " ") + "users";
    var [listType, setListType] = React.useState("");

    useEffect(() => {
        if (!props.username) {
            switch (props.userType) {
                case "Following":
                    setListType("MyFollowing");
                    break;
                case "Followed by":
                    setListType("MyFollower");
                    break;
            }
        } else {
            switch (props.userType) {
                case "Following":
                    setListType("Following");
                    break;
                case "Followed by":
                    setListType("Follower");
                    break;
            }
        }
    }, [])

    return (
        <FullWidthCustomButton onPress={() => GoToUserList(props.navigation, props.octokit, listType, props.username)} Text={buttonText} />
    );
}

export default UsersListButton;