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
import TextLink from "@src/components/TextLink";

const Issue = (props) => {
  const octokit = props.route.params.octokit;
  const issue = props.route.params.issue;
  const [comments, setComments] = React.useState([]);
  const [changeCounter, setChangeCounter] = React.useState(0);
  const [newComment, setNewComment] = React.useState(undefined);
  const [state, setState] = React.useState(issue.state);
  const [date, setDate] = React.useState(undefined);

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
    if (!date) {
      const value = new Date(issue.created_at);
      const newDate = new Date(value.getTime() + value.getTimezoneOffset()*60*1000);
      var offset = value.getTimezoneOffset() / 60;
      var hours = value.getHours();
      newDate.setHours(hours - offset);
      setDate(newDate.toString());
    }
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
        <Flex>
          <WhiteText>Author : </WhiteText>
          <TextLink
            text={' ' + issue.user.login}
            onPress={() => redirectToUser(props.route.params.navigation, props.route.params.octokit, issue.user.login)}
          />
        </Flex>
        <WhiteText>Created : {date?.toLocaleString() + '\n'}</WhiteText>
        {
          comments.map((comment) => (
            <Card key={comment.url}>
              <CardHeader>
                <TextLink
                  text={comment.user.login}
                  onPress={() => redirectToUser(props.route.params.navigation, props.route.params.octokit, issue.user.login)}
                />
                <WhiteText> commented</WhiteText>
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
                issue.number,
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

const redirectToUser = (navigation, octokit, user) => {
  navigation.push('UserView', { navigation: navigation, octokit: octokit, username: user })
}

const postComment = (octokit, repo, id, body, changeCounter, setChangeCounter, setNewComment, open) => {
  if (body !== "" && open) {
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
