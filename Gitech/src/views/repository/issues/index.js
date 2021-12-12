import React from 'react';
import {View, Pressable, Modal, TextInput} from "react-native";
import {styles, stylesActive, Flex, Text, Wrapper, StatusIcon} from "./styles";
import ButtonWithIcon from "@src/components/ButtonWithIcon";
import {FontAwesome5, Ionicons} from "@expo/vector-icons";

const Issues = (props) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [newIssueTitle, setNewIssueTitle] = React.useState("");
  const [newIssueBody, setNewIssueBody] = React.useState("");

  console.log(props.route.params.issues);
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
                newIssueBody
              )}>
              <Text style={stylesActive(newIssueTitle !== "").text}>Submit new issue</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Pressable
        style={styles.button}
        onPress={() => setModalVisible(true)/*createIssue(props.route.params.navigation, props.route.params.octokit)*/}>
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

const createIssue = (octokit, repo, title, body) => {
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

    })
  }
}

export default Issues;
