import React, {useEffect} from "react";
import {ActivityIndicator, Modal, Pressable, ScrollView, View} from 'react-native'
import {Wrapper, RepoWrapper, RepoInfo, LargeText, Text, RepoHeader, Image, Flex} from "./styles";
import { Feather, Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import TextLink from "@src/components/TextLink";
import ButtonWithIcon from "@src/components/ButtonWithIcon";
import {styles} from "./styles";

export const repoRights = {
  Owner: 'Owner',
  Collaborator: 'Collaborator',
  Tourist: 'Tourist'
}

const Repository = (props) => {
  const [repo, setRepo] = React.useState(props.route.params.repo);
  const [issues, setIssues] = React.useState([]);
  const [pullRequests, setPullRequests] = React.useState([]);
  const [starred, setStarred] = React.useState([]);
  const [watchers, setWatchers] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);

  useEffect(() => {
    if (repo) {
      props.route.params.octokit.rest.issues.listForRepo({owner: repo.owner.login, repo: repo.name, state: 'all'})
        .then((value) => {
          setIssues(value.data.filter((issue) => !issue.pull_request));
        })
      props.route.params.octokit.rest.pulls.list({owner: repo.owner.login, repo: repo.name})
        .then((value) => {
          setPullRequests(value.data);
        })
      props.route.params.octokit.rest.activity.listStargazersForRepo({owner: repo.owner.login, repo: repo.name})
        .then((value) => {
          setStarred(value.data);
        })
      props.route.params.octokit.rest.activity.listWatchersForRepo({owner: repo.owner.login, repo: repo.name})
        .then((value) => {
          setWatchers(value.data);
        })
    }
  }, [repo])

  return (
    <Wrapper>
      <ScrollView>
        {repo ?
            <RepoWrapper>
              <RepoHeader>
                <Image source={{ uri: repo.owner.avatar_url }} />
                <RepoInfo>
                  <Text>Name : {repo.name}</Text>
                  <Flex>
                    <Text>Owner : </Text>
                    <TextLink text={' ' + repo.owner.login} onPress={() => redirectToUser(props.route.params.navigation, props.route.params.octokit, repo.owner.login)} />
                  </Flex>
                </RepoInfo>
              </RepoHeader>

              <Text>{repo.description}</Text>

              <ButtonWithIcon
                Text={'Code'}
                onPress={() =>
                  getCode(props.route.params.navigation, props.route.params.octokit, repo, '')}>
                <Feather name="code" size={15} color="white" />
              </ButtonWithIcon>

              <ButtonWithIcon
                Text={'Issues (' + issues.length + ')'}
                onPress={() =>
                  props.route.params.navigation.push('Issues', {
                    navigation: props.route.params.navigation,
                    octokit: props.route.params.octokit,
                    repo: repo,
                    issues: issues
                  })}>
                <Ionicons name="alert-circle-outline" size={15} color="white" />
              </ButtonWithIcon>

              <ButtonWithIcon
                Text={'Pull requests (' + pullRequests.length + ')'}
                onPress={() =>
                  props.route.params.navigation.push('PullRequests', {
                    navigation: props.route.params.navigation,
                    octokit: props.route.params.octokit,
                    repo: repo,
                    pullRequests: pullRequests
                  })}>
                <Ionicons name="git-pull-request-outline" size={15} color="white" />
              </ButtonWithIcon>

              <ButtonWithIcon
                Text={'Starred (' + starred.length + ')'}
                onPress={() => GoToUserList(props.route.params.navigation, props.route.params.octokit, repo, "RepoStar")}>
                <Feather name="star" size={15} color="white" />
              </ButtonWithIcon>

              <ButtonWithIcon
                Text={'Watchers (' + watchers.length + ')'}
                onPress={() => GoToUserList(props.route.params.navigation, props.route.params.octokit, repo, "RepoWatch")}>
                <Feather name="eye" size={15} color="white" />
              </ButtonWithIcon>

              <ButtonWithIcon
                Text={'Forks (' + watchers.length + ')'}
                onPress={() => GoToReposList(props.route.params.navigation, props.route.params.octokit, repo, "Fork")}>
                <FontAwesome name="code-fork" size={15} color="white" />
              </ButtonWithIcon>

              {
                repo.permissions.admin &&
                <ButtonWithIcon
                Text={'Delete the repository'}
                onPress={() => setModalVisible(!modalVisible)}>
                <MaterialIcons name="delete" size={15} color="white"/>
              </ButtonWithIcon>
              }

              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <LargeText>Are you sure ?</LargeText>
                    <Flex>
                      <Pressable
                        style={styles.deleteButton}
                        onPress={() => deleteRepo(
                          props.route.params.navigation,
                          props.route.params.octokit,
                          repo
                        )}>
                        <Text>Delete</Text>
                      </Pressable>
                      <Pressable
                        style={styles.button}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text>Cancel</Text>
                      </Pressable>
                    </Flex>
                  </View>
                </View>
              </Modal>
            </RepoWrapper>
          :
          <ActivityIndicator size='large' color='#457cb7' />
        }
      </ScrollView>
    </Wrapper>
  );
}

const redirectToUser = (navigation, octokit, user) => {
  navigation.push('UserView', { navigation: navigation, octokit: octokit, username: user })
}

const getCode = (navigation, octokit, repo, branches, path) => {
  console.log(branches);
  navigation.push('RepositoryCode', { navigation: navigation, octokit: octokit, repo: repo, branches: branches, path: path })
}

function GoToUserList(navigation, octokit, repo, type) {
  navigation.push('UsersList', { navigation: navigation, octokit: octokit, type: type, username: repo.owner.login, repoName: repo.name });
}

function GoToReposList(navigation, octokit, repo, type) {
    navigation.push('ReposList', { navigation: navigation, octokit: octokit, type: type, username: repo.owner.login, repoName: repo.name });
}

const deleteRepo = (navigation, octokit, repo) => {
  console.log(repo);
  octokit.rest.repos.delete({
    owner: repo.owner.login,
    repo: repo.name
  }).then(() => {
    navigation.goBack();
  })
}

export default Repository;
