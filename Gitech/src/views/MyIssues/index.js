import React, { useEffect } from 'react';
import {Flex, Text, Wrapper} from "./styles";
import ButtonWithIcon from "@src/components/ButtonWithIcon";
import { FontAwesome5 } from "@expo/vector-icons";

import { ActivityIndicator } from "react-native";

const MyIssues = (props) => {
  const octokit = props.route.params.octokit
  const [issues, onIssuesLoad] = React.useState(undefined);
  useEffect(() => {
    octokit.rest.issues.listForAuthenticatedUser().then((value) => {
      console.log(value.data);
      onIssuesLoad(value.data.filter((issue) => !issue.pull_request));
    })
  }, []);
  return (
    <Wrapper>
      {
        issues ? issues.map((issue) => (
            <ButtonWithIcon
              Text={issue.title}
              onPress={() => getIssue(props.route.params.navigation, octokit, issue)}>
            <Flex>
              <FontAwesome5 name="comment-alt" size={15} color="white" />
              <Text>  {issue.comments}</Text>
            </Flex>
          </ButtonWithIcon>
          ))
        :
        <ActivityIndicator size='large' color='#457cb7' />
      }
    </Wrapper>
  )
}

const getIssue = (navigation, octokit, issue) => {
    octokit.rest.repos.get({ owner: issue.repository.owner.login, repo: issue.repository.name }).then((value) => {
        navigation.push('Issue', { navigation: navigation, octokit: octokit, repo: value.data, issue: issue })
    });
}

export default MyIssues;
