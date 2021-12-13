import React, {useEffect} from 'react';
import {Pressable, ScrollView, Text, TextInput, View} from "react-native";
import {MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
import {
  styles,
  stylesActive,
  stylesStatus,
  Card,
  CardHeader,
  LargeText,
  NewComment,
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
  const [changeCounter, setChangeCounter] = React.useState(0);
  const [newComment, setNewComment] = React.useState(undefined);
  const [state, setState] = React.useState(pullRequest.state);

  useEffect(() => {
    octokit.rest.pulls.listReviewComments({
      owner: props.route.params.repo.owner.login,
      repo: props.route.params.repo.name,
      pull_number: pullRequest.number
    }).then((value) => {
      setComments(value.data);
    })
  }, [changeCounter])

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
        <WhiteText>Created : {pullRequest.created_at}</WhiteText>
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

        <NewComment>
          <TextInput
            value={newComment}
            placeholder={'Leave a comment'}
            placeholderTextColor={'grey'}
            multiline={true}
            numberOfLines={4}
            style={stylesActive(newComment !== "" && state === 'open').textInput}
            onChangeText={(value) => setNewComment(value)}
          />
          <Flex>
            <Pressable
              style={stylesActive(newComment !== "" && state === 'open').button}
              onPress={() => postComment(
                octokit,
                props.route.params.repo,
                pullRequest.number,
                newComment,
                changeCounter,
                setChangeCounter,
                setNewComment,
                state === 'open'
              )}>
              <Text style={stylesActive(newComment !== "" && state === 'open').text}>Comment</Text>
            </Pressable>
            <Pressable
              style={styles.close}
              onPress={() => togglePRState(
                octokit,
                props.route.params.repo,
                pullRequest.number,
                state,
                setState
              )}>
              {state === 'open' && <MaterialCommunityIcons name="close" size={15} color='red'/>}
              <WhiteText>  {state === 'open' ? 'Close pull request' : 'Reopen pull request'}</WhiteText>
            </Pressable>
          </Flex>
        </NewComment>
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
