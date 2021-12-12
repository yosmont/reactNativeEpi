import React, {useEffect} from 'react';
import {View, Pressable, Modal, TextInput} from "react-native";
import {styles, stylesActive, Flex, Text, Wrapper, StatusIcon} from "./styles";
import ButtonWithIcon from "@src/components/ButtonWithIcon";
import {FontAwesome5, Ionicons} from "@expo/vector-icons";

const Issues = (props) => {
  const [issues, setIssues] = React.useState(props.route.params.issues);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [newIssueTitle, setNewIssueTitle] = React.useState("");
  const [newIssueBody, setNewIssueBody] = React.useState("");

  useEffect(() => {
    if (issues.length === 0) {
      props.route.params.octokit.rest.issues.listForRepo({
        owner: props.route.params.repo.owner.login,
        repo: props.route.params.repo.name,
        state: 'all'})
        .then((value) => {
          console.log(value.data);
          setIssues(value.data.filter((issue) => !issue.pull_request));
        })
    }
  }, [issues])

  console.log(issues);
  return (
    <Wrapper>
      <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              placeholder={'Title'}
              placeholderTextColor={'white'}
              style={styles.textInput}
              onChangeText={(value) => setNewIssueTitle(value)}
            />
            <TextInput
              placeholder={'Leave a comment'}
              placeholderTextColor={'white'}
              style={styles.textInput}
              multiline={true}
              numberOfLines={4}
              onChangeText={(value) => setNewIssueBody(value)}
            />
            <Pressable
              style={stylesActive(newIssueTitle !== "").button}
              onPress={() => createIssue(
                props.route.params.octokit,
                props.route.params.repo,
                newIssueTitle,
                newIssueBody,
                setIssues,
                setModalVisible
              )}>
              <Text style={stylesActive(newIssueTitle !== "").text}>Submit new issue</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Pressable
        style={styles.greenButton}
        onPress={() => setModalVisible(true)}>
        <Text>New issue</Text>
      </Pressable>
      {
        issues.length !== 0 ?
          issues.map((issue) => (
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
          )) :
          <Text>There are no issues for this repository</Text>
      }
    </Wrapper>
  )
}

const getIssue = (navigation, octokit, repo, issue) => {
  navigation.push('Issue', {navigation: navigation, octokit: octokit, repo: repo, issue: issue})
}

const createIssue = (octokit, repo, title, body, setIssues, setVisible) => {
  if (title !== "") {
    octokit.rest.issues.create(body !== "" ?
      {
        owner: repo.owner.login,
        repo: repo.name,
        title: title,
        body: body
      } : {
        owner: repo.owner.login,
        repo: repo.name,
        title: title
      }).then(() => {
        setIssues([]);
        setVisible(false);
    })
  }
}

export default Issues;
