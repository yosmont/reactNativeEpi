import React, {useEffect} from 'react';
import {Pressable, ScrollView, Text, TextInput, View} from "react-native";
import {FontAwesome5, Ionicons} from '@expo/vector-icons';
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

const Issue = (props) => {
  const octokit = props.route.params.octokit;
  const issue = props.route.params.issue;
  const [comments, setComments] = React.useState([]);
  const [changeCounter, setChangeCounter] = React.useState(0);
  const [newComment, setNewComment] = React.useState(undefined);
  const [state, setState] = React.useState(issue.state);

  console.log(props.route.params);
  useEffect(() => {
    octokit.rest.issues.listComments({
      owner: props.route.params.repo.owner.login,
      repo: props.route.params.repo.name,
      issue_number: issue.number
    }).then((value) => {
      console.log(value.data);
      setComments(value.data);
    })
  }, [changeCounter])

  console.log(props.route.params.issue);

  return (
    <Wrapper>
      <ScrollView>
        <LargeText>{issue.title}</LargeText>
        <View style={stylesStatus(state === 'open').status}>
          {
            state === 'open' ?
              <FontAwesome5 name="check-circle" size={15} color="white"/>
              :
              <Ionicons name="alert-circle-outline" size={15} color="white"/>
          }
            <WhiteText>{state === 'open' ? "  Open" : "  Closed"}</WhiteText>
        </View>
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
            placeholderTextColor={'white'}
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
                issue.number,
                newComment,
                changeCounter,
                setChangeCounter,
                setNewComment,
              )}>
              <Text style={stylesActive(newComment !== "" && state === 'open').text}>Comment</Text>
            </Pressable>
            <Pressable
              style={styles.close}
              onPress={() => toggleIssueState(
                octokit,
                props.route.params.repo,
                issue.number,
                state,
                setState
              )}>
              {state === 'open' && <FontAwesome5 name="check-circle" size={15} color='#8957e5'/>}
              <WhiteText>  {state === 'open' ? 'Close issue' : 'Reopen issue'}</WhiteText>
            </Pressable>
          </Flex>
        </NewComment>
      </ScrollView>
    </Wrapper>
  )
}

const postComment = (octokit, repo, id, body, changeCounter, setChangeCounter, setNewComment) => {
  if (body !== "") {
    octokit.rest.issues.createComment({
      owner: repo.owner.login,
      repo: repo.name,
      issue_number: id,
      body: body
    }).then(() => {
      setChangeCounter(changeCounter + 1);
      setNewComment("");
    });
  }
}

const toggleIssueState = (octokit, repo, id, state, setState) => {
  octokit.rest.issues.update({
    owner: repo.owner.login,
    repo: repo.name,
    issue_number: id,
    state: state === 'open' ? 'closed' : 'open'
  }).then(() => {
    setState(state === 'open' ? 'closed' : 'open')
  })
}

export default Issue;
