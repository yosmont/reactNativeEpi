import React, {useEffect} from "react";
import {ActivityIndicator} from 'react-native'
import {Wrapper, RepoWrapper, RepoInfo, Text, RepoHeader, Image, Flex} from "./styles";
import { Feather, Ionicons } from '@expo/vector-icons';
import TextLink from "@src/components/TextLink";
import ButtonWithIcon from "@src/components/ButtonWithIcon";

export const repoRights = {
  Owner: 'Owner',
  Collaborator: 'Collaborator',
  Tourist: 'Tourist'
}

const Repository = (props) => {
  const [repo, setRepo] = React.useState(undefined);
  const [branches, setBranches] = React.useState(undefined);

  useEffect(() => {
    props.route.params.octokit.rest.repos.listForAuthenticatedUser()
      .then((value) => {
        console.log(value.data);
        setRepo(value.data.count !== 0 ? value.data[13] : undefined);
      });
  }, [])

  useEffect(() => {
    if (repo)
      props.route.params.octokit.rest.repos.listBranches({owner: repo.owner.login, repo: repo.name})
        .then((value) => {
          setBranches(value.data);
        });
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
            <ButtonWithIcon Text={'Code'} onPress={() => getCode(props.route.params.navigation, props.route.params.octokit, repo, branches, '')}>
              <Feather name="code" size={15} color="white" />
            </ButtonWithIcon>
            <ButtonWithIcon Text={'Issues'} onPress={() => getCode(props.route.params.navigation, props.route.params.octokit, repo, branches, '')}>
              <Ionicons name="alert-circle-outline" size={15} color="white" />
            </ButtonWithIcon>
            <ButtonWithIcon Text={'Pull requests'} onPress={() => getCode(props.route.params.navigation, props.route.params.octokit, repo, branches, '')}>
              <Ionicons name="git-pull-request-outline" size={15} color="white" />
            </ButtonWithIcon>
            <ButtonWithIcon Text={'Starred'} onPress={() => getCode(props.route.params.navigation, props.route.params.octokit, repo, branches, '')}>
              <Feather name="star" size={15} color="white" />
            </ButtonWithIcon>
            <ButtonWithIcon Text={'Watchers'} onPress={() => getCode(props.route.params.navigation, props.route.params.octokit, repo, branches, '')}>
              <Feather name="eye" size={15} color="white" />
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
