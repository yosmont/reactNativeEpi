import React, {useEffect} from 'react';
import {View, Pressable, Modal, TextInput, Picker, ScrollView} from "react-native";
import {styles, stylesActive, Text, Wrapper, PickerWrapper} from "./styles";
import ButtonWithIcon from "@src/components/ButtonWithIcon";

const PullRequests = (props) => {
  const [pullRequests, setPullRequests] = React.useState(undefined);
  const [branches, setBranches] = React.useState("");
  const [modalVisible, setModalVisible] = React.useState(false);
  const [newPRTitle, setNewPRTitle] = React.useState("");
  const [newPRBody, setNewPRBody] = React.useState("");
  const [newPRBase, setNewPRBase] = React.useState("");
  const [newPRCompare, setNewPRCompare] = React.useState("");

  useEffect(() => {
    props.route.params.octokit.rest.repos.listBranches({
      owner: props.route.params.repo.owner.login,
      repo: props.route.params.repo.name
    })
      .then((value) => {
        setBranches(value.data);
        setNewPRBase(value.data[0].name);
        setNewPRCompare(value.data[0].name);
      })
  }, [])

  useEffect(() => {
    if (pullRequests === undefined) {
      props.route.params.octokit.rest.pulls.list({
        owner: props.route.params.repo.owner.login,
        repo: props.route.params.repo.name
      })
        .then((value) => {
          setPullRequests(value.data);
        })
    }
  }, [pullRequests])

  return (
    <Wrapper>
      <ScrollView>
        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>Base</Text>
              <PickerWrapper>
                <Picker
                  selectedValue={newPRBase}
                  style={styles.picker}
                  onValueChange={(value) => setNewPRBase(value)}
                >
                  {
                    branches ?
                      branches.map((branch) => (
                        <Picker.Item label={branch.name} value={branch.name} />
                      ))
                      :
                      <Picker.Item label="main" value="main" />
                  }
                </Picker>
              </PickerWrapper>
              <Text>Compare</Text>
              <PickerWrapper>
                <Picker
                  selectedValue={newPRCompare}
                  style={styles.picker}
                  onValueChange={(value) => setNewPRCompare(value)}
                >
                  {
                    branches ?
                      branches.map((branch) => (
                        <Picker.Item label={branch.name} value={branch.name} />
                      ))
                      :
                      <Picker.Item label="main" value="main" />
                  }
                </Picker>
              </PickerWrapper>
              <TextInput
                placeholder={'Title'}
                placeholderTextColor={'white'}
                style={styles.textInput}
                onChangeText={(value) => setNewPRTitle(value)}
              />
              <TextInput
                placeholder={'Leave a comment'}
                placeholderTextColor={'white'}
                style={styles.textInput}
                multiline={true}
                numberOfLines={4}
                onChangeText={(value) => setNewPRBody(value)}
              />
              <Pressable
                style={stylesActive(newPRTitle !== "").button}
                onPress={() => createPullRequest(
                  props.route.params.octokit,
                  props.route.params.repo,
                  newPRTitle,
                  newPRBody,
                  newPRBase,
                  newPRCompare,
                  setPullRequests,
                  setModalVisible
                )}>
                <Text
                  style={stylesActive(newPRTitle !== "" && newPRBase.name !== newPRCompare.name).text}>
                  Submit pull request
                </Text>
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
          <Text>New pull request</Text>
        </Pressable>
        {
          pullRequests && pullRequests.length !== 0 ?
            pullRequests.map((pr) => (
              <ButtonWithIcon
                Text={pr.title}
                onPress={() => getPullRequest(props.route.params.navigation, props.route.params.octokit, props.route.params.repo, pr)}>
            </ButtonWithIcon>
            )) :
            <Text>There are no pull requests for this repository</Text>
        }
      </ScrollView>
    </Wrapper>
  )
}

const getPullRequest = (navigation, octokit, repo, pr) => {
  navigation.push('PullRequest', {navigation: navigation, octokit: octokit, repo: repo, pullRequest: pr})
}

const createPullRequest = (octokit, repo, title, body, base, compare, setPR, setVisible) => {
  if (title !== "" && base !== compare) {
    octokit.rest.pulls.create(body !== "" ?
      {
        owner: repo.owner.login,
        repo: repo.name,
        title: title,
        head: compare,
        base: base,
        body: body
      } : {
        owner: repo.owner.login,
        repo: repo.name,
        title: title,
        head: compare,
        base: base
      }).then(() => {
        setPR(undefined);
        setVisible(false);
    })
  }
}

export default PullRequests;
