import React from 'react';
import {Pressable} from "react-native";
import {styles, Flex, Text, Wrapper, StatusIcon} from "./styles";
import ButtonWithIcon from "@src/components/ButtonWithIcon";
import {FontAwesome5, Ionicons} from "@expo/vector-icons";

const Issues = (props) => {
  console.log(props.route.params.issues);
  return (
    <Wrapper>
      <Pressable
        style={styles.button}
        onPress={() => createIssue(props.route.params.navigation, props.route.params.octokit)}>
        <Text>New issue</Text>
      </Pressable>
      {
        props.route.params.issues.map((issue) => (
          <ButtonWithIcon
            Text={issue.title}
            onPress={() => getIssue(props.route.params.navigation, props.route.params.octokit, props.route.params.repo, issue)}>
          <Flex>
            <StatusIcon>
              {
                issue.state === 'open' ?
                  <FontAwesome5 name="check-circle" size={20} color="#238636"/>
                  :
                  <Ionicons name="alert-circle-outline" size={20} color="#8957e5"/>
              }
            </StatusIcon>
            <FontAwesome5 name="comment-alt" size={15} color="white" />
            <Text>  {issue.comments}</Text>
          </Flex>
        </ButtonWithIcon>
        ))
      }
    </Wrapper>
  )
}

const getIssue = (navigation, octokit, repo, issue) => {
  navigation.push('Issue', {navigation: navigation, octokit: octokit, repo: repo, issue: issue})
}

const createIssue = (navigation, octokit) => {
  navigation.push('CreateIssue', {navigation: navigation, octokit: octokit})
}

export default Issues;
