import React from 'react';
import {Pressable} from "react-native";
import {styles, Flex, Text, Wrapper} from "./styles";
import ButtonWithIcon from "@src/components/ButtonWithIcon";
import {FontAwesome5} from "@expo/vector-icons";

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
            onPress={() => getIssue(props.route.params.navigation, props.route.params.octokit, issue)}>
          <Flex>
            <FontAwesome5 name="comment-alt" size={15} color="white" />
            <Text>  {issue.comments}</Text>
          </Flex>
        </ButtonWithIcon>
        ))
      }
    </Wrapper>
  )
}

const getIssue = (navigation, octokit, issue) => {
  navigation.push('Issue', {navigation: navigation, octokit: octokit, issue: issue})
}

const createIssue = (navigation, octokit) => {
  navigation.push('CreateIssue', {navigation: navigation, octokit: octokit})
}

export default Issues;
