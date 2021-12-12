import React, {useEffect} from "react";
import {ActivityIndicator} from 'react-native'
import {Wrapper, RepoWrapper, RepoInfo, Text, RepoHeader, Image, Flex} from "./styles";
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import TextLink from "@src/components/TextLink";
import ButtonWithIcon from "@src/components/ButtonWithIcon";

export const repoRights = {
  Owner: 'Owner',
  Collaborator: 'Collaborator',
  Tourist: 'Tourist'
}

const Repository = (props) => {
  const [repo, setRepo] = React.useState(undefined);
  const [issues, setIssues] = React.useState([]);
  const [pullRequests, setPullRequests] = React.useState([]);
  const [starred, setStarred] = React.useState([]);
  const [watchers, setWatchers] = React.useState([]);

  useEffect(() => {
    props.route.params.octokit.rest.repos.listForAuthenticatedUser()
      .then((value) => {
        console.log(value.data);
        setRepo(value.data.count !== 0 ? value.data[13] : undefined);
      });
  }, [])

  useEffect(() => {
    if (repo) {
      props.route.params.octokit.rest.issues.listForRepo({owner: repo.owner.login, repo: repo.name, state: 'all'})
        .then((value) => {
          console.log(value.data);
          setIssues(value.data.filter((issue) => !issue.pull_request));
        })
      props.route.params.octokit.rest.pulls.list({owner: repo.owner.login, repo: repo.name})
        .then((value) => {
          console.log(value.data);
          setPullRequests(value.data);
        })
      props.route.params.octokit.rest.activity.listStargazersForRepo({owner: repo.owner.login, repo: repo.name})
        .then((value) => {
          console.log(value.data);
          setStarred(value.data);
        })
      props.route.params.octokit.rest.activity.listWatchersForRepo({owner: repo.owner.login, repo: repo.name})
        .then((value) => {
          console.log(value.data);
          setWatchers(value.data);
        })
    }
  }, [repo])

  return (
    <Wrapper>
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
              onPress={() => getCode(props.route.params.navigation, props.route.params.octokit, repo, '')}>
              <Ionicons name="git-pull-request-outline" size={15} color="white" />
            </ButtonWithIcon>

            <ButtonWithIcon
              Text={'Starred (' + starred.length + ')'}
              onPress={() => getCode(props.route.params.navigation, props.route.params.octokit, repo, '')}>
              <Feather name="star" size={15} color="white" />
            </ButtonWithIcon>

            <ButtonWithIcon
              Text={'Watchers (' + watchers.length + ')'}
              onPress={() => getCode(props.route.params.navigation, props.route.params.octokit, repo, '')}>
              <Feather name="eye" size={15} color="white" />
            </ButtonWithIcon>

            <ButtonWithIcon
              Text={'Delete the repository'}
              onPress={() => getCode(props.route.params.navigation, props.route.params.octokit, repo, '')}>
              <MaterialIcons name="delete" size={15} color="white" />
            </ButtonWithIcon>
          </RepoWrapper>
        :
        <ActivityIndicator size='large' color='#457cb7' />
      }
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

export default Repository;
