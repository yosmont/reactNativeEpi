import React, {useEffect} from 'react';
import {View, ScrollView} from "react-native";
import {MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
import {
  stylesStatus,
  Card,
  CardHeader,
  LargeText,
  Padding,
  WhiteText,
  Wrapper,
  Flex
} from "./styles";
import TextLink from "@src/components/TextLink";

const PullRequest = (props) => {
  const octokit = props.route.params.octokit;
  const pullRequest = props.route.params.pullRequest;
  const [comments, setComments] = React.useState([]);
  const [state, setState] = React.useState(pullRequest.state);
  const [date, setDate] = React.useState(undefined);

  useEffect(() => {
    octokit.rest.pulls.listReviewComments({
      owner: props.route.params.repo.owner.login,
      repo: props.route.params.repo.name,
      pull_number: pullRequest.number
    }).then((value) => {
      setComments(value.data);
    })
    if (!date) {
      const value = new Date(pullRequest.created_at);
      const newDate = new Date(value.getTime() + value.getTimezoneOffset()*60*1000);
      var offset = value.getTimezoneOffset() / 60;
      var hours = value.getHours();
      newDate.setHours(hours - offset);
      setDate(newDate.toString());
    }
  }, [])

  return (
    <Wrapper>
      <ScrollView>
        <LargeText>{pullRequest.title}</LargeText>
        <View style={stylesStatus(state === 'open').status}>
          {
            state === 'open' ?
              <Ionicons name="git-pull-request-outline" size={15} color="white"/>
              :
              <MaterialCommunityIcons name="cancel" size={15} color="white"/>
          }
            <WhiteText>{state === 'open' ? "  Open" : "  Closed"}</WhiteText>
        </View>
        <Flex>
          <WhiteText>Author : </WhiteText>
          <TextLink
            text={' ' + pullRequest.user.login}
            onPress={() => redirectToUser(props.route.params.navigation, props.route.params.octokit, pullRequest.user.login)}
          />
        </Flex>
        <WhiteText>Created : {date.toLocaleString() + '\n'}</WhiteText>
        <WhiteText>Base: {pullRequest.base.ref}</WhiteText>
        <WhiteText>Compare: {pullRequest.head.ref}</WhiteText>
        {
          comments.map((comment) => (
            <Card>
              <CardHeader>
                <WhiteText>{comment.user.login + ' commented'}</WhiteText>
              </CardHeader>
              <Padding>
                <WhiteText>{comment.body}</WhiteText>
              </Padding>
            </Card>
          ))
        }
      </ScrollView>
    </Wrapper>
  )
}

const postComment = (octokit, repo, id, body, changeCounter, setChangeCounter, setNewComment, open) => {
  if (body !== "" && open) {
    octokit.rest.pulls.createReviewComment({
      owner: repo.owner.login,
      repo: repo.name,
      pull_number: id,
      body: body
    }).then(() => {
      setChangeCounter(changeCounter + 1);
      setNewComment("");
    });
  }
}

const togglePRState = (octokit, repo, id, state, setState) => {
  octokit.rest.pulls.update({
    owner: repo.owner.login,
    repo: repo.name,
    pull_number: id,
    state: state === 'open' ? 'closed' : 'open'
  }).then(() => {
    setState(state === 'open' ? 'closed' : 'open')
  })
}

const redirectToUser = (navigation, octokit, user) => {
  navigation.push('UserView', { navigation: navigation, octokit: octokit, username: user })
}

export default PullRequest;
