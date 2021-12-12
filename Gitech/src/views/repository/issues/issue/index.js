import React, {useEffect} from 'react';
import {Pressable, ScrollView, Text, TextInput} from "react-native";
import {Card, CardHeader, NewComment, View, WhiteText, Wrapper} from "./styles";
import {styles} from "./styles";

const Issue = (props) => {
  const octokit = props.route.params.octokit;
  const issue = props.route.params.issue;
  const [comments, setComments] = React.useState([]);
  const [commentNumber, setCommentNumber] = React.useState(0);
  const [newComment, setNewComment] = React.useState(undefined);

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
  }, [commentNumber])

  console.log(props.route.params.issue);

  return (
    <Wrapper>
      <ScrollView>
        {
          comments.map((comment) => (
            <Card>
              <CardHeader>
                <WhiteText>{comment.user.login + ' commented'}</WhiteText>
              </CardHeader>
              <View>
                <WhiteText>{comment.body}</WhiteText>
              </View>
            </Card>
          ))
        }

        <NewComment>
          <TextInput
            placeholder='Leave a comment'
            placeholderTextColor={'white'}
            multiline={true}
            numberOfLines={4}
            style={styles(newComment !== undefined).textInput}
            onChangeText={(value) => changeBody(setNewComment, value)}
          />
          <Pressable
            style={styles(newComment !== undefined).button}
            onPress={() => postComment(
              octokit,
              props.route.params.repo,
              issue.number,
              newComment,
              commentNumber,
              setCommentNumber,
              setNewComment,
            )}>
            <Text style={styles(newComment !== undefined).text}>Comment</Text>
          </Pressable>
        </NewComment>
      </ScrollView>
    </Wrapper>
  )
}

const changeBody = (setNewComment, value) => {
  if (value !== '')
    setNewComment(value);
  else
    setNewComment(undefined);
}

const postComment = (octokit, repo, id, body, commentNumber, setCommentNumber, setNewComment) => {
  if (body !== undefined) {
    octokit.rest.issues.createComment({
      owner: repo.owner.login,
      repo: repo.name,
      issue_number: id,
      body: body
    }).then(() => {
      setCommentNumber(commentNumber + 1);
      setNewComment(undefined);
    });
  }
}

export default Issue;
